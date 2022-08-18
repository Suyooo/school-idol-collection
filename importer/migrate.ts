import DB from "../models/db";
import sql from "better-sqlite3";
import Log from "../utils/logger";
import CardType from "../types/cardType";
import CardMemberGroupType from "../types/cardMemberGroupType";
import CardMemberIdolizeType from "../types/cardMemberIdolizeType";
import CardSongRequirementType from "../types/cardSongRequirementType";

const oldDB = new sql("old_cardlist.db", {verbose: Log.debug.bind(this, "OLDDB")});

const cards = oldDB.prepare("SELECT * FROM cards").all();
const cards_pk = new Map(cards.map(c => [c.cardno, c]));
const cards_faq_links = oldDB.prepare("SELECT * FROM cards_faq_links").all();

const cards_members = oldDB.prepare("SELECT * FROM cards_members").all();
const cards_members_pk = new Map(cards_members.map(c => [c.cards_m_cardno, c]));
const cards_members_groups = oldDB.prepare("SELECT * FROM cards_members_groups").all();
const cards_members_groups_pk = new Map(cards_members_groups.map(c => [c.id, c]));
const cards_members_groups_map = oldDB.prepare("SELECT * FROM cards_members_groups_map").all();
const cards_members_groups_map_byid = new Map(cards_members_groups.map(c => [c.id, cards_members_groups_map.filter(m => m.groups_m_id === c.id)]));
const cards_members_groups_map_pk = new Map(cards_members_groups_map.map(c => [c.member_id, c]));
const cards_members_idolizedpieces = oldDB.prepare("SELECT * FROM cards_members_idolizedpieces").all();
const cards_members_idolizedpieces_pk = new Map(cards_members_idolizedpieces.map(c => [c.members_m_cardno, c]));

const cards_songs = oldDB.prepare("SELECT * FROM cards_songs").all();
const cards_songs_pk = new Map(cards_songs.map(c => [c.cards_m_cardno, c]));
const cards_songs_anyreq = oldDB.prepare("SELECT * FROM cards_songs_anyreq").all();
const cards_songs_anyreq_pk = new Map(cards_songs_anyreq.map(c => [c.songs_m_cardno, c]));
const cards_songs_attrreq = oldDB.prepare("SELECT * FROM cards_songs_attrreq").all();
const cards_songs_attrreq_pk = new Map(cards_songs_attrreq.map(c => [c.songs_m_cardno, c]));

const cards_translation_costume = oldDB.prepare("SELECT * FROM cards_translation_costume").all();
const cards_translation_group_skill = oldDB.prepare("SELECT * FROM cards_translation_group_skill").all();
const cards_translation_group_skill_pk = new Map(cards_members_groups.map(c => [c.id, cards_translation_group_skill.filter(s => s.groups_m_id === c.id)]));
const cards_translation_name = oldDB.prepare("SELECT * FROM cards_translation_name").all();
const cards_translation_name_pk = new Map(cards_translation_name.map(c => [c.cards_m_cardno, c]));
const cards_translation_skill = oldDB.prepare("SELECT * FROM cards_translation_skill").all();
const cards_translation_skill_pk = new Map(cards.map(c => [c.cardno, cards_translation_skill.filter(s => s.cards_m_cardno === c.cardno)]));

const patterns = oldDB.prepare("SELECT * FROM patterns").all();
const table_names = oldDB.prepare("SELECT * FROM table_names").all();
const table_songs = oldDB.prepare("SELECT * FROM table_songs").all();
const table_songs_jpn = new Map(table_songs.map(c => [c.jpn, c.eng]));

