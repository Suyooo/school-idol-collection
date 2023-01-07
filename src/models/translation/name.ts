import {
    AllowNull,
    Column, DataType,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";

@Table({
    modelName: "TranslationName",
    timestamps: false
})
export default class TranslationName extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.STRING)
    declare jpn: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare eng: string;
}