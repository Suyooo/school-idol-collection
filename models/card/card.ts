import {
    AllowNull,
    Column,
    DataType, DefaultScope,
    HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Scopes,
    Table
} from "sequelize-typescript";
import {Op} from "sequelize";
import DB from "../db";

import CardMemberExtraInfo from "./memberExtraInfo";
import CardMemberIdolizePieceExtraInfo from "./memberIdolizePieceExtraInfo";
import CardSongExtraInfo from "./songExtraInfo";
import CardSongAnyReqExtraInfo from "./songAnyReqExtraInfo";
import CardSongAttrReqExtraInfo from "./songAttrReqExtraInfo";
import CardFAQLink from "./faqLink";
import TranslationName from "../translations/name";
import TranslationSkill from "../translations/skill";

import CardType from "../../types/cardType";
import CardSongRequirementType from "../../types/cardSongRequirementType";
import CardMemberIdolizeType from "../../types/cardMemberIdolizeType";
import Attribute from "../../types/attribute";
import CardMemberGroup from "./memberGroup";

@DefaultScope(() => ({
    order: [["cardNo", "ASC"]]
}))
@Scopes(() => ({
    members: {
        where: {type: CardType.MEMBER}
    },
    songs: {
        where: {type: CardType.SONG}
    },
    memories: {
        where: {type: CardType.MEMORY}
    },
    hasSkill: {
        where: {
            skill: {
                [Op.not]: null
            }
        }
    },

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
        }
    }),

    full: () => ({
        include: [
            {
                model: DB.CardMemberExtraInfo,
                include: [
                    {
                        model: DB.CardMemberGroup,
                        include: [
                            DB.TranslationGroupSkill,
                            {
                                model: DB.CardMemberExtraInfo,
                                include: [
                                    {
                                        model: DB.Card,
                                        include: [DB.CardMemberExtraInfo, DB.TranslationName]
                                    }
                                ]
                            }
                        ]
                    },
                    DB.CardMemberIdolizePieceExtraInfo,
                    DB.TranslationCostume
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
            DB.TranslationName,
            DB.TranslationSkill
        ]
    }),
    cardNoOnly: {
        attributes: ["cardNo"]
    },
    forLink: () => ({
        attributes: ["cardNo", "id", "name"],
        include: [{model: DB.TranslationName, attributes: ["name"]}]
    }),
    forGrid: () => ({
        attributes: ["cardNo", "id", "type", "name"],
        include: [{model: DB.TranslationName, attributes: ["name"]}]
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
    id!: number;

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
    name!: string;

    @HasOne(() => TranslationName)
    _nameEng!: TranslationName | null;

    get nameEng(): string | null {
        if (this._nameEng === null) return null;
        return this._nameEng.name;
    }

    @Column(DataType.TEXT)
    skill!: string | null;

    get skillLines(): string[] {
        if (this.skill === null) return [];
        return this.skill.split("\n");
    }

    @HasMany(() => TranslationSkill)
    _skillLinesEng!: TranslationSkill[];

    get skillLinesEng(): string[] {
        return this._skillLinesEng.map(sk => sk.skill);
    }

    @AllowNull(false)
    @Column(DataType.TEXT)
    copyright!: string;

    // constraints = false because standard SQL doesn't support foreign keys being non-unique
    @HasMany(() => CardFAQLink, {foreignKey: "cardId", sourceKey: "id", constraints: false})
    faqs!: CardFAQLink[];
}

export class CardMember extends Card {
    type!: CardType.MEMBER;
    member!: CardMemberExtraInfo;
    song!: null;
}

export class CardMemberHasBirthdayPieces extends CardMember {
    member!:
        Omit<CardMemberExtraInfo, "pieceBdayAttribute">
        & { pieceBdayAttribute: Attribute };
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