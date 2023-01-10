import {Attribute, Table} from "@sequelize/core/decorators-legacy";
import {DataTypes, Model} from "@sequelize/core";

import type {CardMember} from "$models/card/card.js";
import type CardMemberExtraInfo from "$models/card/memberExtraInfo.js";
import {pieceInfoGetter} from "$models/utils/pieceInfoGetterSetter.js";

import type PieceInfo from "$types/pieceInfo.js";

@Table({
    modelName: "CardMemberIdolizePieceExtraInfo",
    timestamps: false,
    validate: {
        hasPieces(this: CardMemberIdolizePieceExtraInfo) {
            if (this.piecesSmile + this.piecesPure + this.piecesCool + this.piecesAll <= 0) {
                throw new Error("Must define at least one Idolization Piece (otherwise, leave this out and set Idolize type to NO_PIECES)");
            }
            return true;
        }
    }
})
export default class CardMemberIdolizePieceExtraInfo extends Model {
    @Attribute({
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    })
    declare cardNo: string;
    /* inverse of association in CardMemberExtraInfo */
    declare cardMemberExtraInfo: CardMemberExtraInfo;

    get card(): CardMember {
        return this.cardMemberExtraInfo.card;
    }

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {min: 0}
    })
    declare piecesAll: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {min: 0}
    })
    declare piecesSmile: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {min: 0}
    })
    declare piecesPure: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {min: 0}
    })
    declare piecesCool: number;

    get pieces(): PieceInfo {
        return pieceInfoGetter(this,"piecesAll", "piecesSmile", "piecesPure", "piecesCool")
    }
}