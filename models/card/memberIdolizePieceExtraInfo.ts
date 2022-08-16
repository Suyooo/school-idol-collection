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

import {CardMember} from "./card";
import CardMemberExtraInfo from "./memberExtraInfo";

import {pieceInfoGetter} from "../utils/pieceInfoGetterSetter";

import PieceInfo from "../../types/pieceInfo";

@Table({
    timestamps: false,
    validate: {
        hasPieces() {
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
    cardMemberExtraInfoId!: string;

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
        return pieceInfoGetter("piecesAll", "piecesSmile", "piecesPure", "piecesCool");
    }
}