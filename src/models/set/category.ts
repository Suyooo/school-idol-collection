import {Attribute, HasMany, Table} from "@sequelize/core/decorators-legacy";
import {DataTypes, Model} from "@sequelize/core";
import type Set from "$models/set/set.js";

@Table({
    modelName: "SetCategory",
    timestamps: false
})
export default class SetCategory extends Model {
    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    })
    declare id: number;

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

    @HasMany((s) => s.models.Set, {
        as: "sets", foreignKey: "categoryId", inverse: {as: "category"}
    })
    declare sets: Set[];
}