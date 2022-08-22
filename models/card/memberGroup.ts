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

import Card, {CardMember} from "./card";
import CardMemberExtraInfo from "./memberExtraInfo";
import TranslationGroupSkill from "../translations/groupSkill";

import CardMemberGroupType from "../../types/cardMemberGroupType";
import {Op} from "sequelize";
import CardMemberGroupLink from "./memberGroupLink";

@Scopes(() => ({
    hasSkill: {
        where: {
            skill: {
                [Op.not]: null
            }
        }
    }
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

    @Column(DataType.TEXT)
    skill!: string | null;

    get skillLines(): string[] {
        if (this.skill === null) return [];
        return this.skill.split("\n");
    }

    @HasMany(() => TranslationGroupSkill)
    _skillLinesEng!: TranslationGroupSkill[];

    get skillLinesEng(): string[] {
        return this._skillLinesEng.map(sk => sk.skill);
    }

    @BelongsToMany(() => Card, {through: {model: () => CardMemberGroupLink, unique: false}, foreignKey: "fromGroupId"})
    linksTo!: Array<Card & { CardMemberGroupLink: CardMemberGroupLink }>;
}