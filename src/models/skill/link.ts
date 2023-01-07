import {
    AllowNull,
    AutoIncrement,
    Column, DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {CardBase} from "$models/card/card";
import Annotation from "$models/skill/annotation";

@Table({timestamps: false})
export default class Link extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column({field: "id", type: DataType.INTEGER})
    declare linkId: number;

    @AllowNull(false)
    @ForeignKey(() => Annotation)
    @Column(DataType.INTEGER)
    declare from: number;

    @AllowNull(false)
    @ForeignKey(() => CardBase)
    @Column(DataType.STRING)
    declare to: string;
}