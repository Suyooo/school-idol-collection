import {
    AllowNull,
    Column, DataType,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";

@Table({
    modelName: "TranslationSong",
    timestamps: false
})
export default class TranslationSong extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.STRING)
    jpn!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    eng!: string;
}