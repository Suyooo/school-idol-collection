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

import {CardMember, CardMemberExtraInfo} from "./card";
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
    get members(): CardMember[] {
        return this.getDataValue("members").map((extraInfo: CardMemberExtraInfo) => extraInfo.card);
    }

    set members(newMembers: CardMember[]) {
        this.setDataValue("members", newMembers.map(card => card.memberExtraInfo));
    }

    addMember(card: CardMember) {
        const newMembers = this.getDataValue("members");
        newMembers.push(card.memberExtraInfo)
        this.setDataValue("members", newMembers);
    }

    @Column(DataType.TEXT)
    skill!: string | null;

    @HasMany(() => TranslationGroupSkill)
    skillsEn!: TranslationGroupSkill[];
    get skillEn(): string {
        return this.skillsEn.map(sk => sk.skill).join("\n");
    }
}