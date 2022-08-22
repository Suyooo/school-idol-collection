import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column, DataType,
    ForeignKey,
    Min,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Card from "../card/card";
import CardMemberGroup from "../card/memberGroup";
import TranslationPattern from "../translation/pattern";

@Table({timestamps: false})
export default class Skill extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => Card)
    @Column(DataType.STRING)
    cardNo: string | null;
    @BelongsTo(() => Card)
    card: Card;

    @ForeignKey(() => CardMemberGroup)
    @Column(DataType.NUMBER)
    groupId: number | null;
    @BelongsTo(() => CardMemberGroup)
    group: CardMemberGroup;

    @AllowNull(false)
    @Min(0)
    @Column
    line!: number;

    @ForeignKey(() => TranslationPattern)
    @Column(DataType.NUMBER)
    patternId: number | null;

    @BelongsTo(() => TranslationPattern)
    pattern: TranslationPattern;

    @AllowNull(false)
    @Column
    jpn!: string;

    @Column(DataType.STRING)
    eng: string | null;
}