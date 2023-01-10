import {DataTypes, literal, Model} from "@sequelize/core";
import type {OrderItem} from "@sequelize/core";
import {Attribute, HasMany, HasOne, Table} from "@sequelize/core/decorators-legacy";

import type CardMemberExtraInfo from "$models/card/memberExtraInfo.js";
import type CardSongExtraInfo from "$models/card/songExtraInfo.js";
import type Skill from "$models/skill/skill.js";
import type CardFAQLink from "$models/card/faqLink.js";
import type Annotation from "$models/skill/annotation.js";
import type Link from "$models/skill/link.js";

import type {AttributeID} from "$types/attribute.js";
import CardType from "$types/cardType.js";
import type CardMemberIdolizeType from "$types/cardMemberIdolizeType.js";
import type CardMemberIdolizePieceExtraInfo from "$models/card/memberIdolizePieceExtraInfo.js";
import type CardMemberGroup from "$models/card/memberGroup.js";
import type CardSongAnyReqExtraInfo from "$models/card/songAnyReqExtraInfo.js";
import type CardSongAttrReqExtraInfo from "$models/card/songAttrReqExtraInfo.js";

export const cardOrder = (col: string) => <OrderItem[]><unknown>[[literal(col + " LIKE 'LL%' DESC, " + col)]];

@Table({
    modelName: "Card",
    timestamps: false,
    validate: {
        memberTypeMustHaveMemberExtraInfo(this: Card) {
            if ((this.type === CardType.MEMBER) !== (this.member != null)) {
                if (this.type === CardType.MEMBER)
                    throw new Error("Card is a Member card, but does not have a Member Extra Info object");
                else
                    throw new Error("Card has a Member Extra Info object, but is not of Member type");
            }
            return true;
        },
        songTypeMustHaveSongExtraInfo(this: Card) {
            if ((this.type === CardType.SONG) !== (this.song != null)) {
                if (this.type === CardType.SONG)
                    throw new Error("Card is a Song card, but does not have a Song Extra Info object");
                else
                    throw new Error("Card has a Song Extra Info object, but is not of Song type");
            }
            return true;
        }
    }
})
export class CardBase extends Model {
    @Attribute({
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    })
    declare cardNo: string;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    })
    declare id: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    })
    declare type: CardType;

    @HasOne((s) => s.models.CardMemberExtraInfo, {
        as: "member",
        foreignKey: "cardNo",
        inverse: {as: "card"}
    })
    declare member: CardMemberExtraInfo | null;

    @HasOne((s) => s.models.CardSongExtraInfo, {
        as: "song",
        foreignKey: "cardNo",
        inverse: {as: "card"}
    })
    declare song: CardSongExtraInfo | null;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare nameJpn: string;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: true
    })
    declare nameEng: string | null;

    @HasMany((s) => s.models.Skill, {
        as: "skills", foreignKey: "cardNo", inverse: {as: "card"}
    })
    declare skills: Skill[];

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare copyright: string;

    // foreignKeyConstraints = false because standard SQL doesn't support foreign keys being non-unique
    @HasMany((s) => s.models.CardFAQLink, {
        as: "faqs", foreignKey: "cardId", sourceKey: "id", foreignKeyConstraints: false,
        inverse: {as: "card"}
    })
    declare faqs: CardFAQLink[];

    /* inverse of association in Annotation */
    declare linkedBy: (Annotation & { Link: Link })[];
}

export class CardMember extends CardBase {
    declare type: CardType.MEMBER;
    declare member: CardMemberExtraInfo;
    declare song: null;
}

export class CardMemberWithBirthdayPieces extends CardMember {
    declare member: Omit<CardMemberExtraInfo, "pieceBdayAttribute"> & { pieceBdayAttribute: AttributeID };
}

export class CardMemberIdolizable extends CardMember {
    declare member: Omit<CardMemberExtraInfo, "idolizeType">
        & { idolizeType: CardMemberIdolizeType.NO_PIECES | CardMemberIdolizeType.WITH_PIECES };
}

export class CardMemberWithIdolizePieces extends CardMember {
    declare member: Omit<CardMemberExtraInfo, "idolizeType" | "idolizeBonus">
        & { idolizeType: CardMemberIdolizeType.WITH_PIECES, idolizeBonus: CardMemberIdolizePieceExtraInfo };
}

export class CardMemberWithGroup extends CardMember {
    declare member: Omit<CardMemberExtraInfo, "group"> & { group: CardMemberGroup };
}

export class CardSongBase extends CardBase {
    declare type: CardType.SONG;
    declare member: null;
    declare song: CardSongExtraInfo;
}

export class CardSongWithAnyReq extends CardSongBase {
    declare song:
        Omit<CardSongExtraInfo, "anyRequirement" | "attrRequirement">
        & { anyRequirement: CardSongAnyReqExtraInfo, attrRequirement: null }
}

export class CardSongWithAttrReq extends CardSongBase {
    declare song:
        Omit<CardSongExtraInfo, "anyRequirement" | "attrRequirement">
        & { anyRequirement: null, attrRequirement: CardSongAttrReqExtraInfo }
}

export type CardSong = CardSongWithAnyReq | CardSongWithAttrReq;

export class CardMemory extends CardBase {
    declare type: CardType.MEMORY;
    declare member: null;
    declare song: null;
}

type Card = CardMember | CardSong | CardMemory;
export default Card;