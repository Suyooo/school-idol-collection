// noinspection NonAsciiCharacters,JSNonASCIINames

import * as fs from "fs";
import Chokidar from "chokidar";
import {Mutex} from "async-mutex";
import {Op} from "sequelize";

import Attribute, {ColorNameJpn, PieceAttributeJpnName, SongAttributeNameJpn} from "../types/attribute";
import {CardMemberRarity, CardSongRarity} from "../types/cardRarity";
import Log from "../utils/logger";
import ImportError from "../errors/importError";
import PieceInfo from "../types/pieceInfo";
import DB from "../models/db";
import CardType from "../types/cardType";
import CardMemberIdolizeType from "../types/cardMemberIdolizeType";
import CardMemberGroupType from "../types/cardMemberGroupType";
import {tryAllPatterns} from "../translation/skills";
import autoAnnotateSkill from "./autoAnnotate";
import CardSongRequirementType from "../types/cardSongRequirementType";
import Card from "../models/card/card";
import CardMemberGroup from "../models/card/memberGroup";
import CardMemberExtraInfo from "../models/card/memberExtraInfo";
import {makeFindOptionsFromFilters} from "../search/query";
import AnnotationType from "../types/annotationType";

type Empty = "―" | "－" | "─" | "-";
type RawAttr = SongAttributeNameJpn & Empty;

type RawDataMember = {
    "type": "メンバー", "レアリティ": keyof typeof CardMemberRarity, "誕生日": string, "学年": string, "コスト": string,
    "ピース1": RawAttr, "ピース2": RawAttr, "ピース3": RawAttr, "ピース4": RawAttr, "ボーナス": RawAttr, "特技": string, "衣装": string
};

type RawDataSongOrMemory = {
    "枠属性": SongAttributeNameJpn, "ライブP": string, "赤スコア": string, "緑スコア": string, "青スコア": string, "共通スコア": string, "カードの色": ColorNameJpn
};

type RawDataSong = { "type": "楽曲" } & RawDataSongOrMemory;

type RawDataMemory = { "type": "メモリー" } & RawDataSongOrMemory;

type RawData = (RawDataMember | RawDataSong | RawDataMemory) &
    { "name": string, "カードNo.": string, "商品": string, "ID": string, "種別": string, "スキル": string, "コピーライト": string };

function isEmpty(x: string): x is Empty {
    return x == "―" || x == "－" || x == "─" || x == "-";
}

if (!fs.existsSync("import")) fs.mkdirSync("import");
const watcher = Chokidar.watch("import", {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    awaitWriteFinish: true
});
const mutex = new Mutex();

watcher.on("add", (path) => {
    if (path.endsWith(".json")) {
        mutex.runExclusive(() => {
            Log.info("IMPORT", "New raw info file added, importing: " + path);
            return importCard(path).catch(e => Log.error("IMPORT", e.message + e.stack));
        }).catch(e => Log.error("IMPORT", "Mutex problem: " + e.message + e.stack));
    } else if (path.endsWith(".jpg")) {
        Log.info("IMPORT", "New image added, moving to correct location: " + path);
        const filename = path.split("/").at(-1)!;
        const folder = "src/server/frontend/static/images/" + filename.split("-")[0];
        if (!fs.existsSync(folder)) fs.mkdirSync(folder);
        fs.copyFileSync(path, folder + "/" + filename)
        fs.unlinkSync(path);
    } else {
        Log.error("IMPORT", "New file added but unrecognized file extension, ignoring: " + path);
    }
})

const birthdayPattern = /^(\d*)月(\d*)日$/;
const lpPattern = /^(\d*)([+-][\dX∞]*)?$/;
const idolizedPiecesPattern = /<覚醒>(【(?:オール|赤|緑|青)】(?:\/【(?:オール|赤|緑|青)】?)*)/;
const pairPattern = /[【「](\d*?) (.*?)[】」]とペアになる。/;
const pairSkillPattern = /\n?<ペアスキル>\n?(.*)/s;
const trioPattern = /[【「](\d*?) (.*?)[】」][【「](\d*?) (.*?)[】」]とトリオになる。/;
const trioSkillPattern = /\n?<トリオスキル>\n?(.*)/s;

