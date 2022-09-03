import {
    AllowNull,
    Column,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";

@Table({timestamps: false})
export default class TranslationName extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column
    jpn: string;

    @AllowNull(false)
    @Column
    eng: string;
}