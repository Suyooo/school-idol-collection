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
import {literal, Op, OrderItem} from "sequelize";
import DB from "../db";

import CardMemberExtraInfo from "./memberExtraInfo";
import CardMemberIdolizePieceExtraInfo from "./memberIdolizePieceExtraInfo";
import CardSongExtraInfo from "./songExtraInfo";
import CardSongAnyReqExtraInfo from "./songAnyReqExtraInfo";
import CardSongAttrReqExtraInfo from "./songAttrReqExtraInfo";
import CardFAQLink from "./faqLink";

import CardType from "../../types/cardType";
import CardSongRequirementType from "../../types/cardSongRequirementType";
import CardMemberIdolizeType from "../../types/cardMemberIdolizeType";
import Attribute, {AttributeID} from "../../types/attribute";
import CardMemberGroup from "./memberGroup";
import Skill from "../skill/skill";
import Link from "../skill/link";
import Annotation from "../skill/annotation";
import AnnotationType from "../../types/annotationType";

export const CardOrder = (col: string) =>
    <OrderItem[]><unknown>[[literal(col + " LIKE 'LL%' DESC, " + col)]];

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
        order: [literal("`linkedBy->skill`.`groupId`"), ...CardOrder("`linkedBy->skill`.`cardNo`")]
    }),
    cardNoOnly: () => ({
        attributes: ["cardNo"]
    }),
    forLink: () => ({
        attributes: ["cardNo", "id", "nameJpn", "nameEng"]
    }),
    forGrid: () => ({
        attributes: ["cardNo", "id", "type", "nameJpn", "nameEng"],
        order: CardOrder("`Card`.`cardNo`")
    })
}))
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
    id: number;

    @AllowNull(false)
    @Column(DataType.NUMBER)
    type!: CardType;

    isMember(): this is CardMember {
        return this.type == CardType.MEMBER;
    }

    isMemberIdolizable(): this is CardMemberIdolizable {
        return this.isMember() && this.member.idolizeType !== CardMemberIdolizeType.NONE;
    }

    hasIdolizationPieces(): this is CardMemberHasIdolizePieces {
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

    @AllowNull(false)
    @Column
    nameJpn!: string;

    @Column(DataType.STRING)
    nameEng: string | null;

    @HasMany(() => Skill, {foreignKey: "cardNo"})
    skills!: Skill[];

    @AllowNull(false)
    @Column(DataType.TEXT)
    copyright!: string;

    // constraints = false because standard SQL doesn't support foreign keys being non-unique
    @HasMany(() => CardFAQLink, {foreignKey: "cardId", sourceKey: "id", constraints: false})
    faqs!: CardFAQLink[];

    @BelongsToMany(() => Annotation, {through: {model: () => Link, unique: false}})
    linkedBy: Array<Annotation & { Link: Link }> | undefined;
}

export class CardMember extends Card {
    type!: CardType.MEMBER;
    member!: CardMemberExtraInfo;
    song!: null;
}

export class CardMemberHasBirthdayPieces extends CardMember {
    member!:
        Omit<CardMemberExtraInfo, "pieceBdayAttribute">
        & { pieceBdayAttribute: AttributeID };
}

export class CardMemberIdolizable extends CardMember {
    member!:
        Omit<CardMemberExtraInfo, "idolizeType">
        & { idolizeType: CardMemberIdolizeType.NO_PIECES | CardMemberIdolizeType.WITH_PIECES };
}

export class CardMemberHasIdolizePieces extends CardMember {
    member!:
        Omit<CardMemberExtraInfo, "idolizeType" | "idolizeBonus">
        & { idolizeType: CardMemberIdolizeType.WITH_PIECES, idolizeBonus: CardMemberIdolizePieceExtraInfo };
}

export class CardMemberHasGroup extends CardMember {
    member!:
        Omit<CardMemberExtraInfo, "group">
        & { group: CardMemberGroup };
}

export class CardSong extends Card {
    type!: CardType.SONG;
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
    type!: CardType.MEMORY;
    member!: null;
    song!: null;
}