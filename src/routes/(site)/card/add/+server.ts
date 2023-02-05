// noinspection JSNonASCIINames

import AnnotationEnum from "$lib/enums/annotation.js";
import AttributeEnum from "$lib/enums/attribute.js";
import CardMemberGroupType from "$lib/enums/cardMemberGroupType.js";
import CardMemberIdolizeType from "$lib/enums/cardMemberIdolizeType.js";
import {CardOrientation} from "$lib/enums/cardOrientation.js";
import {CardMemberRarity, CardSongRarity} from "$lib/enums/cardRarity.js";
import CardSongRequirementType from "$lib/enums/cardSongRequirementType.js";
import CardType from "$lib/enums/cardType.js";
import ImportError from "$lib/errors/importError.js";
import {makeFindOptionsFromFilters} from "$lib/search/query.js";
import {tryAllPatterns} from "$lib/translation/skills.js";
import PieceInfo from "$lib/types/pieceInfo.js";
import type Card from "$models/card/card.js";
import type {CardMember, CardSongWithAnyReq, CardSongWithAttrReq} from "$models/card/card.js";
import type CardMemberExtraInfo from "$models/card/memberExtraInfo.js";
import type CardMemberGroup from "$models/card/memberGroup.js";
import type CardMemberIdolizePieceExtraInfo from "$models/card/memberIdolizePieceExtraInfo.js";
import type CardSongAnyReqExtraInfo from "$models/card/songAnyReqExtraInfo.js";
import type CardSongAttrReqExtraInfo from "$models/card/songAttrReqExtraInfo.js";
import type CardSongExtraInfo from "$models/card/songExtraInfo.js";
import type {DBObject} from "$models/db.js";
import type Skill from "$models/skill/skill.js";
import {Op} from "@sequelize/core";
import {error, json} from "@sveltejs/kit";
import Crawler from "./promiseCrawler.js";
import * as fs from "fs";
import probeImageSize from "probe-image-size";
import type {RequestHandler} from "./$types.js";

const nameNormalizations: { [k: string]: string } = {};
for (const n of ["高坂 穂乃果", "絢瀬 絵里", "南 ことり", "園田 海未", "星空 凛", "西木野 真姫", "東條 希", "小泉 花陽", "矢澤 にこ", "高海 千歌", "桜内 梨子", "松浦 果南", "黒澤 ダイヤ", "渡辺 曜", "津島 善子", "国木田 花丸", "小原 鞠莉", "黒澤 ルビィ"]) {
    nameNormalizations[n.replace(" ", "")] = n;
    nameNormalizations[n.replace(" ", "　")] = n;
}

export const POST: RequestHandler = (async ({locals, request}) => {
    const cardNo = (await request.json()).cardNo;

    const cardCrawler = new Crawler({
        rateLimit: 1000,
        callback: async (error, res, done) => {
            if (error) {
                done();
                throw error;
            } else {
                const info: { [k: string]: string | null } = {};
                if (res.$(".status").length === 0) {
                    done();
                    throw new ImportError("Card page does not exist.", res.request.uri.pathname!);
                }
                fillInfoObject(info, res.$);

                const cardNo = info["カードNo."]!;
                const set = cardNo.split("-")[0];
                const inSetNo = parseInt(cardNo.substring(5));

                // As far as I am aware, EX15-055 to EX15-072 do not actually exist (dupes of EX15-E01 to EX15-E18)
                if (set == "EX15" && cardNo.charAt(5) != "E" && inSetNo >= 55) {
                    done();
                    throw new ImportError("This card does not exist in reality, only on the site.", cardNo);
                }

                // Guess Card type
                let type: CardType;
                if (info["種別"] === "メンバー") {
                    // Members (and only Members) list their own type on their own page
                    type = CardType.MEMBER;
                } else if (info["カードの色"] === null) {
                    // Memories use the page layout for Song cards, but list their Attribute as none
                    type = CardType.MEMORY;
                } else {
                    // Otherwise it's a Song card
                    type = CardType.SONG;
                }

                applyFixes(info, cardNo, set, inSetNo, type);
                await downloadImages(res.$, cardNo, set);
                await importCard(info, locals.DB, cardNo, set, inSetNo, type);
                done();
            }
        }
    });

    try {
        await cardCrawler.queue(`https://lovelive-sic.com/cardlist/list/?cardno=${cardNo}`);
    } catch (e: any) {
        throw error(500, e.message);
    }
    return json({success: true});
}) satisfies RequestHandler;

