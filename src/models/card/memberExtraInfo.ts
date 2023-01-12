import {Attribute, HasOne, Table} from "@sequelize/core/decorators-legacy";
import {DataTypes, Model} from "@sequelize/core";

import type {CardMember} from "$models/card/card.js";
import type CardMemberIdolizePieceExtraInfo from "$models/card/memberIdolizePieceExtraInfo.js";
import type CardMemberGroup from "$models/card/memberGroup.js";
import {pieceInfoGetter} from "$models/utils/pieceInfoGetterSetter.js";

import type {AttributeID} from "$lib/enums/attribute.js";
import type {CardMemberRarity} from "$lib/types/cardRarity.js";
import type PieceInfo from "$lib/types/pieceInfo.js";
import CardMemberIdolizeType from "$lib/types/cardMemberIdolizeType.js";

@Table({
    modelName: "CardMemberExtraInfo",
    timestamps: false,
    validate: {
        idolizableWithPiecesMustHaveIdolizePieceExtraInfo(this: CardMemberExtraInfo) {
            if ((this.idolizeType === CardMemberIdolizeType.WITH_PIECES) !== (this.idolizeBonus != null)) {
                if (this.idolizeType === CardMemberIdolizeType.WITH_PIECES)
                    throw new Error("Card has Idolization type WITH_PIECES, but does not have an Idolize Pieces Extra Info object");
                else
                    throw new Error("Card has an Idolize Pieces Extra Info object, but is not of Idolization type WITH_PIECES");
            }
            return true;
        },
        validateBirthDate(this: CardMemberExtraInfo) {
            if ((this.birthDay == null) !== (this.birthMonth == null)) {
                throw new Error("For the birth date, either set both day and month or set neither");
            }
            if (this.birthDay != null && this.birthMonth != null && this.birthDay > [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.birthMonth - 1]) {
                throw new Error("For the birth date, the given day does not exist in the given month");
            }
            return true;
        }
    }
})
export default class CardMemberExtraInfo extends Model {
    @Attribute({
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    })
    declare cardNo: string;
    /* inverse of association in Card */
    declare card: CardMember;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    })
    declare rarity: CardMemberRarity;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    })
    declare cost: 0 | 1 | 2 | 3;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    })
    declare birthDay: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | null;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    })
    declare birthMonth: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | null;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    })
    declare year: 1 | 2 | 3 | null;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {min: 0}
    })
    declare piecesAll: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {min: 0}
    })
    declare piecesSmile: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {min: 0}
    })
    declare piecesPure: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {min: 0}
    })
    declare piecesCool: number;

    get pieces(): PieceInfo {
        return pieceInfoGetter(this, "piecesAll", "piecesSmile", "piecesPure", "piecesCool");
    }

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    })
    declare pieceBdayAttribute: AttributeID | null;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: true
    })
    declare costumeJpn: string | null;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: true
    })
    declare costumeEng: string | null;

    @Attribute({
        type: DataTypes.BOOLEAN,
        allowNull: false
    })
    declare abilityRush: boolean;

    @Attribute({
        type: DataTypes.BOOLEAN,
        allowNull: false
    })
    declare abilityLive: boolean;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    })
    declare idolizeType: CardMemberIdolizeType;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    })
    declare groupId: number | null;
    /* inverse of association in CardMemberGroup */
    declare group: CardMemberGroup | null;

    @HasOne((s) => s.models.CardMemberIdolizePieceExtraInfo, {
        as: "idolizeBonus",
        foreignKey: "cardNo",
        inverse: {as: "cardMemberExtraInfo"}
    })
    declare idolizeBonus: CardMemberIdolizePieceExtraInfo | null;
}