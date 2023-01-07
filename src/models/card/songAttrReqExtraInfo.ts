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

import type {CardSong} from "$models/card/card";
import CardSongExtraInfo from "$models/card/songExtraInfo";
import {pieceInfoGetter} from "$models/utils/pieceInfoGetterSetter";
import type PieceInfo from "$types/pieceInfo";

@Table({
    modelName: "CardSongAttrReqExtraInfo",
    timestamps: false
})
export default class CardSongAttrReqExtraInfo extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => CardSongExtraInfo)
    @Column(DataType.STRING)
    cardSongExtraInfoCardNo!: string;

    @BelongsTo(() => CardSongExtraInfo)
    cardSongExtraInfo!: CardSongExtraInfo;

    get card(): CardSong {
        return this.cardSongExtraInfo.card;
    }

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
        return pieceInfoGetter(this,undefined, "piecesSmile", "piecesPure", "piecesCool");
    }
}