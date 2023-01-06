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
export default class CardSongAttrReqExtraInfo extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => CardSongExtraInfo)
    @Column
    cardSongExtraInfoCardNo!: string;

    @BelongsTo(() => CardSongExtraInfo)
    cardSongExtraInfo!: CardSongExtraInfo;

    get card(): CardSong {
        return <CardSong>this.cardSongExtraInfo.card;
    }

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
        return pieceInfoGetter(this,undefined, "piecesSmile", "piecesPure", "piecesCool");
    }
}