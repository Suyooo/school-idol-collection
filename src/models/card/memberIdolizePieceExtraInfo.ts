import {
    AllowNull,
    BelongsTo,
    Column,
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
    @Column
    cardMemberExtraInfoCardNo!: string;

    @BelongsTo(() => CardMemberExtraInfo)
    cardMemberExtraInfo!: CardMemberExtraInfo;

    get card(): CardMember {
        return <CardMember>this.cardMemberExtraInfo.card;
    }

    @AllowNull(false)
    @Min(0)
    @Column
    piecesAll!: number;

    @Column
    @AllowNull(false)
    @Min(0)
    @Column
    piecesSmile!: number;

    @AllowNull(false)
    @Min(0)
    @Column
    piecesPure!: number;

    @AllowNull(false)
    @Min(0)
    @Column
    piecesCool!: number;

    get pieces(): PieceInfo {
        return pieceInfoGetter(this,"piecesAll", "piecesSmile", "piecesPure", "piecesCool")
    }
}