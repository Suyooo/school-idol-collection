import {Attribute, HasOne, Table} from "@sequelize/core/decorators-legacy";
import {DataTypes, Model} from "@sequelize/core";

import type {CardSong} from "$models/card/card.js";
import type CardSongAnyReqExtraInfo from "$models/card/songAnyReqExtraInfo.js";
import type CardSongAttrReqExtraInfo from "$models/card/songAttrReqExtraInfo.js";

import CardSongRequirementType from "$types/cardSongRequirementType.js";
import type {CardSongRarity} from "$types/cardRarity.js";
import type {AttributeID} from "$types/attribute.js";

@Table({
    modelName: "CardSongExtraInfo",
    timestamps: false,
    validate: {
        anyReqTypeMustHaveSongAnyReqExtraInfo(this: CardSongExtraInfo) {
            if ((this.requirementType === CardSongRequirementType.ANY_PIECE) !== (this.anyRequirement != null)) {
                if (this.requirementType === CardSongRequirementType.ANY_PIECE)
                    throw new Error("Song has an Any Piece Requirement type, but does not have an Any Piece Extra Info object");
                else
                    throw new Error("Song has an Any Piece Extra Info object, but does not have an Any Piece Requirement type");
            }
            return true;
        },
        attrReqTypeMustHaveSongAttrReqExtraInfo(this: CardSongExtraInfo) {
            if ((this.requirementType === CardSongRequirementType.ATTR_PIECE) !== (this.attrRequirement != null)) {
                if (this.requirementType === CardSongRequirementType.ATTR_PIECE)
                    throw new Error("Song has an Attribute Piece Requirement type, but does not have an Attribute Piece Extra Info object");
                else
                    throw new Error("Song has an Attribute Piece Extra Info object, but does not have an Attribute Piece Requirement type");
            }
            return true;
        }
    }
})
export default class CardSongExtraInfo extends Model {
    @Attribute({
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    })
    declare cardNo: string;
    /* inverse of association in Card */
    declare card: CardSong;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    })
    declare rarity: CardSongRarity;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    })
    declare attribute: AttributeID;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    })
    declare lpBase: number;

    @Attribute({
        type: DataTypes.STRING(2),
        allowNull: true
    })
    declare lpBonus: number | "X" | "∞" | null;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    })
    declare requirementType: CardSongRequirementType;

    @HasOne((s) => s.models.CardSongAnyReqExtraInfo, {
        as: "anyRequirement",
        foreignKey: "cardNo",
        inverse: {as: "cardSongExtraInfo"}
    })
    declare anyRequirement: CardSongAnyReqExtraInfo | null;

    @HasOne((s) => s.models.CardSongAttrReqExtraInfo, {
        as: "attrRequirement",
        foreignKey: "cardNo",
        inverse: {as: "cardSongExtraInfo"}
    })
    declare attrRequirement: CardSongAttrReqExtraInfo | null;
}