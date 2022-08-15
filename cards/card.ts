import CardType from "./cardType";
import {RarityMember, RaritySong} from "./rarity";
import Attribute from "../consts/attributes";
import ReqType from "./reqType";
import PieceInfo from "./pieceInfo";
import IdolizeType from "./idolizeType";
import CardMemberGroup from "./cardMemberGroup";
import DB from "../utils/db";

const getNameTranslation = DB.prepare("SELECT name FROM cards_translation_name WHERE cards_m_cardno = ?");
const getCostumeTranslation = DB.prepare("SELECT costume FROM cards_translation_costume WHERE members_m_cardno = ?");
const getSkillTranslation = DB.prepare("SELECT skill FROM cards_translation_skill WHERE cards_m_cardno = ? ORDER BY line");
const getFaq = DB.prepare("SELECT link, label FROM cards_faq_links WHERE cards_m_id = ? ORDER BY display_order");

export abstract class Card {
    readonly cardno: string;
    readonly id: number;
    readonly type: CardType;
    readonly name: string;
    readonly skill: string | undefined;
    readonly copyright: string;

    private _faqs: { link: string, label: string }[] | null = null;
    private _nameEn: string | undefined | null = null;
    private _skillEn: string | undefined | null = null;

    protected constructor(cardno: string, id: number, type: CardType, name: string, skill: string | undefined, copyright: string) {
        this.cardno = cardno;
        this.id = id;
        this.type = type;
        this.name = name;
        this.skill = skill;
        this.copyright = copyright;
    }

    isMember(): this is CardMember {
        return this.type == CardType.MEMBER;
    }

    isSong(): this is CardSong {
        return this.type == CardType.SONG;
    }

    isMemory(): this is CardMemory {
        return this.type == CardType.MEMORY;
    }

    get nameEn(): string | undefined {
        if (this._nameEn === null) {
            const r: {name: string} | undefined = getNameTranslation.get(this.cardno);
            if (r != undefined) this._nameEn = r.name;
            else this._nameEn = undefined;
        }
        return this._nameEn;
    }

    get skillEn(): string | undefined {
        if (this._skillEn === null) {
            this._skillEn = getSkillTranslation.all(this.cardno).map(r => r.skill).join("\n");
            if (this._skillEn == "") this._skillEn = undefined;
        }
        return this._skillEn;
    }

    get faqs(): { link: string, label: string }[] {
        if (this._faqs === null) {
            this._faqs = getFaq.all(this.id);
        }
        return this._faqs;
    }
}

export class CardMember extends Card {
    readonly rarity: RarityMember;
    readonly cost: 0 | 1 | 2 | 3;
    readonly birthDay: number | undefined;
    readonly birthMonth: number | undefined;
    readonly year: 1 | 2 | 3 | undefined;
    readonly pieces: PieceInfo;
    readonly piecesBdayType: Attribute | undefined;
    readonly costume: string | undefined;
    readonly abilityRush: boolean;
    readonly abilityLive: boolean;
    readonly idolizeType: IdolizeType;
    readonly group: CardMemberGroup | undefined;

    private _costumeEn: string | undefined | null = null;

    constructor(cardno: string, id: number, name: string, skill: string | undefined, copyright: string, rarity: RarityMember, cost: 0 | 1 | 2 | 3,
                birthDay: number | undefined, birthMonth: number | undefined, year: 1 | 2 | 3 | undefined, pieces: PieceInfo, piecesBdayType: Attribute | undefined,
                costume: string | undefined, abilityRush: boolean, abilityLive: boolean, idolizeType: IdolizeType, group: CardMemberGroup | undefined) {
        super(cardno, id, CardType.MEMBER, name, skill, copyright);
        this.rarity = rarity;
        this.cost = cost;
        this.birthDay = birthDay;
        this.birthMonth = birthMonth;
        this.year = year;
        this.pieces = pieces;
        this.piecesBdayType = piecesBdayType;
        this.costume = costume;
        this.abilityRush = abilityRush;
        this.abilityLive = abilityLive;
        this.idolizeType = idolizeType != undefined ? idolizeType : IdolizeType.NONE;
        this.group = group;
    }

    isIdolizable(): this is CardMemberIdolizable {
        return this.idolizeType != IdolizeType.NONE;
    }

    get costumeEn(): string | undefined {
        if (this.group == undefined) {
            this._costumeEn = undefined;
        } else if (this._costumeEn === null) {
            const r: {costume: string} | undefined = getCostumeTranslation.get(this.cardno);
            if (r != undefined) this._costumeEn = r.costume;
            else this._costumeEn = undefined;
        }
        return this._costumeEn;
    }
}

export class CardMemberIdolizable extends CardMember {
    readonly piecesIdolized: PieceInfo | undefined;

    constructor(cardno: string, id: number, name: string, skill: string | undefined, copyright: string, rarity: RarityMember, cost: 0 | 1 | 2 | 3,
                birthDay: number | undefined, birthMonth: number | undefined, year: 1 | 2 | 3 | undefined, pieces: PieceInfo, piecesBdayType: Attribute | undefined,
                costume: string | undefined, abilityRush: boolean, abilityLive: boolean, piecesIdolized: PieceInfo | undefined, group: CardMemberGroup | undefined) {
        super(cardno, id, name, skill, copyright, rarity, cost, birthDay, birthMonth, year, pieces, piecesBdayType,
            costume, abilityRush, abilityLive, piecesIdolized != undefined ? IdolizeType.HAS_PIECES : IdolizeType.NO_PIECES, group);
        this.piecesIdolized = piecesIdolized;
    }
}

export abstract class CardSong extends Card {
    readonly rarity: RaritySong;
    readonly attribute: Attribute;
    readonly lpBase: number;
    readonly lpBonus: string | undefined;
    readonly reqType: ReqType;

    protected constructor(cardno: string, id: number, name: string, skill: string | undefined, copyright: string, rarity: RaritySong,
                          attribute: Attribute, lp_base: number, lpBonus: string | undefined, reqType: ReqType) {
        super(cardno, id, CardType.SONG, name, skill, copyright);
        this.rarity = rarity;
        this.attribute = attribute;
        this.lpBase = lp_base;
        this.lpBonus = lpBonus;
        this.reqType = reqType;
    }

    hasAnyReq(): this is CardSongAnyReq {
        return this.reqType == ReqType.ANY_PIECE;
    }

    hasAttrReq(): this is CardSongAttrReq {
        return this.reqType == ReqType.ATTR_PIECE;
    }
}

export class CardSongAnyReq extends CardSong {
    readonly pieces: number;

    constructor(cardno: string, id: number, name: string, skill: string | undefined, copyright: string, rarity: RaritySong,
                attribute: Attribute, lpBase: number, lpBonus: string | undefined, pieces: number) {
        super(cardno, id, name, skill, copyright, rarity, attribute, lpBase, lpBonus, ReqType.ANY_PIECE);
        this.pieces = pieces;
    }
}

export class CardSongAttrReq extends CardSong {
    readonly pieces: PieceInfo;

    constructor(cardno: string, id: number, name: string, skill: string | undefined, copyright: string, rarity: RaritySong,
                attribute: Attribute, lpBase: number, lpBonus: string | undefined, pieces: PieceInfo) {
        super(cardno, id, name, skill, copyright, rarity, attribute, lpBase, lpBonus, ReqType.ATTR_PIECE);
        this.pieces = pieces;
    }
}

export class CardMemory extends Card {
    constructor(cardno: string, id: number, name: string, skill: string | undefined, copyright: string) {
        super(cardno, id, CardType.MEMORY, name, skill, copyright);
    }
}