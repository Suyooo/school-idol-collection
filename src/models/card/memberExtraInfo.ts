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

import type {CardMember} from "$models/card/card";
import {CardBase} from "$models/card/card";
import CardMemberIdolizePieceExtraInfo from "$models/card/memberIdolizePieceExtraInfo";
import CardMemberGroup from "$models/card/memberGroup";

import {pieceInfoGetter} from "$models/utils/pieceInfoGetterSetter";

import type {AttributeID} from "$types/attribute";
import CardMemberIdolizeType from "$types/cardMemberIdolizeType";
import type {CardMemberRarity} from "$types/cardRarity";
import type PieceInfo from "$types/pieceInfo";

@Table({
    modelName: "CardMemberExtraInfo",
    timestamps: false,
    validate: {
        idolizableWithPiecesMustHaveIdolizePieceExtraInfo(this: CardMemberExtraInfo) {
            if ((this.idolizeType === CardMemberIdolizeType.WITH_PIECES) !== (this.idolizeBonus != null)) {
                if (this.idolizeType === CardMemberIdolizeType.WITH_PIECES)
                    throw new Error("Card has Idolization type WITH_PIECES, but does not have an Idolize Pieces Extra Info object");
                else
                    throw new Error("Card has an Idolize Pieces Extra Info object, but is not of Idolization type WITH_PIECES");
            }
        },
        validateBirthDate(this: CardMemberExtraInfo) {
            if ((this.birthDay == null) !== (this.birthMonth == null)) {
                throw new Error("For the birth date, either set both day and month or set neither");
            }
            if (this.birthDay != null && this.birthMonth != null && this.birthDay > [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.birthMonth - 1]) {
                throw new Error("For the birth date, the given day does not exist in the given month");
            }
        }
    }
})
export default class CardMemberExtraInfo extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => CardBase)
    @Column(DataType.INTEGER)
    cardNo!: string;

    @BelongsTo(() => CardBase)
    card!: CardMember;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    rarity!: CardMemberRarity;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    cost!: 0 | 1 | 2 | 3;

    @Column(DataType.INTEGER)
    birthDay!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | null;

    @Column(DataType.NUMBER)
    birthMonth!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | null;

    @Column(DataType.INTEGER)
    year!: 1 | 2 | 3 | null;

    @AllowNull(false)
    @Min(0)
    @Column(DataType.INTEGER)
    piecesAll!: number;

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
        return pieceInfoGetter(this, "piecesAll", "piecesSmile", "piecesPure", "piecesCool");
    }

    @Column(DataType.INTEGER)
    pieceBdayAttribute!: AttributeID | null;

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
    @Column(DataType.INTEGER)
    idolizeType!: CardMemberIdolizeType;

    @ForeignKey(() => CardMemberGroup)
    @Column(DataType.INTEGER)
    groupId!: number | null;

    @BelongsTo(() => CardMemberGroup)
    group!: CardMemberGroup | null;

    @HasOne(() => CardMemberIdolizePieceExtraInfo)
    idolizeBonus!: CardMemberIdolizePieceExtraInfo | null;
}