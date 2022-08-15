import {
    AllowNull,
    BelongsTo,
    Column, DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {Card} from "../card/card";
import {Pattern} from "../translate/pattern";

@Table({timestamps: false})
export default class TranslationSkill extends Model {
    @PrimaryKey
    @ForeignKey(() => Card)
    @Column
    cardId: string;

    @BelongsTo(() => Card)
    card: Card;

    @AllowNull(false)
    @Column
    line: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    skill: string;

    @ForeignKey(() => Pattern)
    @AllowNull(false)
    @Column
    patternId: number;

    @BelongsTo(() => Pattern)
    pattern: Pattern;
}