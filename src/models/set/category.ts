import {
    AllowNull, AutoIncrement,
    Column, DataType, HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Set from "$models/set/set";

@Table({
    modelName: "SetCategory",
    timestamps: false
})
export default class SetCategory extends Model {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column({field: "id", type: DataType.INTEGER})
    declare catId: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare jpn: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare eng: string;

    @HasMany(() => Set)
    declare sets: Set[];
}