import {
    AllowNull,
    AutoIncrement,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Card from "$models/card/card";
import Annotation from "$models/skill/annotation";

@Table({timestamps: false})
export default class Link extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column({field: "id"})
    linkId!: number;

    @AllowNull(false)
    @ForeignKey(() => Annotation)
    @Column
    from!: number;

    @AllowNull(false)
    @ForeignKey(() => Card)
    @Column
    to!: string;
}