import {
    AllowNull,
    BelongsTo,
    Column, DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Card from "../card/card";
import TranslateTablePattern from "../translatetables/pattern";

@Table({timestamps: false})
export default class TranslationSkill extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => Card)
    @Column
    cardNo: string;

    @BelongsTo(() => Card)
    card: Card;

    @PrimaryKey
    @AllowNull(false)
    @Column
    line: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    skill: string;

    @ForeignKey(() => TranslateTablePattern)
    @AllowNull(false)
    @Column
    patternId: number;

    @BelongsTo(() => TranslateTablePattern)
    pattern: TranslateTablePattern;
}