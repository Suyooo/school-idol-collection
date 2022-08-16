import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Min,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";

import CardFAQLink from "./faqLink";
import CardMemberGroup from "./memberGroup";
import TranslationName from "../translations/name";
import TranslationSkill from "../translations/skill";
import TranslationCostume from "../translations/costume";

import {pieceInfoGetter} from "../utils/pieceInfoGetterSetter";

import CardType from "../../types/cardType";
import {CardMemberRarity, CardSongRarity} from "../../types/cardRarity";
import CardSongRequirementType from "../../types/cardSongRequirementType";
import CardMemberIdolizeType from "../../types/cardMemberIdolizeType";
import Attribute from "../../types/attribute";
import PieceInfo from "../../types/pieceInfo";

@Table({
    timestamps: false,
    validate: {
        memberTypeMustHaveMemberExtraInfo() {
            if ((this.type === CardType.MEMBER) !== (this.member != null)) {
                if (this.type === CardType.MEMBER)
                    throw new Error("Card is a Member card, but does not have a Member Extra Info object");
                else
                    throw new Error("Card has a Member Extra Info object, but is not of Member type");
            }
        },
        songTypeMustHaveSongExtraInfo() {
            if ((this.type === CardType.SONG) !== (this.song != null)) {
                if (this.type === CardType.SONG)
                    throw new Error("Card is a Song card, but does not have a Song Extra Info object");
                else
                    throw new Error("Card has a Song Extra Info object, but is not of Song type");
            }
        }
    }
})
export class Card extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column
    cardNo!: string;

    @AllowNull(false)
    @Column
    id!: number;

    @AllowNull(false)
    @Column(DataType.NUMBER)
    type!: CardType;

    @AllowNull(false)
    @Column
    name!: string;

    @Column(DataType.TEXT)
    skill!: string | null;

    @AllowNull(false)
    @Column(DataType.TEXT)
    copyright!: string;

    @HasMany(() => CardFAQLink, {sourceKey: "id"})
    faqs!: CardFAQLink[];

    @HasOne(() => TranslationName)
    nameOEn!: TranslationName | null;

    get nameEn(): string | null {
        if (this.nameOEn === null) return null;
        return this.nameOEn.name;
    }

    @HasMany(() => TranslationSkill)
    skillsEn!: TranslationSkill[];

    get skillEn(): string {
        return this.skillsEn.map(sk => sk.skill).join("\n");
    }

    isMember(): this is CardMember {
        return this.type == CardType.MEMBER;
    }

    isMemberIdolizable(): this is CardMemberIdolizable {
        return this.isMember() && this.member.idolizeType !== CardMemberIdolizeType.NONE;
    }

    hasIdolizationPieces(): this is CardMemberIdolizableWithPieces {
        return this.isMemberIdolizable() && this.member.idolizeType === CardMemberIdolizeType.WITH_PIECES;
    }

    isSong(): this is CardSong {
        return this.type == CardType.SONG;
    }

    hasAnyPieceRequirement(): this is CardSongWithAnyReq {
        return this.isSong() && this.song.requirementType == CardSongRequirementType.ANY_PIECE;
    }

    hasAttrPieceRequirement(): this is CardSongWithAttrReq {
        return this.isSong() && this.song.requirementType == CardSongRequirementType.ATTR_PIECE;
    }

    isMemory(): this is CardMemory {
        return this.type == CardType.MEMORY;
    }

    @HasOne(() => CardMemberExtraInfo)
    member!: CardMemberExtraInfo | null;

    @HasOne(() => CardSongExtraInfo)
    song!: CardSongExtraInfo | null;
}

export class CardMember extends Card {
    member!: CardMemberExtraInfo;
    song!: null;
}

export class CardMemberIdolizable extends CardMember {
    member!:
        Omit<CardMemberExtraInfo, "idolizeType">
        & { idolizeType: CardMemberIdolizeType.NO_PIECES | CardMemberIdolizeType.WITH_PIECES };
}

export class CardMemberIdolizableWithPieces extends CardMember {
    member!:
        Omit<CardMemberExtraInfo, "idolizeType">
        & { idolizeType: CardMemberIdolizeType.WITH_PIECES, memberIdolizePieceExtraInfo: CardMemberIdolizePieceExtraInfo };
}

