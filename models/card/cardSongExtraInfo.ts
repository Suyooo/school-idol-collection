import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasOne,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import CardSongRequirementType from "../../types/cardSongRequirementType";
import {CardSongRarity} from "../../types/cardRarity";
import Attribute from "../../types/attribute";
import Card from "./card";
import CardSongAnyReqExtraInfo from "./cardSongAnyReqExtraInfo";
import CardSongAttrReqExtraInfo from "./cardSongAttrReqExtraInfo";

@Table({
    timestamps: false,
    validate: {
        anyReqTypeMustHaveSongAnyReqExtraInfo() {
            if ((this.requirementType === CardSongRequirementType.ANY_PIECE) !== (this.anyRequirement != null)) {
                if (this.requirementType === CardSongRequirementType.ANY_PIECE)
                    throw new Error("Song has an Any Piece Requirement type, but does not have an Any Piece Extra Info object");
                else
                    throw new Error("Song has an Any Piece Extra Info object, but does not have an Any Piece Requirement type");
            }
        },
        attrReqTypeMustHaveSongAttrReqExtraInfo() {
            if ((this.requirementType === CardSongRequirementType.ATTR_PIECE) !== (this.attrRequirement != null)) {
                if (this.requirementType === CardSongRequirementType.ATTR_PIECE)
                    throw new Error("Song has an Attribute Piece Requirement type, but does not have an Attribute Piece Extra Info object");
                else
                    throw new Error("Song has an Attribute Piece Extra Info object, but does not have an Attribute Piece Requirement type");
            }
        }
    }
})
export default class CardSongExtraInfo extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => Card)
    @Column
    cardId: string;

    @BelongsTo(() => Card)
    card: Card; // TODO: getter

    @AllowNull(false)
    @Column(DataType.NUMBER)
    rarity!: CardSongRarity;

    @AllowNull(false)
    @Column(DataType.NUMBER)
    attribute!: Attribute;

    @AllowNull(false)
    @Column
    lpBase!: number;

    @Column(DataType.STRING(2))
    lpBonus!: number | "X" | "∞" | null;

    @AllowNull(false)
    @Column(DataType.NUMBER)
    requirementType!: CardSongRequirementType;

    @HasOne(() => CardSongAnyReqExtraInfo)
    anyRequirement!: CardSongAnyReqExtraInfo | null;

    @HasOne(() => CardSongAttrReqExtraInfo)
    attrRequirement!: CardSongAttrReqExtraInfo | null;
}