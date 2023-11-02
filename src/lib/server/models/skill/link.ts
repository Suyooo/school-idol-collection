import { DataTypes, Model } from "@sequelize/core";
import { Attribute, Table } from "@sequelize/core/decorators-legacy";

@Table({
    modelName: "Link",
    timestamps: false,
})
export default class Link extends Model {
    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    })
    declare id: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    })
    declare from: number;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false,
    })
    declare to: string;
}