export class CardSong extends Card {
    member!: null;
    song!: CardSongExtraInfo;
}

export class CardSongWithAnyReq extends CardSong {
    song!:
        Omit<CardSongExtraInfo, "anyRequirement" | "attrRequirement">
        & { anyRequirement: CardSongAnyReqExtraInfo, attrRequirement: null }
}

export class CardSongWithAttrReq extends CardSong {
    song!:
        Omit<CardSongExtraInfo, "anyRequirement" | "attrRequirement">
        & { anyRequirement: null, attrRequirement: CardSongAttrReqExtraInfo }
}

export class CardMemory extends Card {
    member!: null;
    song!: null;
}

@Table({
    timestamps: false,
    validate: {
        idolizableWithPiecesMustHaveIdolizePieceExtraInfo() {
            if ((this.idolizeType === CardMemberIdolizeType.WITH_PIECES) !== (this.idolizePieces != null)) {
                if (this.idolizeType === CardMemberIdolizeType.WITH_PIECES)
                    throw new Error("Card has Idolization type WITH_PIECES, but does not have an Idolize Pieces Extra Info object");
                else
                    throw new Error("Card has an Idolize Pieces Extra Info object, but is not of Idolization type WITH_PIECES");
            }
        },
        validateBirthDate() {
            if ((this.birthDay == null) !== (this.birthMonth == null)) {
                throw new Error("For the birth date, either set both day and month or set neither");
            }
            if (this.birthDay != null && this.birthDay > [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.birthMonth - 1]) {
                throw new Error("For the birth date, the given day does not exist in the given month");
            }
        }
    }
})
export class CardMemberExtraInfo extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => Card)
    @Column
    cardId: string;

    @BelongsTo(() => Card)
    card: Card; // TODO: getter

    @AllowNull(false)
    @Column(DataType.NUMBER)
    rarity!: CardMemberRarity;

    @AllowNull(false)
    @Column(DataType.NUMBER)
    cost!: 0 | 1 | 2 | 3;

    @Column(DataType.NUMBER)
    birthDay!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | null;

    @Column(DataType.NUMBER)
    birthMonth!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | null;

    @Column(DataType.NUMBER)
    year!: 1 | 2 | 3 | null;

    @AllowNull(false)
    @Min(0)
    @Column
    piecesAll!: number;

    @AllowNull(false)
    @Min(0)
    @Column
    piecesSmile!: number;

    @AllowNull(false)
    @Min(0)
    @Column
    piecesPure!: number;

    @AllowNull(false)
    @Min(0)
    @Column
    piecesCool!: number;

    get pieces(): PieceInfo {
        return pieceInfoGetter("piecesAll", "piecesSmile", "piecesPure", "piecesCool");
    }

    @Column(DataType.NUMBER)
    pieceBdayAttribute!: Attribute | null;

    @Column(DataType.STRING)
    costume!: string | null;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    abilityRush!: boolean;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    abilityLive!: boolean;

    @AllowNull(false)
    @Column(DataType.NUMBER)
    idolizeType!: CardMemberIdolizeType;

    @ForeignKey(() => CardMemberGroup)
    @Column(DataType.NUMBER)
    groupId!: number | null;

    @BelongsTo(() => CardMemberGroup, {targetKey: "id"})
    group!: CardMemberGroup | null;

    @HasOne(() => CardMemberIdolizePieceExtraInfo)
    idolizePieces!: CardMemberIdolizePieceExtraInfo | null;

    @HasOne(() => TranslationCostume)
    costumeOEn!: TranslationCostume | null; // TODO: getter (return costume instead of the TranslationCostume object)

    get costumeEn(): string | null {
        if (this.costumeOEn === null) return null;
        return this.costumeOEn.costume;
    }
}

