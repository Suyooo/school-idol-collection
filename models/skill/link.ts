import {
    AllowNull, AutoIncrement,
    Column,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Card from "../card/card";
import AnnotationRecord from "./annotationRecord";

@Table({timestamps: false})
export default class Link extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @ForeignKey(() => AnnotationRecord)
    @Column
    from!: number;

    @AllowNull(false)
    @ForeignKey(() => Card)
    @Column
    to!: string;
}