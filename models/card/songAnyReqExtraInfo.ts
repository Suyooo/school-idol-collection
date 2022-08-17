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
import {CardSong} from "./card";
import CardSongExtraInfo from "./songExtraInfo";

import {pieceInfoGetter} from "../utils/pieceInfoGetterSetter";

import PieceInfo from "../../types/pieceInfo";

@Table({timestamps: false})
export default class CardSongAnyReqExtraInfo extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => CardSongExtraInfo)
    @Column
    cardSongExtraInfoId!: string;

    @BelongsTo(() => CardSongExtraInfo)
    cardSongExtraInfo!: CardSongExtraInfo;

    get card(): CardSong {
        return <CardSong>this.cardSongExtraInfo.card;
    }

    @AllowNull(false)
    @Min(0)
    @Column
    piecesAll!: number;

    get pieces(): PieceInfo {
        return pieceInfoGetter(this,"piecesAll");
    }
}