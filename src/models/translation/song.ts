import type { GroupID } from "$l/enums/group.js";
import { DataTypes, Model } from "@sequelize/core";
import { Attribute, Table } from "@sequelize/core/decorators-legacy";

@Table({
    modelName: "TranslationSong",
    timestamps: false,
})
export default class TranslationSong extends Model {
    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    })
    declare id: number;

    @Attribute({
        type: DataTypes.STRING(4096),
        unique: true,
        allowNull: false,
    })
    declare jpn: string;

    @Attribute({
        type: DataTypes.STRING(4096),
        allowNull: false,
    })
    declare eng: string;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    })
    declare group: GroupID;
}
