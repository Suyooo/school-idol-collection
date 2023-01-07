import {
    AllowNull, BelongsTo,
    Column, DataType,
    ForeignKey,
    Min,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import type Card from "$models/card/card";
import {CardBase} from "$models/card/card";

@Table({
    modelName: "CardFAQLink",
    timestamps: false
})
export default class CardFAQLink extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => CardBase)
    @Column(DataType.INTEGER)
    declare cardId: number;

    // constraints = false because standard SQL doesn't support foreign keys being non-unique
    @BelongsTo(() => CardBase, {foreignKey: "cardId", targetKey: "cardId", constraints: false})
    declare card: Card;

    @PrimaryKey
    @Min(1)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare displayOrder: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    declare label: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare link: string;
}