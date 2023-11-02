import type { AttributeID } from "$l/enums/attribute.js";
import CardMemberIdolizeType from "$l/enums/cardMemberIdolizeType.js";
import type { CardMemberRarity } from "$l/enums/cardRarity.js";
import type { RangeCost, RangeDay, RangeMonth, RangeYear } from "$l/types/ranges.js";
import type { CardMember } from "$m/card/card.js";
import type CardMemberGroup from "$m/card/memberGroup.js";
import type CardMemberIdolizePieceExtraInfo from "$m/card/memberIdolizePieceExtraInfo.js";
import { DataTypes, Model } from "@sequelize/core";
import { Attribute, HasOne, Table } from "@sequelize/core/decorators-legacy";

@Table({
    modelName: "CardMemberExtraInfo",
    timestamps: false,
    validate: {
        idolizableWithPiecesMustHaveIdolizePieceExtraInfo(this: CardMemberExtraInfo) {
            if ((this.idolizeType === CardMemberIdolizeType.WITH_PIECES) !== (this.idolizeBonus != null)) {
                if (this.idolizeType === CardMemberIdolizeType.WITH_PIECES)
                    throw new Error(
                        "Card has Idolization type WITH_PIECES, but does not have an Idolize Pieces Extra Info object"
                    );
                else
                    throw new Error(
                        "Card has an Idolize Pieces Extra Info object, but is not of Idolization type WITH_PIECES"
                    );
            }
            return true;
        },
        validateBirthDate(this: CardMemberExtraInfo) {
            if ((this.birthDay == null) !== (this.birthMonth == null)) {
                throw new Error("For the birth date, either set both day and month or set neither");
            }
            if (
                this.birthDay != null &&
                this.birthMonth != null &&
                this.birthDay > [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.birthMonth - 1]
            ) {
                throw new Error("For the birth date, the given day does not exist in the given month");
            }
            return true;
        },
    },
})
export default class CardMemberExtraInfo extends Model {
    @Attribute({
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    })
    declare cardNo: string;
    /* inverse of association in Card */
    declare card: CardMember;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    })
    declare rarity: CardMemberRarity;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: true,
    })
    declare baseIfSecret: string | null;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    })
    declare cost: RangeCost;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    })
    declare birthDay: RangeDay | null;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    })
    declare birthMonth: RangeMonth | null;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    })
    declare year: RangeYear | null;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: { min: 0 },
    })
    declare piecesAll: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: { min: 0 },
    })
    declare piecesSmile: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: { min: 0 },
    })
    declare piecesPure: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: { min: 0 },
    })
    declare piecesCool: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    })
    declare pieceBdayAttribute: AttributeID | null;

    @Attribute({
        type: DataTypes.STRING(4096),
        allowNull: true,
    })
    declare costumeJpn: string | null;

    @Attribute({
        type: DataTypes.STRING(4096),
        allowNull: true,
    })
    declare costumeEng: string | null;

    @Attribute({
        type: DataTypes.BOOLEAN,
        allowNull: false,
    })
    declare abilityRush: boolean;

    @Attribute({
        type: DataTypes.BOOLEAN,
        allowNull: false,
    })
    declare abilityLive: boolean;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    })
    declare idolizeType: CardMemberIdolizeType;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    })
    declare groupId: number | null;
    /* inverse of association in CardMemberGroup */
    declare group: CardMemberGroup | null;

    @HasOne((s) => s.models.CardMemberIdolizePieceExtraInfo, {
        foreignKey: "cardNo",
        inverse: { as: "cardMemberExtraInfo" },
    })
    declare idolizeBonus: CardMemberIdolizePieceExtraInfo | null;
}
