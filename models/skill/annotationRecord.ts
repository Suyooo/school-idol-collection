import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Card from "../card/card";
import Link from "./link";
import AnnotationType, {AnnotationTypeID} from "../../types/annotationType";
import Skill from "./skill";

@Table({
    timestamps: false,
    validate: {
        mustHaveEitherCardOrGroup() {
            if (this.cardNo === null && this.groupId === null) {
                throw new Error("Annotation must belong to either a card or a group");
            }
        }
    }
})
export default class AnnotationRecord extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => Skill)
    @AllowNull(false)
    @Column
    skillId!: number;

    @BelongsTo(() => Skill)
    skill!: Skill;

    @AllowNull(false)
    @Column
    isEng!: boolean;

    @AllowNull(false)
    @Column(DataType.NUMBER)
    type!: AnnotationTypeID;

    @AllowNull(false)
    @Column
    parameter!: string;

    @BelongsToMany(() => Card, {through: {model: () => Link, unique: false}})
    linksTo!: Array<Card & { Link: Link }>;

    getAnnotationString() {
        return "{{" + AnnotationType.get(this.type).key + ":" + this.parameter + "}}";
    }
}