@Table({
    timestamps: false,
    validate: {
        hasPieces() {
            if (this.piecesSmile + this.piecesPure + this.piecesCool + this.piecesAll <= 0) {
                throw new Error("Must define at least one Idolization Piece (otherwise, leave this out and set Idolize type to NO_PIECES)");
            }
        }
    }
})
export class CardMemberIdolizePieceExtraInfo extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => CardMemberExtraInfo)
    @Column
    cardMemberExtraInfoId: string;

    @BelongsTo(() => CardMemberExtraInfo)
    cardMemberExtraInfo: CardMemberExtraInfo;

    get card(): CardMember {
        return <CardMember>this.cardMemberExtraInfo.card;
    }

    @AllowNull(false)
    @Min(0)
    @Column
    piecesAll!: number;

    @Column
    @AllowNull(false)
    @Min(0)
    @Column
    piecesSmile!: number;

    @AllowNull(false)
    @Min(0)
    @Column
    piecesPure!: number;

    @AllowNull(false)
    @Min(0)
    @Column
    piecesCool!: number;

    get pieces(): PieceInfo {
        return pieceInfoGetter("piecesAll", "piecesSmile", "piecesPure", "piecesCool");
    }
}

@Table({
    timestamps: false,
    validate: {
        anyReqTypeMustHaveSongAnyReqExtraInfo() {
            if ((this.requirementType === CardSongRequirementType.ANY_PIECE) !== (this.anyRequirement != null)) {
                if (this.requirementType === CardSongRequirementType.ANY_PIECE)
                    throw new Error("Song has an Any Piece Requirement type, but does not have an Any Piece Extra Info object");
                else
                    throw new Error("Song has an Any Piece Extra Info object, but does not have an Any Piece Requirement type");
            }
        },
        attrReqTypeMustHaveSongAttrReqExtraInfo() {
            if ((this.requirementType === CardSongRequirementType.ATTR_PIECE) !== (this.attrRequirement != null)) {
                if (this.requirementType === CardSongRequirementType.ATTR_PIECE)
                    throw new Error("Song has an Attribute Piece Requirement type, but does not have an Attribute Piece Extra Info object");
                else
                    throw new Error("Song has an Attribute Piece Extra Info object, but does not have an Attribute Piece Requirement type");
            }
        }
    }
})
export class CardSongExtraInfo extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => Card)
    @Column
    cardId: string;

    @BelongsTo(() => Card)
    card: Card; // TODO: getter

    @AllowNull(false)
    @Column(DataType.NUMBER)
    rarity!: CardSongRarity;

    @AllowNull(false)
    @Column(DataType.NUMBER)
    attribute!: Attribute;

    @AllowNull(false)
    @Column
    lpBase!: number;

    @Column(DataType.STRING(2))
    lpBonus!: number | "X" | "∞" | null;

    @AllowNull(false)
    @Column(DataType.NUMBER)
    requirementType!: CardSongRequirementType;

    @HasOne(() => CardSongAnyReqExtraInfo)
    anyRequirement!: Awaited<CardSongAnyReqExtraInfo> | null;

    @HasOne(() => CardSongAttrReqExtraInfo)
    attrRequirement!: Awaited<CardSongAttrReqExtraInfo> | null;
}

@Table({timestamps: false})
export class CardSongAnyReqExtraInfo extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => CardSongExtraInfo)
    @Column
    cardSongExtraInfoId: string;

    @BelongsTo(() => CardSongExtraInfo)
    cardSongExtraInfo: CardSongExtraInfo;

    get card(): CardSong {
        return <CardSong>this.cardSongExtraInfo.card;
    }

    @AllowNull(false)
    @Min(0)
    @Column
    piecesAll!: number;

    get pieces(): PieceInfo {
        return pieceInfoGetter("piecesAll");
    }
}

@Table({timestamps: false})
export class CardSongAttrReqExtraInfo extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => CardSongExtraInfo)
    @Column
    cardSongExtraInfoId: string;

    @BelongsTo(() => CardSongExtraInfo)
    cardSongExtraInfo: CardSongExtraInfo;

    get card(): CardSong {
        return <CardSong>this.cardSongExtraInfo.card;
    }

    @AllowNull(false)
    @Min(0)
    @Column
    piecesSmile!: number;

    @AllowNull(false)
    @Min(0)
    @Column
    piecesPure!: number;

    @AllowNull(false)
    @Min(0)
    @Column
    piecesCool!: number;

    get pieces(): PieceInfo {
        return pieceInfoGetter(undefined, "piecesSmile", "piecesPure", "piecesCool");
    }
}