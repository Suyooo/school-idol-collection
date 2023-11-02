import type { CardSong } from "$models/card/card.js";
import type CardSongExtraInfo from "$models/card/songExtraInfo.js";
import { DataTypes, Model } from "@sequelize/core";
import { Attribute, Table } from "@sequelize/core/decorators-legacy";

@Table({
    modelName: "CardSongAttrReqExtraInfo",
    timestamps: false,
})
export default class CardSongAttrReqExtraInfo extends Model {
    @Attribute({
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
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
        validate: { min: 0 },
    })
    declare piecesSmile: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: { min: 0 },
    })
    declare piecesPure: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: { min: 0 },
    })
    declare piecesCool: number;
}
