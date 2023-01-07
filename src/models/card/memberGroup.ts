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

import type {CardMember} from "$models/card/card";
import CardMemberExtraInfo from "$models/card/memberExtraInfo";

import type CardMemberGroupType from "$types/cardMemberGroupType";
import Skill from "$models/skill/skill";
import DB from "$models/db";

@Scopes(() => ({
    hasSkill: () => ({
        include: [{model: DB.Skill, required: true}]
    })
}))
@Table({timestamps: false})
export default class CardMemberGroup extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column({field: "id"})
    cardId!: number;

    @AllowNull(false)
    @Column(DataType.NUMBER)
    type!: CardMemberGroupType;

    @HasMany(() => CardMemberExtraInfo)
    memberExtraInfos!: CardMemberExtraInfo[];

    get members(): CardMember[] {
        return this.memberExtraInfos.map((extraInfo: CardMemberExtraInfo) => <CardMember>extraInfo.card);
    }

    @Column(DataType.STRING)
    expectedMemberIds!: string;

    @HasMany(() => Skill, {foreignKey: "groupId"})
    skills!: Skill[];
}