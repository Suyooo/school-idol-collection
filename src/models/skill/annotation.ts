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
import type Card from "$models/card/card";
import Link from "$models/skill/link";
import AnnotationType from "$types/annotationType";
import type {AnnotationTypeID} from "$types/annotationType";
import type Skill from "$models/skill/skill";
import {SkillBase} from "$models/skill/skill";
import {CardBase} from "$models/card/card";

@Table({
    modelName: "Annotation",
    timestamps: false
})
export default class Annotation extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column({field: "id", type: DataType.INTEGER})
    annoId!: number;

    @ForeignKey(() => SkillBase)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    skillId!: number;

    @BelongsTo(() => SkillBase)
    skill!: Skill;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    isEng!: boolean;

    @AllowNull(false)
    @Column(DataType.NUMBER)
    type!: AnnotationTypeID;

    @AllowNull(false)
    @Column(DataType.STRING)
    parameter!: string;

    @BelongsToMany(() => CardBase, {through: {model: () => Link, unique: false}})
    linksTo!: Array<Card & { Link: Link }>;

    getAnnotationString() {
        return "{{" + AnnotationType.get(this.type).key + ":" + this.parameter + "}}";
    }
}