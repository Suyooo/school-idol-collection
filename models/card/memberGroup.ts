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

import {CardMember} from "./card";
import CardMemberExtraInfo from "./cardMemberExtraInfo";
import TranslationGroupSkill from "../translations/groupSkill";

import CardMemberGroupType from "../../types/cardMemberGroupType";

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

    addMember(card: CardMember) {
        this.memberExtraInfos.push(card.member);
        this.changed("memberExtraInfos", true);
    }

    @Column(DataType.TEXT)
    skill!: string | null;

    @HasMany(() => TranslationGroupSkill)
    skillsEn!: TranslationGroupSkill[];

    get skillEn(): string {
        return this.skillsEn.map(sk => sk.skill).join("\n");
    }
}