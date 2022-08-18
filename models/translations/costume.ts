import {
    AllowNull,
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {CardMember} from "../card/card";
import CardMemberExtraInfo from "../card/memberExtraInfo";

@Table({timestamps: false})
export default class TranslationCostume extends Model {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => CardMemberExtraInfo)
    @Column
    cardMemberExtraInfoCardNo: string;

    @BelongsTo(() => CardMemberExtraInfo)
    cardMemberExtraInfo: CardMemberExtraInfo;

    get card(): CardMember {
        return <CardMember> this.cardMemberExtraInfo.card;
    }

    @AllowNull(false)
    @Column
    costume: string;
}