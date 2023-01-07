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
    modelName: "CardSongAnyReqExtraInfo",
    timestamps: false
})
export default class CardSongAnyReqExtraInfo extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => CardSongExtraInfo)
    @Column(DataType.STRING)
    cardSongExtraInfoNo!: string;

    @BelongsTo(() => CardSongExtraInfo)
    cardSongExtraInfo!: CardSongExtraInfo;

    get card(): CardSong {
        return this.cardSongExtraInfo.card;
    }

    @AllowNull(false)
    @Min(0)
    @Column(DataType.NUMBER)
    piecesAll!: number;

    get pieces(): PieceInfo {
        return pieceInfoGetter(this,"piecesAll");
    }
}