import {
    AllowNull,
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Card from "../card/card";

@Table({timestamps: false})
export default class TranslationName extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => Card)
    @Column
    cardNo: string;

    @BelongsTo(() => Card)
    card: Card;

    @AllowNull(false)
    @Column
    name: string;
}