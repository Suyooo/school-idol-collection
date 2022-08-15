import openDB from "better-sqlite3";
import Log from "./logger";
import CardType from "../cards/cardType";
import ReqType from "../cards/reqType";
import {RarityMember, RaritySong} from "../cards/rarity";
import IdolizeType from "../cards/idolizeType";

const DB = openDB(process.cwd() + "/cardlist.db", {fileMustExist: true, verbose: Log.debug.bind(this, "DB")});

export type cardsRow = { cardno: string, id: number, type: CardType, name: string, skill: string | undefined, copyright: string };
export type cardsMembersRow = {
    rarity: RarityMember, cost: 0 | 1 | 2 | 3, birth_day: number | undefined, birth_month: number | undefined,
    year: 1 | 2 | 3 | undefined, pieces_all: number, pieces_smile: number, pieces_pure: number, pieces_cool: number,
    pieces_bday_type: number | undefined, costume: string | undefined, abilities: 0 | 1 | 2 | 3, idolize_type: IdolizeType, groups_m_id: number
};
export type cardsMembersGroupsRow = { id: number, skill: string | undefined };
export type cardsMembersGroupsMapRow = { member_id: number, groups_m_id: number };
export type cardsMembersIdolizedpiecesRow = { members_m_cardno: string, pieces_all: number, pieces_smile: number, pieces_pure: number, pieces_cool: number };
export type cardsSongsRow = { cards_m_cardno: string, rarity: RaritySong, attribute: number, lp_base: number, lp_bonus: string | undefined, req_type: ReqType };
export type cardsSongsAnyreqRow = { songs_m_cardno: string, pieces: number };
export type cardsSongsAttrreqRow = { songs_m_cardno: string, pieces_smile: number, pieces_pure: number, pieces_cool: number };
export type cardsTranslationCostume = { members_m_cardno: string, costume: string };
export type cardsTranslationGroupSkill = { groups_m_id: number, line: number, skill: string, used_pattern: number };
export type cardsTranslationName = { cards_m_cardno: string, name: string };
export type cardsTranslationSkill = { cards_m_cardno: string, line: number, skill: string, used_pattern: number };
export type patternRow = { id: number, triggers: number, regex: string, template: string, grouptypes: string };

export default DB;