function fillInfoObject(info: { [k: string]: string | null }, $: cheerio.CheerioAPI) {
    $(".status tr").each((i, e) => {
        if ($("td", e).length > 0) {
            const k = $("th", e).text();
            let x: string | null = $("td", e).text();
            // normalize "none" values
            if (x === "―" || x === "－" || x === "─" || x === "-") x = null;
            info[k] = x;
        } else {
            info["name"] = $("th", e).text();
            // Normalize spaces in name (some PR cards use different/no spaces in names)
            if (nameNormalizations.hasOwnProperty(info["name"])) {
                info["name"] = nameNormalizations[info["name"]];
            }
        }
    });
}

function applyFixes(info: { [k: string]: string | null }, cardNo: string, set: string, inSetNo: number, type: CardType) {
    // Fix for some LL04 Song cards: Flavour text missing from Skill text row
    if (cardNo === "LL04-057") {
        info["スキル"] = "悩みをぶっ飛ばすような　イメージ持って戦いましょう\nなんとなく　なんとなく強くなるって気がしてる";
    } else if (cardNo === "LL04-059") {
        info["スキル"] = "愛のうたの香りは　潮風より青くて\nもっと確かめたい香りさ　（青く切ない香りさ）";
    }

    // Fix for LL07 SP/SEC Member cards: Multiple Skill Triggers not seperated by slash unlike all other cards
    else if (set === "LL07" && inSetNo >= 64) {
        info["スキル"] = info["スキル"]!.replace("【スタート時】【登場時】", "【スタート時】/【登場時】");
    }

    // Fix for LL13 SP Member cards: The ID listed on the site is incorrect
    else if (set === "LL13" && inSetNo >= 82) {
        info["ID"] = (parseInt(info["ID"]!) - 9).toString();
    }

    // Fix for some LL15 Member cards: They are Pair cards, but the Group Skill is not listed on either card
    else if (cardNo === "LL15-046" || cardNo === "LL15-047") {
        info["スキル"] += "\n<ペアスキル>【ライブ成功時】あなたのステージに「Aqours」がいるなら、手札から【☆】を持たないメンバー２人を《登場》してよい。"
    }

    // Fix for LL16 non-GR song cards: The ID listed on the site is incorrect
    else if (type === CardType.SONG && set === "LL16" && inSetNo < 82) {
        info["ID"] = (parseInt(info["ID"]!) + 74).toString();
    }

    // Fix for EX01 Song cards: Attribute row missing, which causes every row but Skill to shift up by one
    else if (type === CardType.SONG && set === "EX01") {
        info["共通スコア"] = info["青スコア"];
        info["青スコア"] = info["緑スコア"];
        info["緑スコア"] = info["赤スコア"];
        info["赤スコア"] = info["ライブP"];
        info["ライブP"] = info["枠属性"];

        // Derive Attribute from card colour row
        if (info["カードの色"] === "赤") {
            info["枠属性"] = "スマイル";
        } else if (info["カードの色"] === "緑") {
            info["枠属性"] = "ピュア";
        } else if (info["カードの色"] === "青") {
            info["枠属性"] = "クール";
        } else if (info["カードの色"] === "黄") {
            info["枠属性"] = "オール";
        }
    }

    // Fix for EX02 Member cards: Birthday Bonus row missing, which causes every row but Skill to shift up by one
    else if (type === CardType.MEMBER && set === "EX02") {
        info["衣装"] = info["特技"];
        info["特技"] = info["ボーナス"];
        // None of the EX02 Member cards have Birthday Bonus Pieces
        info["ボーナス"] = null;
    }

    // Fix for the first nine EX03 Member cards: Their cost is one, but it's listed as none
    else if (set === "EX03" && inSetNo <= 9) {
        info["コスト"] = "☆";
    }

    // Fix for EX05-036: Natsuiro uses a fullwidth ! everywhere except in the Skill text here. Normalize that
    else if (cardNo == "EX05-036") {
        info["スキル"] = info["スキル"]!.replace("Jump!", "Jump！");
    }

    // Fix for EX09 Member cards: Broken birthday dates
    else if (cardNo === "EX09-055") info["誕生日"] = "1月1日";
    else if (cardNo === "EX09-056") info["誕生日"] = "4月17日";
    else if (cardNo === "EX09-057") info["誕生日"] = "7月13日";
    else if (cardNo === "EX09-058") info["誕生日"] = "3月4日";
    else if (cardNo === "EX09-059") info["誕生日"] = "6月13日";
    else if (cardNo === "EX09-060") info["誕生日"] = "9月21日";

    // Fix for EX11-041: The Skill text uses a non-matching bracket on one side
    else if (cardNo === "EX11-041") {
        info["スキル"] = info["スキル"]!.substring(0, info["スキル"]!.length - 1) + "）";
    }

    // Fix for EX15-E12: Heart symbol in name is broken
    else if (cardNo === "EX15-E12") {
        info["name"] = "ぶる～べりぃ♡とれいん";
    }

    // Fix for PR-096: Skill text has line break in the wrong place
    else if (cardNo === "PR-096") {
        info["スキル"] = info["スキル"]!.replace("\n", "").replace("。【", "。\n【");
    }
}

