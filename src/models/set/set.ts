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
    setId!: string;

    @AllowNull(false)
    @ForeignKey(() => SetCategory)
    @Column(DataType.INTEGER)
    categoryId!: number;

    @BelongsTo(() => SetCategory)
    category!: SetCategory | null;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    order!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    jpn!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    eng!: string;
}