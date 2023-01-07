import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey, Scopes,
    Table
} from "sequelize-typescript";

import DB from "$models/db";
import type {CardMember} from "$models/card/card";
import CardMemberExtraInfo from "$models/card/memberExtraInfo";

import type CardMemberGroupType from "$types/cardMemberGroupType";
import type Skill from "$models/skill/skill";
import {SkillBase} from "$models/skill/skill";

@Scopes(() => ({
    hasSkill: () => ({
        include: [{model: DB.Skill, required: true}]
    })
}))
@Table({
    modelName: "CardMemberGroup",
    timestamps: false
})
export default class CardMemberGroup extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column({field: "id", type: DataType.INTEGER})
    declare cardId: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare type: CardMemberGroupType;

    @HasMany(() => CardMemberExtraInfo)
    declare memberExtraInfos: CardMemberExtraInfo[];

    get members(): CardMember[] {
        return this.memberExtraInfos.map((extraInfo: CardMemberExtraInfo) => <CardMember>extraInfo.card);
    }

    @Column(DataType.STRING)
    declare expectedMemberIds: string;

    @HasMany(() => SkillBase, {foreignKey: "groupId"})
    declare skills: Skill[];
}