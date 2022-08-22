import {
    AllowNull, AutoIncrement,
    Column,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Card from "./card";
import CardMemberGroup from "./memberGroup";

@Table({timestamps: false})
export default class CardMemberGroupLink extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @ForeignKey(() => CardMemberGroup)
    @Column
    fromGroupId!: number;

    @AllowNull(false)
    @Column
    skillLine!: number;

    @AllowNull(false)
    @ForeignKey(() => Card)
    @Column
    toCardNo!: string;
}