(async () => {
    await DB.syncPromise;
    await DB.sequelize.sync({force: true});

    for (const table_name of table_names) {
        await DB.TranslateTableName.create({
            jpn: table_name.jpn,
            eng: table_name.eng
        });
    }

    for (const table_song of table_songs) {
        await DB.TranslateTableSong.create({
            jpn: table_song.jpn,
            eng: table_song.eng
        });
    }

    const patternIdMapping = new Map();
    for (const pattern of patterns) {
        patternIdMapping.set(pattern.id, (await DB.TranslateTablePattern.create({
            triggers: pattern.triggers,
            regex: pattern.regex,
            template: pattern.template,
            groupTypes: pattern.grouptypes
        })).id);
    }

    const cardMemberGroupIdMapping = new Map();
    for (const group of cards_members_groups) {
        cardMemberGroupIdMapping.set(group.id, (await DB.CardMemberGroup.create({
            type: cards_members_groups_map_byid.get(group.id)!.length === 3 ? CardMemberGroupType.TRIO : CardMemberGroupType.PAIR,
            skill: group.skill
        })).id);
    }

    for (const card of cards) {
        const obj: any = {
            cardNo: card.cardno,
            id: card.id,
            type: card.type,
            name: card.name,
            skill: card.skill,
            copyright: card.copyright
        }
        if (card.type === CardType.MEMBER) {
            const member = cards_members_pk.get(card.cardno);
            obj.member = {
                rarity: member.rarity,
                cost: member.cost,
                birthDay: member.birth_day,
                birthMonth: member.birth_month,
                year: member.year,
                piecesAll: member.pieces_all,
                piecesSmile: member.pieces_smile,
                piecesPure: member.pieces_pure,
                piecesCool: member.pieces_cool,
                piecesBdayAttribute: member.pieces_bday_type,
                costume: member.costume,
                abilityRush: member.abilities % 2 === 1,
                abilityLive: member.abilities >= 2,
                idolizeType: member.idolize_type
            };
            if (member.groups_m_id !== null) {
                obj.member.groupId = cardMemberGroupIdMapping.get(member.groups_m_id);
            }
            if (member.idolize_type === CardMemberIdolizeType.WITH_PIECES) {
                const idlz = cards_members_idolizedpieces_pk.get(card.cardno);
                obj.member.idolizeBonus = {
                    piecesAll: idlz.pieces_all,
                    piecesSmile: idlz.pieces_smile,
                    piecesPure: idlz.pieces_pure,
                    piecesCool: idlz.pieces_cool
                }
            }
        } else if (card.type === CardType.SONG) {
            const song = cards_songs_pk.get(card.cardno);
            obj.song = {
                rarity: song.rarity,
                attribute: song.attribute,
                lpBase: song.lp_base,
                lpBonus: song.lp_bonus === "+∞" ? "∞" : (song.lp_bonus === "+X" ? "X" : parseInt(song.lp_bonus)),
                requirementType: song.req_type
            }
            if (song.req_type === CardSongRequirementType.ANY_PIECE) {
                const req = cards_songs_anyreq_pk.get(card.cardno);
                obj.song.anyRequirement = {
                    piecesAll: req.pieces
                }
            } else {
                const req = cards_songs_attrreq_pk.get(card.cardno);
                obj.song.attrRequirement = {
                    piecesSmile: req.pieces_smile,
                    piecesPure: req.pieces_pure,
                    piecesCool: req.pieces_cool
                }
            }
        }
        await DB.Card.create(obj, {
            include: [
                {
                    model: DB.CardMemberExtraInfo,
                    include: [
                        DB.CardMemberGroup,
                        DB.CardMemberIdolizePieceExtraInfo
                    ]
                },
                {
                    model: DB.CardSongExtraInfo,
                    include: [
                        DB.CardSongAnyReqExtraInfo,
                        DB.CardSongAttrReqExtraInfo
                    ]
                }
            ]
        });
        if (card.type === CardType.MEMBER && cards_members_pk.get(card.cardno).costume) {
            console.log(card.cardno, cards_members_pk.get(card.cardno).costume, table_songs_jpn.get(cards_members_pk.get(card.cardno).costume))
            await DB.TranslationCostume.create({
                cardMemberExtraInfoCardNo: card.cardno,
                costume: table_songs_jpn.get(cards_members_pk.get(card.cardno).costume)
            });
        }
    }

    for (const faq of cards_faq_links) {
        await DB.CardFAQLink.create({
            cardId: faq.cards_m_id,
            displayOrder: faq.display_order,
            label: faq.label,
            link: faq.link
        });
    }

    for (const t_name of cards_translation_name) {
        await DB.TranslationName.create({
            cardNo: t_name.cards_m_cardno,
            name: t_name.name
        });
    }
    for (const t_skill of cards_translation_skill) {
        await DB.TranslationSkill.create({
            cardNo: t_skill.cards_m_cardno,
            line: t_skill.line,
            skill: t_skill.skill,
            patternId: patternIdMapping.get(t_skill.used_pattern)
        });
    }
    for (const t_group_skill of cards_translation_group_skill) {
        await DB.TranslationGroupSkill.create({
            groupId: cardMemberGroupIdMapping.get(parseInt(t_group_skill.groups_m_id)),
            line: t_group_skill.line,
            skill: t_group_skill.skill,
            patternId: patternIdMapping.get(t_group_skill.used_pattern)
        });
    }
})();