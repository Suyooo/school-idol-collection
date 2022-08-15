import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";

import {CardMemberExtraInfo} from "./card";
import TranslationGroupSkill from "../translations/groupSkill";

import {CardMemberGroupType} from "../../enums/memberGroupType";

@Table({timestamps: false})
export default class CardMemberGroup extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column(DataType.NUMBER)
    type: CardMemberGroupType;

    @HasMany(() => CardMemberExtraInfo)
    members: CardMemberExtraInfo[]; // TODO: map to Card

    @Column(DataType.TEXT)
    skill!: string | null;

    @HasMany(() => TranslationGroupSkill)
    skillsEn!: string[]; // TODO: getter (return skills instead of the Skill objects)
}