async function downloadImages($: cheerio.CheerioAPI, cardNo: string, set: string) {
    const frontUrl = $(".illust-1 img").attr("src");
    const backUrl = $(".illust-2 img").attr("src");

    const imageCrawler = new Crawler({
        encoding: null, jQuery: false, rateLimit: 1000,
        callback: (err, res, done) => {
            if (err) {
                done();
                throw err;
            } else {
                if (!fs.existsSync(`static/images/cards/${set}`)) fs.mkdirSync(`static/images/${set}`);
                fs.createWriteStream(`static/images/cards/${set}/${cardNo}-${res.options.filename}.jpg`).write(res.body);
                done();
            }
        }
    });

    await Promise.all([
        imageCrawler.queue({uri: frontUrl, filename: "front"}),
        imageCrawler.queue({uri: backUrl, filename: "back"})
    ]);
}

async function checkImageOrientation(cardNo: string, side: string) {
    const set = cardNo.split("-")[0];
    const res = await probeImageSize(fs.createReadStream(`static/images/${set}/${cardNo}-${side}.jpg`));
    if (res.width < res.height) return CardOrientation.PORTRAIT;
    else return CardOrientation.LANDSCAPE;
}

const birthdayPattern = /^(\d*)月(\d*)日$/;
const lpPattern = /^(\d*)([+-][\dX∞]*)?$/;
const idolizedPiecesPattern = /<覚醒>(【(?:オール|赤|緑|青)】(?:\/【(?:オール|赤|緑|青)】?)*)/;
const pairPattern = /[【「](\d*?) (.*?)[】」]とペアになる。/;
const pairSkillPattern = /\n?<ペアスキル>\n?(.*)/s;
const trioPattern = /[【「](\d*?) (.*?)[】」][【「](\d*?) (.*?)[】」]とトリオになる。/;
const trioSkillPattern = /\n?<トリオスキル>\n?(.*)/s;

