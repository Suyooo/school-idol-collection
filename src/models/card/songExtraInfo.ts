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
import CardSongRequirementType from "$types/cardSongRequirementType";
import type {CardSongRarity} from "$types/cardRarity";
import type {AttributeID} from "$types/attribute";
import type {CardSong} from "$models/card/card";
import {CardBase} from "$models/card/card";
import CardSongAnyReqExtraInfo from "$models/card/songAnyReqExtraInfo";
import CardSongAttrReqExtraInfo from "$models/card/songAttrReqExtraInfo";

@Table({
    modelName: "CardSongExtraInfo",
    timestamps: false,
    validate: {
        anyReqTypeMustHaveSongAnyReqExtraInfo(this: CardSongExtraInfo) {
            if ((this.requirementType === CardSongRequirementType.ANY_PIECE) !== (this.anyRequirement != null)) {
                if (this.requirementType === CardSongRequirementType.ANY_PIECE)
                    throw new Error("Song has an Any Piece Requirement type, but does not have an Any Piece Extra Info object");
                else
                    throw new Error("Song has an Any Piece Extra Info object, but does not have an Any Piece Requirement type");
            }
        },
        attrReqTypeMustHaveSongAttrReqExtraInfo(this: CardSongExtraInfo) {
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
    @ForeignKey(() => CardBase)
    @Column(DataType.INTEGER)
    declare cardId: string;

    @BelongsTo(() => CardBase)
    declare card: CardSong;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare rarity: CardSongRarity;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare attribute: AttributeID;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare lpBase: number;

    @Column(DataType.STRING(2))
    declare lpBonus: number | "X" | "∞" | null;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare requirementType: CardSongRequirementType;

    @HasOne(() => CardSongAnyReqExtraInfo)
    declare anyRequirement: CardSongAnyReqExtraInfo | null;

    @HasOne(() => CardSongAttrReqExtraInfo)
    declare attrRequirement: CardSongAttrReqExtraInfo | null;
}