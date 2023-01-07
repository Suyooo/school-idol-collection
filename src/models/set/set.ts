import {
    AllowNull, BelongsTo,
    Column, DataType, ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import SetCategory from "$models/set/category";

@Table({
    modelName: "Set",
    timestamps: false
})
export default class Set extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column({field: "id", type: DataType.STRING})
    declare setId: string;

    @AllowNull(false)
    @ForeignKey(() => SetCategory)
    @Column(DataType.INTEGER)
    declare categoryId: number;

    @BelongsTo(() => SetCategory)
    declare category: SetCategory | null;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare order: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare jpn: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare eng: string;
}