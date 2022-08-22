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

@Table({timestamps: false})
export default class CardLink extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @ForeignKey(() => Card)
    @Column
    fromCardNo!: string;

    @AllowNull(false)
    @Column
    skillLine!: number;

    @AllowNull(false)
    @ForeignKey(() => Card)
    @Column
    toCardNo!: string;
}