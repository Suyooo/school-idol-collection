import {
    AllowNull,
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {CardMember, CardMemberExtraInfo} from "../card/card";

@Table({timestamps: false})
export default class TranslationCostume extends Model {
    @PrimaryKey
    @ForeignKey(() => CardMemberExtraInfo)
    @Column
    cardId: string;

    @BelongsTo(() => CardMemberExtraInfo)
    get card(): CardMember {
        return this.getDataValue("card").card;
    }
    set card(newCard: CardMember) {
        this.setDataValue("card", newCard.memberExtraInfo);
    }

    @AllowNull(false)
    @Column
    costume: string;
}