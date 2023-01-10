import {DataTypes, Model} from "@sequelize/core";
import {Attribute, Table} from "@sequelize/core/decorators-legacy";
import type Card from "$models/card/card.js";

@Table({
    modelName: "CardFAQLink",
    timestamps: false
})
export default class CardFAQLink extends Model {
    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false
    })
    declare cardId: number;
    /* inverse of association in Card */
    declare card: Card;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        validate: {min: 1}
    })
    declare displayOrder: number;

    @Attribute({
        type: DataTypes.TEXT,
        allowNull: false
    })
    declare label: string;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare link: string;
}