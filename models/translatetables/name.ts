import {
    AllowNull,
    Column,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";

@Table({timestamps: false})
export default class TranslateTableName extends Model {
    @PrimaryKey
    @Column
    jpn: string;

    @AllowNull(false)
    @Column
    eng: string;
}