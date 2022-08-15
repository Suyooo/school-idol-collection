import {
    AllowNull,
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {CardMemberExtraInfo} from "../card/card";

@Table({timestamps: false})
export default class TranslationCostume extends Model {
    @PrimaryKey
    @ForeignKey(() => CardMemberExtraInfo)
    @Column
    cardMemberExtraInfoId: string;

    @BelongsTo(() => CardMemberExtraInfo)
    cardMemberExtraInfo: CardMemberExtraInfo;

    @AllowNull(false)
    @Column
    costume: string;
}