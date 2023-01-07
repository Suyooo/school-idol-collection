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
    declare cardSongExtraInfoCardNo: string;

    @BelongsTo(() => CardSongExtraInfo)
    declare cardSongExtraInfo: CardSongExtraInfo;

    get card(): CardSong {
        return this.cardSongExtraInfo.card;
    }

    @AllowNull(false)
    @Min(0)
    @Column(DataType.INTEGER)
    declare piecesSmile: number;

    @AllowNull(false)
    @Min(0)
    @Column(DataType.INTEGER)
    declare piecesPure: number;

    @AllowNull(false)
    @Min(0)
    @Column(DataType.INTEGER)
    declare piecesCool: number;

    get pieces(): PieceInfo {
        return pieceInfoGetter(this,undefined, "piecesSmile", "piecesPure", "piecesCool");
    }
}