export async function importCard(path: string) {
    const rawdata: RawData = JSON.parse(fs.readFileSync(path).toString());

    await DB.sequelize.transaction(async (transaction) => {
        const card: Omit<Partial<Card>, "member" | "song"> & { member?: any, song?: any, skills?: any[] } = {
            cardNo: rawdata["カードNo."]!,
            id: parseInt(rawdata["ID"])!,
            nameJpn: rawdata["name"]!,
            copyright: rawdata["コピーライト"]
        };
        let skillText = isEmpty(rawdata["スキル"]) ? null : rawdata["スキル"].replace(/\n\n/g, "\n");

        if (rawdata["type"] == "メンバー") {
            card.type = CardType.MEMBER;

            const checkNameTable = await DB.TranslationName.findByPk(card.nameJpn, {transaction});
            if (checkNameTable !== null) {
                card.nameEng = checkNameTable.eng;
            }

            card.member = {} as Partial<CardMemberExtraInfo>;
            card.member.rarity = CardMemberRarity[rawdata["レアリティ"]];
            card.member.cost = (isEmpty(rawdata["コスト"]) ? 0 : rawdata["コスト"].length) as 0 | 1 | 2 | 3;
            if (rawdata["誕生日"] !== "？？？") {
                const bdMatch = birthdayPattern.exec(rawdata["誕生日"]);
                if (bdMatch === null) throw new ImportError("Invalid birthday scraped from website", path);
                card.member.birthDay = parseInt(bdMatch[2]) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
                card.member.birthMonth = parseInt(bdMatch[1]) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
            }
            card.member.year = (isEmpty(rawdata["学年"]) ? null : parseInt(rawdata["学年"].charAt(0))) as 1 | 2 | 3 | null;
            card.member.abilityRush = rawdata["特技"].indexOf("RUSH") !== -1;
            card.member.abilityLive = rawdata["特技"].indexOf("LIVE") !== -1;
            card.member.costumeJpn = isEmpty(rawdata["衣装"]) ? null : rawdata["衣装"];

            if (card.member.costumeJpn) {
                const checkCostumeTable = await DB.TranslationSong.findByPk(card.member.costumeJpn, {transaction});
                if (checkCostumeTable !== null) {
                    card.member.costumeEng = checkCostumeTable.eng;
                }
            }

            let pieces = new PieceInfo(0, 0, 0, 0);
            if (!isEmpty(rawdata["ピース1"])) pieces = pieces.addPiece(Attribute.get(rawdata["ピース1"]));
            if (!isEmpty(rawdata["ピース2"])) pieces = pieces.addPiece(Attribute.get(rawdata["ピース2"]));
            if (!isEmpty(rawdata["ピース3"])) pieces = pieces.addPiece(Attribute.get(rawdata["ピース3"]));
            if (!isEmpty(rawdata["ピース4"])) pieces = pieces.addPiece(Attribute.get(rawdata["ピース4"]));
            card.member.piecesAll = pieces.all;
            card.member.piecesSmile = pieces.smile;
            card.member.piecesPure = pieces.pure;
            card.member.piecesCool = pieces.cool;
            card.member.pieceBdayAttribute = isEmpty(rawdata["ボーナス"]) ? null : Attribute.get(rawdata["ボーナス"]);

            if (skillText !== null && skillText.indexOf("【特別練習】") !== -1) {
                if (skillText.indexOf("<覚醒>") !== -1) {
                    card.member.idolizeBonus = {};
                    card.member.idolizeType = CardMemberIdolizeType.WITH_PIECES;
                    const idolPieceMatch = idolizedPiecesPattern.exec(skillText);
                    if (idolPieceMatch === null) throw new ImportError("Can't read Idolized Pieces scraped from website", path);
                    let idolizationPieces = new PieceInfo(0, 0, 0, 0);
                    for (const piece of idolPieceMatch[1].split("/")) {
                        idolizationPieces = idolizationPieces.addPiece(Attribute.get(piece.substring(1, piece.length - 1) as PieceAttributeJpnName));
                    }
                    card.member.idolizeBonus.piecesAll = idolizationPieces.all;
                    card.member.idolizeBonus.piecesSmile = idolizationPieces.smile;
                    card.member.idolizeBonus.piecesPure = idolizationPieces.pure;
                    card.member.idolizeBonus.piecesCool = idolizationPieces.cool;
                    skillText = skillText.substring(0, idolPieceMatch.index);
                } else {
                    card.member.idolizeType = CardMemberIdolizeType.NO_PIECES;
                }
            } else {
                card.member.idolizeType = CardMemberIdolizeType.NONE;
            }

            // Before handling groups, check whether the group Skill is on this card's Skill
            // Has to be cut off, whether it's the first imported card of the group or not

            let splitMatch;
            if (skillText !== null) {
                splitMatch = pairSkillPattern.exec(skillText) || trioSkillPattern.exec(skillText);
                if (splitMatch) {
                    skillText = skillText!.substring(0, splitMatch.index);
                }
            }

            // Group handling on import is slightly wacky: often, only one of the cards contains the group info ("leader")
            // That means there's three possibilites:
            // - we are importing a non-leader card, and the group is not known yet: we cannot know it is a grouped card,
            //   so we simply import it as if it was a non-grouped card
            // - we are importing a leader card: the group is now known - store the group skill and read the IDs used in
            //   this group. Check whether cards with those IDs have been imported before - if so, set their group now
            // - we are importing a non-leader card after the group is known: we can add the card to it right away
            // CardMemberGroup.expectedMemberIds is storing the IDs read from the leader. That way, if importing a non-
            // leader card, we can simply check if their ID appears in that column to add it to a known group.

            const findExistingGroup = await DB.CardMemberGroup.findOne({
                where: {
                    expectedMemberIds: {[Op.like]: "%|" + card.id + "|%"}
                },
                attributes: ["id"],
                transaction
            });
            if (findExistingGroup !== null) {
                card.member.groupId = findExistingGroup.id;
            } else if (skillText !== null) {
                const groupMatch = pairPattern.exec(skillText) || trioPattern.exec(skillText);
                if (groupMatch !== null) {
                    const group: Partial<CardMemberGroup> & { skills?: any[] } = {};

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
                        const skillLines = splitMatch[1].split("\n").map((s: string) => autoAnnotateSkill(s));
                        const checkSkillPattern = await Promise.all(skillLines.map(s => tryAllPatterns(s, {transaction})));

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

                    card.member.groupId = (await DB.CardMemberGroup.create(group, {
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
                        await DB.CardMemberExtraInfo.update({groupId: card.member.groupId}, {
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
        } else if (rawdata["type"] == "楽曲") {
            card.type = CardType.SONG;

            const checkSongTable = await Promise.all(card.nameJpn!.split("／").map((s: string) => DB.TranslationName.findByPk(s, {transaction})));
            if (checkSongTable.every(s => s !== null)) {
                card.nameEng = checkSongTable.map(s => s!.eng).join("/");
            }

            card.song = {};
            card.song.rarity = CardSongRarity.M;
            card.song.attribute = Attribute.get(rawdata["枠属性"]);
            const lpMatch = lpPattern.exec(rawdata["ライブP"]);
            if (lpMatch === null) throw new ImportError("Invalid Live Points scraped from website", path);
            card.song.lpBase = parseInt(lpMatch[1]);
            card.song.lpBonus = lpMatch[2] === "+X" ? "X" : (lpMatch[2] === "+∞" ? "∞" : parseInt(lpMatch[2]));

            if (isEmpty(rawdata["共通スコア"])) {
                card.song.requirementType = CardSongRequirementType.ATTR_PIECE;
                card.song.attrRequirement = {
                    piecesSmile: parseInt(rawdata["赤スコア"]),
                    piecesPure: parseInt(rawdata["緑スコア"]),
                    piecesCool: parseInt(rawdata["青スコア"])
                };
            } else {
                card.song.requirementType = CardSongRequirementType.ANY_PIECE;
                card.song.anyRequirement = {
                    piecesAll: parseInt(rawdata["共通スコア"])
                };
            }
        } else /*if (rawdata["type"] == "メモリー")*/ {
            card.type = CardType.MEMORY;
        }

        if (skillText !== null && skillText.trim() !== "") {
            const skillLines = skillText.split("\n").map((s: string) => autoAnnotateSkill(s));
            const checkSkillPattern = await Promise.all(skillLines.map(s => tryAllPatterns(s, {transaction})));

            card.skills = [];
            for (let i = 0; i < skillLines.length; i++) {
                const skillLine = skillLines[i];
                card.skills.push({
                    cardNo: card.cardNo!,
                    line: i,
                    patternId: checkSkillPattern[i]?.pattern.id || null,
                    jpn: skillLine,
                    eng: checkSkillPattern[i]?.skill || null,
                })
            }
        }

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

        for (const annotation of await DB.Annotation.findAll({transaction})) {
            const type = AnnotationType.get(annotation.type);
            const options = makeFindOptionsFromFilters(type.getSearchFilters(annotation.parameter));
            options.where = {...options.where, cardNo: card.cardNo};
            options.transaction = transaction;
            if (await DB.Card.findOne(options) !== null) {
                await DB.Link.create({
                    from: annotation.id,
                    to: card.cardNo
                }, {transaction});
            }
        }
    });

    Log.info("IMPORT", "Successfully imported " + path + ", deleting");
    fs.unlinkSync(path);
}