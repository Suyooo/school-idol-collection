import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasOne,
    Min,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";

import Card from "./card";
import CardMemberIdolizePieceExtraInfo from "./memberIdolizePieceExtraInfo";
import CardMemberGroup from "./memberGroup";

import {pieceInfoGetter} from "../utils/pieceInfoGetterSetter";

import Attribute from "../../types/attribute";
import CardMemberIdolizeType from "../../types/cardMemberIdolizeType";
import {CardMemberRarity} from "../../types/cardRarity";
import PieceInfo from "../../types/pieceInfo";

@Table({
    timestamps: false,
    validate: {
        idolizableWithPiecesMustHaveIdolizePieceExtraInfo() {
            if ((this.idolizeType === CardMemberIdolizeType.WITH_PIECES) !== (this.idolizeBonus != null)) {
                if (this.idolizeType === CardMemberIdolizeType.WITH_PIECES)
                    throw new Error("Card has Idolization type WITH_PIECES, but does not have an Idolize Pieces Extra Info object");
                else
                    throw new Error("Card has an Idolize Pieces Extra Info object, but is not of Idolization type WITH_PIECES");
            }
        },
        validateBirthDate() {
            if ((this.birthDay == null) !== (this.birthMonth == null)) {
                throw new Error("For the birth date, either set both day and month or set neither");
            }
            if (this.birthDay != null && this.birthDay > [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.birthMonth - 1]) {
                throw new Error("For the birth date, the given day does not exist in the given month");
            }
        }
    }
})
export default class CardMemberExtraInfo extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => Card)
    @Column
    cardNo!: string;

    @BelongsTo(() => Card)
    card!: Card; // TODO: getter

    @AllowNull(false)
    @Column(DataType.NUMBER)
    rarity!: CardMemberRarity;

    @AllowNull(false)
    @Column(DataType.NUMBER)
    cost!: 0 | 1 | 2 | 3;

    @Column(DataType.NUMBER)
    birthDay!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | null;

    @Column(DataType.NUMBER)
    birthMonth!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | null;

    @Column(DataType.NUMBER)
    year!: 1 | 2 | 3 | null;

    @AllowNull(false)
    @Min(0)
    @Column
    piecesAll!: number;

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
        return pieceInfoGetter(this, "piecesAll", "piecesSmile", "piecesPure", "piecesCool");
    }

    @Column(DataType.NUMBER)
    pieceBdayAttribute!: Attribute | null;

    @Column(DataType.STRING)
    costumeJpn!: string | null;

    @Column(DataType.STRING)
    costumeEng!: string | null;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    abilityRush!: boolean;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    abilityLive!: boolean;

    @AllowNull(false)
    @Column(DataType.NUMBER)
    idolizeType!: CardMemberIdolizeType;

    @ForeignKey(() => CardMemberGroup)
    @Column(DataType.NUMBER)
    groupId!: number | null;

    @BelongsTo(() => CardMemberGroup)
    group!: CardMemberGroup | null;

    @HasOne(() => CardMemberIdolizePieceExtraInfo)
    idolizeBonus!: CardMemberIdolizePieceExtraInfo | null;
}