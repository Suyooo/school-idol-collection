import {Attribute,  Table} from "@sequelize/core/decorators-legacy";
import {DataTypes, Model} from "@sequelize/core";
import type SetCategory from "$models/set/category.js";

@Table({
    modelName: "Set",
    timestamps: false
})
export default class Set extends Model {
    @Attribute({
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    })
    declare id: string;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    })
    declare categoryId: number;
    /* inverse of association in SetCategory */
    declare category: SetCategory | null;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    })
    declare order: number;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare jpn: string;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare eng: string;
}