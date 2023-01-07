import {
    AllowNull,
    BelongsTo,
    Column, DataType,
    ForeignKey,
    Min,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";

import type {CardMember} from "$models/card/card";
import CardMemberExtraInfo from "$models/card/memberExtraInfo";

import {pieceInfoGetter} from "$models/utils/pieceInfoGetterSetter";

import type PieceInfo from "$types/pieceInfo";

@Table({
    modelName: "CardMemberIdolizePieceExtraInfo",
    timestamps: false,
    validate: {
        hasPieces(this: CardMemberIdolizePieceExtraInfo) {
            if (this.piecesSmile + this.piecesPure + this.piecesCool + this.piecesAll <= 0) {
                throw new Error("Must define at least one Idolization Piece (otherwise, leave this out and set Idolize type to NO_PIECES)");
            }
        }
    }
})
export default class CardMemberIdolizePieceExtraInfo extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => CardMemberExtraInfo)
    @Column(DataType.STRING)
    cardMemberExtraInfoCardNo!: string;

    @BelongsTo(() => CardMemberExtraInfo)
    cardMemberExtraInfo!: CardMemberExtraInfo;

    get card(): CardMember {
        return this.cardMemberExtraInfo.card;
    }

    @AllowNull(false)
    @Min(0)
    @Column(DataType.INTEGER)
    piecesAll!: number;

    @AllowNull(false)
    @Min(0)
    @Column(DataType.INTEGER)
    piecesSmile!: number;

    @AllowNull(false)
    @Min(0)
    @Column(DataType.INTEGER)
    piecesPure!: number;

    @AllowNull(false)
    @Min(0)
    @Column(DataType.INTEGER)
    piecesCool!: number;

    get pieces(): PieceInfo {
        return pieceInfoGetter(this,"piecesAll", "piecesSmile", "piecesPure", "piecesCool")
    }
}