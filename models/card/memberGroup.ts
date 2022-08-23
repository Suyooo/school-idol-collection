import {
    AllowNull,
    AutoIncrement, BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey, Scopes,
    Table
} from "sequelize-typescript";

import {CardMember} from "./card";
import CardMemberExtraInfo from "./memberExtraInfo";

import CardMemberGroupType from "../../types/cardMemberGroupType";
import Skill from "../skill/skill";
import DB from "../db";

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
    @Column
    id!: number;

    @AllowNull(false)
    @Column(DataType.NUMBER)
    type!: CardMemberGroupType;

    @HasMany(() => CardMemberExtraInfo)
    memberExtraInfos!: CardMemberExtraInfo[];

    get members(): CardMember[] {
        return this.memberExtraInfos.map((extraInfo: CardMemberExtraInfo) => <CardMember>extraInfo.card);
    }

    @Column(DataType.STRING)
    expectedMemberIds: string;

    @HasMany(() => Skill, {foreignKey: "groupId"})
    skills!: Skill[];
}