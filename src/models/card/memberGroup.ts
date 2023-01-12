import {Attribute, HasMany, Table} from "@sequelize/core/decorators-legacy";
import {DataTypes, Model} from "@sequelize/core";

import type {CardMember} from "$models/card/card.js";
import type CardMemberExtraInfo from "$models/card/memberExtraInfo.js";

import type CardMemberGroupType from "$lib/enums/cardMemberGroupType.js";
import type Skill from "$models/skill/skill.js";

@Table({
    modelName: "CardMemberGroup",
    timestamps: false
})
export default class CardMemberGroup extends Model {
    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    })
    declare id: number;

    @Attribute({
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    })
    declare type: CardMemberGroupType;

    @HasMany((s) => s.models.CardMemberExtraInfo, {
        as: "memberExtraInfos",
        foreignKey: "groupId",
        inverse: { as: "group" }
    })
    declare memberExtraInfos: CardMemberExtraInfo[];

    get members(): CardMember[] {
        return this.memberExtraInfos.map((extraInfo: CardMemberExtraInfo) => <CardMember>extraInfo.card);
    }

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false
    })
    declare expectedMemberIds: string;

    @HasMany((s) => s.models.Skill, {
        as: "skills", foreignKey: "groupId", inverse: {as: "group"}
    })
    declare skills: Skill[];
}