import {
    AllowNull,
    BelongsTo,
    Column, DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {Pattern} from "../translate/pattern";
import CardMemberGroup from "../card/memberGroup";

@Table({timestamps: false})
export default class TranslationGroupSkill extends Model {
    @PrimaryKey
    @ForeignKey(() => CardMemberGroup)
    @Column
    groupId: number;

    @BelongsTo(() => CardMemberGroup)
    group: CardMemberGroup;

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