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

import Attribute from "../../consts/attributes";

import {pieceInfoGetter, pieceInfoSetter} from "../utils/pieceInfoGetterSetter";

import CardType from "../../enums/cardType";
import {RarityMember, RaritySong} from "../../enums/rarity";
import SongRequirementType from "../../enums/songRequirementType";
import MemberIdolizeType from "../../enums/memberIdolizeType";
import TranslationCostume from "../translations/costume";
import PieceInfo from "../../cards/pieceInfo";

@Table({
    timestamps: false,
    validate: {
        memberTypeMustHaveMemberExtraInfo() {
            if ((this.type === CardType.MEMBER) !== (this.memberExtraInfo != null)) {
                if (this.type === CardType.MEMBER)
                    throw new Error("Card is a Member card, but does not have a Member Extra Info object");
                else
                    throw new Error("Card has a Member Extra Info object, but is not of Member type");
            }
        },
        songTypeMustHaveSongExtraInfo() {
            if ((this.type === CardType.SONG) !== (this.songExtraInfo != null)) {
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
        return this.isMember() && this.memberExtraInfo.idolizeType !== MemberIdolizeType.NONE;
    }

    hasIdolizationPieces(): this is CardMemberIdolizableWithPieces {
        return this.isMemberIdolizable() && this.memberExtraInfo.idolizeType === MemberIdolizeType.WITH_PIECES;
    }

    isSong(): this is CardSong {
        return this.type == CardType.SONG;
    }

    hasAnyPieceRequirement(): this is CardSongAnyReq {
        return this.isSong() && this.songExtraInfo.requirementType == SongRequirementType.ANY_PIECE;
    }

    hasAttrPieceRequirement(): this is CardSongAttrReq {
        return this.isSong() && this.songExtraInfo.requirementType == SongRequirementType.ATTR_PIECE;
    }

    isMemory(): this is CardMemory {
        return this.type == CardType.MEMORY;
    }

    @HasOne(() => CardMemberExtraInfo)
    memberExtraInfo!: CardMemberExtraInfo | null;

    @HasOne(() => CardSongExtraInfo)
    songExtraInfo!: CardSongExtraInfo | null;
}

export type CardMember =
    Omit<Card, "memberExtraInfo" | "songExtraInfo">
    & { memberExtraInfo: CardMemberExtraInfo, songExtraInfo: null };
export type CardMemberIdolizable =
    Omit<CardMember, "memberExtraInfo">
    & {
    memberExtraInfo:
        Omit<CardMemberExtraInfo, "idolizeType">
        & { idolizeType: MemberIdolizeType.NO_PIECES | MemberIdolizeType.WITH_PIECES }
};
export type CardMemberIdolizableWithPieces =
    Omit<CardMember, "memberExtraInfo">
    & {
    memberExtraInfo:
        Omit<CardMemberExtraInfo, "idolizeType" | "memberIdolizePieceExtraInfo">
        & { idolizeType: MemberIdolizeType.WITH_PIECES, memberIdolizePieceExtraInfo: CardMemberIdolizePieceExtraInfo }
};

export type CardSong =
    Omit<Card, "memberExtraInfo" | "songExtraInfo">
    & { memberExtraInfo: null, songExtraInfo: CardSongExtraInfo };
export type CardSongAnyReq =
    Omit<CardSong, "songExtraInfo">
    & {
    songExtraInfo:
        Omit<CardSongExtraInfo, "songAnyReqExtraInfo" | "songAttrReqExtraInfo">
        & { songAnyReqExtraInfo: CardSongAnyReqExtraInfo, songAttrReqExtraInfo: null }
};
export type CardSongAttrReq =
    Omit<CardSong, "songExtraInfo">
    & {
    songExtraInfo:
        Omit<CardSongExtraInfo, "songAnyReqExtraInfo" | "songAttrReqExtraInfo">
        & { songAnyReqExtraInfo: null, songAttrReqExtraInfo: CardSongAttrReqExtraInfo }
};

export type CardMemory =
    Omit<Card, "memberExtraInfo" | "songExtraInfo">
    & { memberExtraInfo: null, songExtraInfo: null };

@Table({
    timestamps: false,
    validate: {
        idolizableWithPiecesMustHaveIdolizePieceExtraInfo() {
            if ((this.idolizeType === MemberIdolizeType.WITH_PIECES) !== (this.memberIdolizePieceExtraInfo != null)) {
                if (this.idolizeType === MemberIdolizeType.WITH_PIECES)
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
    @ForeignKey(() => Card)
    @Column
    cardId: string;

    @BelongsTo(() => Card)
    card: Card; // TODO: getter

    @AllowNull(false)
    @Column(DataType.NUMBER)
    rarity!: RarityMember;

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

    set pieces(pieces: PieceInfo) {
        pieceInfoSetter(pieces, "piecesAll", "piecesSmile", "piecesPure", "piecesCool");
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
    idolizeType!: MemberIdolizeType;

    @ForeignKey(() => CardMemberGroup)
    @Column(DataType.NUMBER)
    groupId!: number | null;

    @BelongsTo(() => CardMemberGroup, {targetKey: "id"})
    group!: CardMemberGroup | null;

    @HasOne(() => CardMemberIdolizePieceExtraInfo)
    memberIdolizePieceExtraInfo!: CardMemberIdolizePieceExtraInfo | null;

    @HasOne(() => TranslationCostume)
    costumeEn!: string | null; // TODO: getter (return costume instead of the TranslationCostume object)
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
    @ForeignKey(() => CardMemberExtraInfo)
    @Column
    cardId: string;

    @BelongsTo(() => CardMemberExtraInfo)
    get card(): CardMember {
        return this.getDataValue("card").card;
    }
    set card(newCard: CardMember) {
        this.setDataValue("card", newCard.memberExtraInfo);
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

    set pieces(pieces: PieceInfo) {
        pieceInfoSetter(pieces, "piecesAll", "piecesSmile", "piecesPure", "piecesCool");
    }
}

@Table({
    timestamps: false,
    validate: {
        anyReqTypeMustHaveSongAnyReqExtraInfo() {
            if ((this.requirementType === SongRequirementType.ANY_PIECE) !== (this.songAnyReqExtraInfo != null)) {
                if (this.requirementType === SongRequirementType.ANY_PIECE)
                    throw new Error("Song has an Any Piece Requirement type, but does not have an Any Piece Extra Info object");
                else
                    throw new Error("Song has an Any Piece Extra Info object, but does not have an Any Piece Requirement type");
            }
        },
        attrReqTypeMustHaveSongAttrReqExtraInfo() {
            if ((this.requirementType === SongRequirementType.ATTR_PIECE) !== (this.songAttrReqExtraInfo != null)) {
                if (this.requirementType === SongRequirementType.ATTR_PIECE)
                    throw new Error("Song has an Attribute Piece Requirement type, but does not have an Attribute Piece Extra Info object");
                else
                    throw new Error("Song has an Attribute Piece Extra Info object, but does not have an Attribute Piece Requirement type");
            }
        }
    }
})
export class CardSongExtraInfo extends Model {
    @PrimaryKey
    @ForeignKey(() => Card)
    @Column
    cardId: string;

    @BelongsTo(() => Card)
    card: Card; // TODO: getter

    @AllowNull(false)
    @Column(DataType.NUMBER)
    rarity!: RaritySong;

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
    requirementType!: SongRequirementType;

    @HasOne(() => CardSongAnyReqExtraInfo)
    songAnyReqExtraInfo!: Awaited<CardSongAnyReqExtraInfo>;

    @HasOne(() => CardSongAttrReqExtraInfo)
    songAttrReqExtraInfo!: Awaited<CardSongAttrReqExtraInfo>;
}

@Table({timestamps: false})
export class CardSongAnyReqExtraInfo extends Model {
    @PrimaryKey
    @ForeignKey(() => CardSongExtraInfo)
    @Column
    cardId: string;

    @BelongsTo(() => CardSongExtraInfo)
    get card(): CardSong {
        return this.getDataValue("card").card;
    }

    set card(newCard: CardSong) {
        this.setDataValue("card", newCard.songExtraInfo);
    }

    @AllowNull(false)
    @Min(0)
    @Column
    piecesAll!: number;

    get pieces(): PieceInfo {
        return pieceInfoGetter("piecesAll");
    }

    set pieces(pieces: PieceInfo) {
        pieceInfoSetter(pieces, "piecesAll");
    }
}

@Table({timestamps: false})
export class CardSongAttrReqExtraInfo extends Model {
    @PrimaryKey
    @ForeignKey(() => CardSongExtraInfo)
    @Column
    cardId: string;

    @BelongsTo(() => CardSongExtraInfo)
    get card(): CardSong {
        return this.getDataValue("card").card;
    }

    set card(newCard: CardSong) {
        this.setDataValue("card", newCard.songExtraInfo);
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

    set pieces(pieces: PieceInfo) {
        pieceInfoSetter(pieces, undefined, "piecesSmile", "piecesPure", "piecesCool");
    }
}