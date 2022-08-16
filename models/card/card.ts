import {AllowNull, Column, DataType, HasMany, HasOne, Model, PrimaryKey, Table} from "sequelize-typescript";

import CardMemberExtraInfo from "./cardMemberExtraInfo";
import CardMemberIdolizePieceExtraInfo from "./cardMemberIdolizePieceExtraInfo";
import CardSongExtraInfo from "./cardSongExtraInfo";
import CardSongAnyReqExtraInfo from "./cardSongAnyReqExtraInfo";
import CardSongAttrReqExtraInfo from "./cardSongAttrReqExtraInfo";
import CardFAQLink from "./faqLink";
import TranslationName from "../translations/name";
import TranslationSkill from "../translations/skill";

import CardType from "../../types/cardType";
import CardSongRequirementType from "../../types/cardSongRequirementType";
import CardMemberIdolizeType from "../../types/cardMemberIdolizeType";

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
export default class Card extends Model {
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