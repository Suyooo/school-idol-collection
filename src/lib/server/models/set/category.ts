import type Set from "$models/set/set.js";
import { DataTypes, Model } from "@sequelize/core";
import { Attribute, HasMany, Table } from "@sequelize/core/decorators-legacy";

@Table({
    modelName: "SetCategory",
    timestamps: false,
})
export default class SetCategory extends Model {
    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    declare id: number;

    @Attribute({
        type: DataTypes.STRING(4096),
        allowNull: false,
    })
    declare jpn: string;

    @Attribute({
        type: DataTypes.STRING(4096),
        allowNull: false,
    })
    declare eng: string;

    @HasMany((s) => s.models.Set, {
        foreignKey: "categoryId",
        inverse: { as: "category" },
    })
    declare sets: Set[];
}
