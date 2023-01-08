import {
    AllowNull,
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Scopes,
    Table
} from "sequelize-typescript";
import {literal, Op} from "sequelize";
import type {OrderItem} from "sequelize";
import DB from "$models/db";

import CardMemberExtraInfo from "$models/card/memberExtraInfo";
import type CardMemberIdolizePieceExtraInfo from "$models/card/memberIdolizePieceExtraInfo";
import CardSongExtraInfo from "$models/card/songExtraInfo";
import type CardSongAnyReqExtraInfo from "$models/card/songAnyReqExtraInfo";
import type CardSongAttrReqExtraInfo from "$models/card/songAttrReqExtraInfo";
import CardFAQLink from "$models/card/faqLink";

import CardType from "$types/cardType";
import type CardMemberIdolizeType from "$types/cardMemberIdolizeType";
import type {AttributeID} from "$types/attribute";
import type CardMemberGroup from "$models/card/memberGroup";
import type Skill from "$models/skill/skill";
import {SkillBase} from "$models/skill/skill";
import Link from "$models/skill/link";
import Annotation from "$models/skill/annotation";
import AnnotationType from "$types/annotationType";

export const cardOrder = (col: string) => <OrderItem[]><unknown>[[literal(col + " LIKE 'LL%' DESC, " + col)]];

@Scopes(() => ({
    members: () => ({
        where: {type: CardType.MEMBER}
    }),
    songs: () => ({
        where: {type: CardType.SONG}
    }),
    memories: () => ({
        where: {type: CardType.MEMORY}
    }),
    hasSkill: () => ({
        include: [{model: DB.Skill, required: true}]
    }),

    id: (id) => ({
        where: {
            id: id
        }
    }),
    set: (set) => ({
        where: {
            cardNo: {
                [Op.like]: set + "-%"
            }
        }
    }),

    before: (cardNo) => ({
        where: {
            cardNo: {
                [Op.lt]: cardNo
            }
        },
        order: [["cardNo", "DESC"]]
    }),
    after: (cardNo) => ({
        where: {
            cardNo: {
                [Op.gt]: cardNo
            }
        },
        order: [["cardNo", "ASC"]]
    }),

    full: () => ({
        include: [
            {
                model: DB.Skill,
                include: [{
                    model: DB.Annotation,
                    include: [DB.Card]
                }]
            },
            {
                model: DB.CardMemberExtraInfo,
                include: [
                    {
                        model: DB.CardMemberGroup,
                        include: [
                            {
                                model: DB.Skill,
                                include: [{
                                    model: DB.Annotation,
                                    include: [DB.Card]
                                }]
                            },
                            {
                                model: DB.CardMemberExtraInfo,
                                include: [
                                    {
                                        model: DB.Card,
                                        include: [DB.CardMemberExtraInfo]
                                    }
                                ]
                            }
                        ]
                    },
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
            DB.CardFAQLink,
            {
                model: DB.Annotation,
                where: {
                    type: {
                        [Op.in]: [AnnotationType.get("song").id, AnnotationType.get("costume").id, AnnotationType.get("mem").id]
                    }
                },
                required: false,
                include: [{
                    model: DB.Skill,
                    include: [
                        DB.Card,
                        {
                            model: DB.CardMemberGroup,
                            include: [{
                                model: DB.CardMemberExtraInfo,
                                include: [DB.Card]
                            }]
                        }
                    ]
                }]
            }
        ],
        order: [literal("`linkedBy->skill`.`groupId`"), ...cardOrder("`linkedBy->skill`.`cardNo`")]
    }),
    cardNoOnly: () => ({
        attributes: ["cardNo"]
    }),
    forLink: () => ({
        attributes: ["cardNo", "id", "nameJpn", "nameEng"]
    }),
    forGrid: () => ({
        attributes: ["cardNo", "id", "type", "nameJpn", "nameEng"],
        order: cardOrder("`Card`.`cardNo`")
    })
}))
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
        },
        songTypeMustHaveSongExtraInfo(this: Card) {
            if ((this.type === CardType.SONG) !== (this.song != null)) {
                if (this.type === CardType.SONG)
                    throw new Error("Card is a Song card, but does not have a Song Extra Info object");
                else
                    throw new Error("Card has a Song Extra Info object, but is not of Song type");
            }
        }
    }
})
export class CardBase extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.STRING)
    declare cardNo: string;

    @AllowNull(false)
    @Column({field: "id", type: DataType.INTEGER})
    declare cardId: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare type: CardType;

    @HasOne(() => CardMemberExtraInfo)
    declare member: CardMemberExtraInfo | null;

    @HasOne(() => CardSongExtraInfo)
    declare song: CardSongExtraInfo | null;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare nameJpn: string;

    @Column(DataType.STRING)
    declare nameEng: string | null;

    @HasMany(() => SkillBase, {foreignKey: "cardNo"})
    declare skills: Skill[];

    @AllowNull(false)
    @Column(DataType.TEXT)
    declare copyright: string;

    // constraints = false because standard SQL doesn't support foreign keys being non-unique
    @HasMany(() => CardFAQLink, {foreignKey: "cardId", sourceKey: "cardId", constraints: false})
    declare faqs: CardFAQLink[];

    @BelongsToMany(() => Annotation, {through: {model: () => Link, unique: false}})
    declare linkedBy: (Annotation & { Link: Link })[];
}

export class CardMember extends CardBase {
    declare type: CardType.MEMBER;
    declare member: CardMemberExtraInfo;
    declare song: null;
}

export class CardMemberWithBirthdayPieces extends CardMember {
    declare member:
        Omit<CardMemberExtraInfo, "pieceBdayAttribute">
        & { pieceBdayAttribute: AttributeID };
}

export class CardMemberIdolizable extends CardMember {
    declare member:
        Omit<CardMemberExtraInfo, "idolizeType">
        & { idolizeType: CardMemberIdolizeType.NO_PIECES | CardMemberIdolizeType.WITH_PIECES };
}

export class CardMemberWithIdolizePieces extends CardMember {
    declare member:
        Omit<CardMemberExtraInfo, "idolizeType" | "idolizeBonus">
        & { idolizeType: CardMemberIdolizeType.WITH_PIECES, idolizeBonus: CardMemberIdolizePieceExtraInfo };
}

export class CardMemberWithGroup extends CardMember {
    declare member:
        Omit<CardMemberExtraInfo, "group">
        & { group: CardMemberGroup };
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