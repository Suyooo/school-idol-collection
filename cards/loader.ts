import {Card, CardMember, CardMemberIdolizable, CardMemory, CardSongAnyReq, CardSongAttrReq} from "./card";
import DB, {
    cardsMembersIdolizedpiecesRow,
    cardsMembersRow,
    cardsRow,
    cardsSongsAnyreqRow,
    cardsSongsAttrreqRow,
    cardsSongsRow
} from "../utils/db";
import CardType from "./cardType";
import ReqType from "./reqType";
import PieceInfo from "./pieceInfo";
import IdolizeType from "./idolizeType";
import {getGroupFor} from "./cardMemberGroup";
import UnimplementedError from "../errors/unimplemented";
import Attribute from "../consts/attributes";

const getCardCardNoStmt = DB.prepare("SELECT * FROM cards WHERE cardno = ?");
const getCardIdStmt = DB.prepare("SELECT * FROM cards WHERE id = ?");
const getCardIdExceptStmt = DB.prepare("SELECT * FROM cards WHERE id = ? AND cardno != ?");
const getCardSetStmt = DB.prepare("SELECT * FROM cards WHERE cardno LIKE ? ORDER BY cardno");
const getCardMemberStmt = DB.prepare("SELECT * FROM cards_members WHERE cards_m_cardno = ?");
const getCardMemberIdolizedPiecesStmt = DB.prepare("SELECT * FROM cards_members_idolizedpieces WHERE members_m_cardno = ?");
const getCardSongStmt = DB.prepare("SELECT * FROM cards_songs WHERE cards_m_cardno = ?");
const getCardSongAnyReqStmt = DB.prepare("SELECT * FROM cards_songs_anyreq WHERE songs_m_cardno = ?");
const getCardSongAttrReqStmt = DB.prepare("SELECT * FROM cards_songs_attrreq WHERE songs_m_cardno = ?");

export function cardNoExists(cardNo: string): boolean {
    return getCardCardNoStmt.get(cardNo) != undefined;
}

export function loadCardFromCardNo(cardNo: string): Card | undefined {
    return loadCardFromRow(getCardCardNoStmt.get(cardNo));
}

export function loadFirstCardFromId(id: number): Card | undefined {
    return loadCardFromRow(getCardIdStmt.get(id));
}

export function loadCardsFromId(id: number, except?: string): Card[] {
    const arr: Card[] = [];
    const rows = except ? getCardIdExceptStmt.all(id, except) : getCardIdStmt.all(id);
    for (const row of rows) {
        const card = loadCardFromRow(row);
        if (card != undefined) arr.push(card);
    }
    return arr;
}

export function loadCardSet(set: string): Card[] {
    const arr: Card[] = [];
    const rows = getCardSetStmt.all(set + "-%");
    for (const row of rows) {
        const card = loadCardFromRow(row);
        if (card != undefined) arr.push(card);
    }
    return arr;
}

export function loadCardFromRow(row: cardsRow): Card | undefined {
    if (row === undefined) {
        return undefined;
    }
    if (row.type == CardType.MEMBER) {
        const memberRow: cardsMembersRow = getCardMemberStmt.get(row.cardno);
        const birthdayPiece = memberRow.pieces_bday_type ? Attribute[memberRow.pieces_bday_type] : undefined;
        if (memberRow.idolize_type == IdolizeType.NONE) {
            return new CardMember(row.cardno, row.id, row.name, row.skill, row.copyright, memberRow.rarity, memberRow.cost,
                memberRow.birth_day, memberRow.birth_month, memberRow.year, new PieceInfo(memberRow.pieces_all,
                    memberRow.pieces_smile, memberRow.pieces_pure, memberRow.pieces_cool), birthdayPiece,
                memberRow.costume, (memberRow.abilities & 1) == 1, (memberRow.abilities & 2) == 2,
                memberRow.idolize_type, getGroupFor(row.id));
        } else if (memberRow.idolize_type == IdolizeType.NO_PIECES) {
            return new CardMemberIdolizable(row.cardno, row.id, row.name, row.skill, row.copyright, memberRow.rarity, memberRow.cost,
                memberRow.birth_day, memberRow.birth_month, memberRow.year, new PieceInfo(memberRow.pieces_all,
                    memberRow.pieces_smile, memberRow.pieces_pure, memberRow.pieces_cool), birthdayPiece,
                memberRow.costume, (memberRow.abilities & 1) == 1, (memberRow.abilities & 2) == 2,
                undefined, getGroupFor(row.id));
        } else if (memberRow.idolize_type == IdolizeType.HAS_PIECES) {
            const pieceRow: cardsMembersIdolizedpiecesRow = getCardMemberIdolizedPiecesStmt.get(row.cardno);
            return new CardMemberIdolizable(row.cardno, row.id, row.name, row.skill, row.copyright, memberRow.rarity,
                memberRow.cost, memberRow.birth_day, memberRow.birth_month, memberRow.year,
                new PieceInfo(memberRow.pieces_all, memberRow.pieces_smile, memberRow.pieces_pure, memberRow.pieces_cool), birthdayPiece,
                memberRow.costume, (memberRow.abilities & 1) == 1, (memberRow.abilities & 2) == 2,
                new PieceInfo(pieceRow.pieces_all, pieceRow.pieces_smile, pieceRow.pieces_pure, pieceRow.pieces_cool),
                getGroupFor(row.id));
        } else {
            throw new UnimplementedError("Unknown IdolizeType " + memberRow.idolize_type);
        }
    } else if (row.type == CardType.SONG) {
        const songRow: cardsSongsRow = getCardSongStmt.get(row.cardno);
        if (songRow.req_type == ReqType.ANY_PIECE) {
            const reqRow: cardsSongsAnyreqRow = getCardSongAnyReqStmt.get(row.cardno);
            return new CardSongAnyReq(row.cardno, row.id, row.name, row.skill, row.copyright, songRow.rarity, Attribute[songRow.attribute],
                songRow.lp_base, songRow.lp_bonus, reqRow.pieces);
        } else if (songRow.req_type == ReqType.ATTR_PIECE) {
            const reqRow: cardsSongsAttrreqRow = getCardSongAttrReqStmt.get(row.cardno);
            return new CardSongAttrReq(row.cardno, row.id, row.name, row.skill, row.copyright, songRow.rarity, Attribute[songRow.attribute],
                songRow.lp_base, songRow.lp_bonus, new PieceInfo(0, reqRow.pieces_smile, reqRow.pieces_pure, reqRow.pieces_cool));
        } else {
            throw new UnimplementedError("Unknown ReqType " + songRow.req_type);
        }
    } else if (row.type == CardType.MEMORY) {
        return new CardMemory(row.cardno, row.id, row.name, row.skill, row.copyright);
    } else {
        throw new UnimplementedError("Unknown CardType " + row.type);
    }
}