async function importCard(info: { [k: string]: string | null }, DB: DBObject, cardNo: string, set: string, inSetNo: number, type: CardType) {
    await DB.sequelize.transaction(async (transaction) => {
        const card: Partial<Card> = {
            cardNo: info["カードNo."]!,
            id: parseInt(info["ID"]!),
            nameJpn: info["name"]!,
            copyright: info["コピーライト"]!,
            type
        };
        let skillText = info["スキル"]?.replace(/\n\n/g, "\n");
        let orientationCheckCardNo = info["カードNo."]!;

        if (type === CardType.MEMBER) {
            const checkNameTable = await DB.TranslationName.findByPk(card.nameJpn, {transaction});
            if (checkNameTable !== null) {
                card.nameEng = checkNameTable.eng;
            }

            const memberInfo: Partial<CardMemberExtraInfo> = {};
            memberInfo.rarity = CardMemberRarity[info["レアリティ"] as keyof typeof CardMemberRarity];
            memberInfo.cost = (info["コスト"] ? info["コスト"].length : 0) as 0 | 1 | 2 | 3;
            if (info["誕生日"] !== "？？？") {
                const bdMatch = birthdayPattern.exec(info["誕生日"]!);
                if (bdMatch === null) throw new ImportError("Invalid birthday scraped from website", cardNo);
                memberInfo.birthDay = parseInt(bdMatch[2]) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
                memberInfo.birthMonth = parseInt(bdMatch[1]) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
            }
            memberInfo.year = (info["学年"] ? parseInt(info["学年"].charAt(0)) : null) as 1 | 2 | 3 | null;
            memberInfo.abilityRush = info["特技"] ? info["特技"].indexOf("RUSH") !== -1 : false;
            memberInfo.abilityLive = info["特技"] ? info["特技"].indexOf("LIVE") !== -1 : false;
            memberInfo.costumeJpn = info["衣装"];

            if (memberInfo.costumeJpn) {
                const checkCostumeTable = await DB.TranslationSong.findByPk(memberInfo.costumeJpn, {transaction});
                if (checkCostumeTable !== null) {
                    memberInfo.costumeEng = checkCostumeTable.eng;
                }
            }

            if (memberInfo.rarity === CardMemberRarity.Secret) {
                // Estimate card no. of the base SP card for SEC cards
                let paddedInSetNo = (inSetNo - 9).toString();
                while (paddedInSetNo.length < 3) paddedInSetNo = "0" + paddedInSetNo;
                card.member!.baseIfSecret = orientationCheckCardNo = set + "-" + paddedInSetNo;
            }

            let pieces = new PieceInfo(0, 0, 0, 0);
            if (info["ピース1"]) pieces = pieces.addPiece(AttributeEnum.fromSongAttributeName(info["ピース1"]));
            if (info["ピース2"]) pieces = pieces.addPiece(AttributeEnum.fromSongAttributeName(info["ピース2"]));
            if (info["ピース3"]) pieces = pieces.addPiece(AttributeEnum.fromSongAttributeName(info["ピース3"]));
            if (info["ピース4"]) pieces = pieces.addPiece(AttributeEnum.fromSongAttributeName(info["ピース4"]));
            memberInfo.piecesAll = pieces.all;
            memberInfo.piecesSmile = pieces.smile;
            memberInfo.piecesPure = pieces.pure;
            memberInfo.piecesCool = pieces.cool;
            memberInfo.pieceBdayAttribute = info["ボーナス"] ? AttributeEnum.fromSongAttributeName(info["ボーナス"]).id : null;

            if (skillText !== undefined && skillText.indexOf("【特別練習】") !== -1) {
                if (skillText.indexOf("<覚醒>") !== -1) {
                    // Idolized Piece Bonus is listed in the Skill text - find and parse it
                    memberInfo.idolizeType = CardMemberIdolizeType.WITH_PIECES;
                    const idolizePieceInfo: Partial<CardMemberIdolizePieceExtraInfo> = {};
                    const idolPieceMatch = idolizedPiecesPattern.exec(skillText);
                    if (idolPieceMatch === null) throw new ImportError("Can't read Idolized Pieces scraped from website", cardNo);

                    let idolizationPieces = new PieceInfo(0, 0, 0, 0);
                    for (const piece of idolPieceMatch[1].split("/")) {
                        idolizationPieces = idolizationPieces.addPiece(AttributeEnum.fromSongAttributeName(piece.substring(1, piece.length - 1)));
                    }
                    idolizePieceInfo.piecesAll = idolizationPieces.all;
                    idolizePieceInfo.piecesSmile = idolizationPieces.smile;
                    idolizePieceInfo.piecesPure = idolizationPieces.pure;
                    idolizePieceInfo.piecesCool = idolizationPieces.cool;
                    memberInfo.idolizeBonus = idolizePieceInfo as CardMemberIdolizePieceExtraInfo;
                    skillText = skillText.substring(0, idolPieceMatch.index);
                } else {
                    memberInfo.idolizeType = CardMemberIdolizeType.NO_PIECES;
                }
            } else {
                memberInfo.idolizeType = CardMemberIdolizeType.NONE;
            }

            // Before handling groups, check whether the Group Skill is on this card's Skill
            // It has to be cut off from the card's Skill text, whether it's the first imported card of the group or not
            let splitMatch;
            if (skillText !== undefined) {
                splitMatch = pairSkillPattern.exec(skillText) || trioSkillPattern.exec(skillText);
                if (splitMatch) {
                    // splitMatch[1] now contains the group's Skill
                    skillText = skillText!.substring(0, splitMatch.index);
                }
            }

            // Group handling on import is slightly wacky: often, only one of the cards contains the group info, and on
            // Trios, only that card (the "leader") has the [Entry] Skill for forming the group, too.
            // That means there's three possibilites:
            // - we are importing a non-leader card, and the group is not known yet: we cannot know it is a grouped card,
            //   so we simply import it as if it was a non-grouped card
            // - we are importing a leader card: the group is now known - store the group skill and read the IDs used in
            //   this group. Check whether cards with those IDs have been imported before - if so, set their group now
            // - we are importing a non-leader card after the group is known: we can set the group on it right away
            // CardMemberGroup.expectedMemberIds is storing the IDs read from the leader. That way, if importing a
            // non-leader card, we can simply check if their ID appears in that column to add it to a known group.
            const findExistingGroup = await DB.CardMemberGroup.findOne({
                where: {
                    expectedMemberIds: {[Op.like]: "%|" + card.id + "|%"}
                },
                attributes: ["id"],
                transaction
            });

            if (findExistingGroup !== null) {
                // Non-leader found group it should belong to
                memberInfo.groupId = findExistingGroup.id;
            } else if (skillText !== undefined) {
                const groupMatch = pairPattern.exec(skillText) || trioPattern.exec(skillText);
                if (groupMatch !== null) {
                    // Leader with grouping Skill found, extract the Member IDs
                    const group: Partial<CardMemberGroup> & { skills?: Partial<Skill>[] } = {};

                    let memberIds: number[];
                    if (groupMatch[3]) {
                        memberIds = [card.id!, parseInt(groupMatch[1]), parseInt(groupMatch[3])];
                        group.type = CardMemberGroupType.TRIO;
                    } else {
                        memberIds = [card.id!, parseInt(groupMatch[1])];
                        group.type = CardMemberGroupType.PAIR;
                    }
                    group.expectedMemberIds = "|" + memberIds.sort().join("|") + "|";

                    if (splitMatch) {
                        // If the group's Skills were found on the card above, add them to the group
                        const skillLines = splitMatch[1].split("\n").map((s: string) => autoAnnotateSkill(s));
                        const checkSkillPattern = await Promise.all(skillLines.map(s => tryAllPatterns(DB, s, {transaction})));

                        group.skills = [];
                        for (let i = 0; i < skillLines.length; i++) {
                            const skillLine = skillLines[i];
                            group.skills.push({
                                line: i,
                                patternId: checkSkillPattern[i]?.pattern.id || null,
                                jpn: skillLine,
                                eng: checkSkillPattern[i]?.skill || null,
                            });
                        }
                    }

                    // Actually create the group, then check whether the group's other Members were already imported
                    memberInfo.groupId = (await DB.CardMemberGroup.create(group, {
                        include: [DB.Skill],
                        transaction
                    })).id;
                    const existingMembers = await DB.Card.scope(["cardNoOnly"]).findAll({
                        where: {
                            id: {
                                [Op.in]: memberIds
                            }
                        },
                        transaction
                    });
                    if (existingMembers.length > 0) {
                        await DB.CardMemberExtraInfo.update({groupId: memberInfo.groupId}, {
                            where: {
                                cardNo: {
                                    [Op.in]: existingMembers.map(c => c.cardNo)
                                }
                            },
                            transaction
                        });
                    }
                }
            }

            (card as CardMember).member = memberInfo as CardMemberExtraInfo;
        } else if (type === CardType.SONG) {
            const checkSongTable = await Promise.all(card.nameJpn!.split("／").map((s: string) => DB.TranslationName.findByPk(s, {transaction})));
            if (checkSongTable.every(s => s !== null)) {
                card.nameEng = checkSongTable.map(s => s!.eng).join("/");
            }

            const songInfo: Partial<CardSongExtraInfo> = {};
            // GR rarity cannot be derived from any of the page info - for new GR cards, this must be fixed manually
            songInfo.rarity = CardSongRarity.M;
            songInfo.attribute = AttributeEnum.fromSongAttributeName(info["枠属性"]!).id;
            const lpMatch = lpPattern.exec(info["ライブP"]!);
            if (lpMatch === null) throw new ImportError("Invalid Live Points scraped from website", cardNo);
            songInfo.lpBase = parseInt(lpMatch[1]);
            songInfo.lpBonus = lpMatch[2] === "+X" ? "X" : (lpMatch[2] === "+∞" ? "∞" : parseInt(lpMatch[2]));

            if (info["共通スコア"]) {
                songInfo.requirementType = CardSongRequirementType.ATTR_PIECE;
                songInfo.attrRequirement = {
                    piecesSmile: parseInt(info["赤スコア"]!),
                    piecesPure: parseInt(info["緑スコア"]!),
                    piecesCool: parseInt(info["青スコア"]!)
                } as CardSongAttrReqExtraInfo;
                card.song = songInfo as CardSongWithAttrReq["song"];
            } else {
                songInfo.requirementType = CardSongRequirementType.ANY_PIECE;
                songInfo.anyRequirement = {
                    piecesAll: parseInt(info["共通スコア"]!)
                } as CardSongAnyReqExtraInfo;
                card.song = songInfo as CardSongWithAnyReq["song"];
            }
        } /*else if (type === CardType.MEMORY) { nothing to do }*/

        if (skillText !== undefined && skillText.trim() !== "") {
            const skillLines = skillText.split("\n").map((s: string) => autoAnnotateSkill(s));
            const checkSkillPattern = await Promise.all(skillLines.map(s => tryAllPatterns(DB, s, {transaction})));

            const skills: Partial<Skill>[] = [];
            for (let i = 0; i < skillLines.length; i++) {
                const skillLine = skillLines[i];
                skills.push({
                    cardNo,
                    line: i,
                    patternId: checkSkillPattern[i]?.pattern.id || null,
                    jpn: skillLine,
                    eng: checkSkillPattern[i]?.skill || null,
                })
            }
            card.skills = skills as Skill[];
        }

        card.frontOrientation = await checkImageOrientation(orientationCheckCardNo, "front");
        card.backOrientation = await checkImageOrientation(orientationCheckCardNo, "back");

        // Add the card to the database
        await DB.Card.create(card, {
            include: [
                {
                    model: DB.CardMemberExtraInfo,
                    include: [
                        DB.CardMemberIdolizePieceExtraInfo
                    ]
                },
                {
                    model: DB.CardSongExtraInfo,
                    include: [
                        DB.CardSongAnyReqExtraInfo,
                        DB.CardSongAttrReqExtraInfo
                    ]
                },
                DB.Skill
            ],
            transaction
        });

        // Find any already existing annotations that now link to this new card
        for (const annotation of await DB.Annotation.findAll({transaction})) {
            const type = AnnotationEnum.fromId(annotation.type);
            const options = makeFindOptionsFromFilters(type.getSearchFilters(annotation.parameter));
            options.where = {...options.where};
            options.transaction = transaction;
            options.attributes = ["cardNo"];
            if ((await DB.Card.findAll(options)).some(r => r.cardNo === cardNo)) {
                await DB.Link.upsert({
                    from: annotation.id,
                    to: cardNo
                }, {transaction});
            }
        }
    });
}

const cardLinkTitlePattern = /[【「](\d*?) [^{}]*?[】」]/g;
const cardLinkSongNamePattern = /「([^{}]*?)」の《ライブ》に参加/g;
const cardLinkCostumeNamePatternA = /ライブ衣装が「([^{}]*?)」/g;
const cardLinkCostumeNamePatternB = /「([^{}]*?)」のライブ衣装/g;
const cardLinkSkillContainsA = /スキルに「([^{}]*?)」/g;
const cardLinkSkillContainsB = /スキルで『([^{}]*?)』/g;

function autoAnnotateSkill(skill: string) {
    skill = skill.replace(cardLinkTitlePattern, "「{{card:$1}}」");
    skill = skill.replace(cardLinkSongNamePattern, "「{{song:$1}}」の《ライブ》に参加");
    skill = skill.replace(cardLinkCostumeNamePatternA, "ライブ衣装が「{{costume:$1}}」");
    skill = skill.replace(cardLinkCostumeNamePatternB, "「{{costume:$1}}」のライブ衣装");
    skill = skill.replace(cardLinkSkillContainsA, "スキルに「{{skilltext:$1}}」");
    skill = skill.replace(cardLinkSkillContainsB, "スキルで『{{skilltext:$1}}』");

    return skill;
}