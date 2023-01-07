import {
    AllowNull, AutoIncrement,
    Column, DataType, HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Set from "$models/set/set";

@Table({timestamps: false})
export default class SetCategory extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column({field: "id", type: DataType.INTEGER})
    catId!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    jpn!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    eng!: string;

    @HasMany(() => Set)
    sets!: Set[];
}