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
import Card from "$models/card/card";
import Link from "$models/skill/link";
import AnnotationType from "$types/annotationType";
import type {AnnotationTypeID} from "$types/annotationType";
import Skill from "$models/skill/skill";

@Table({timestamps: false})
export default class Annotation extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column({field: "id"})
    annoId!: number;

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