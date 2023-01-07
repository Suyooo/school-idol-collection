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

@Table({timestamps: false})
export default class CardFAQLink extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => CardBase)
    @Column
    cardId!: number;

    // constraints = false because standard SQL doesn't support foreign keys being non-unique
    @BelongsTo(() => CardBase, {foreignKey: "cardId", targetKey: "id", constraints: false})
    card!: Card;

    @PrimaryKey
    @Min(1)
    @AllowNull(false)
    @Column
    displayOrder!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    label!: string;

    @AllowNull(false)
    @Column
    link!: string;
}