import {Attribute, Table} from "@sequelize/core/decorators-legacy";
import {DataTypes, Model} from "@sequelize/core";

import type {CardSong} from "$models/card/card.js";
import type CardSongExtraInfo from "$models/card/songExtraInfo.js";
import {pieceInfoGetter} from "$models/utils/pieceInfoGetterSetter.js";

import type PieceInfo from "$lib/types/pieceInfo.js";

@Table({
    modelName: "CardSongAnyReqExtraInfo",
    timestamps: false
})
export default class CardSongAnyReqExtraInfo extends Model {
    @Attribute({
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    })
    declare cardNo: string;
    /* inverse of association in CardSongExtraInfo */
    declare cardSongExtraInfo: CardSongExtraInfo;

    get card(): CardSong {
        return this.cardSongExtraInfo.card;
    }

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {min: 0}
    })
    declare piecesAll: number;

    get pieces(): PieceInfo {
        return pieceInfoGetter(this,"piecesAll");
    }
}