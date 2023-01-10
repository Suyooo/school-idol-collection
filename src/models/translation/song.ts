import {Attribute, Table} from "@sequelize/core/decorators-legacy";
import {DataTypes, Model} from "@sequelize/core";

@Table({
    modelName: "TranslationSong",
    timestamps: false
})
export default class TranslationSong extends Model {
    @Attribute({
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    })
    declare jpn: string;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare eng: string;
}