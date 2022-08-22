import {Sequelize} from "sequelize-typescript";
import Log from "../utils/logger";
import Card from "./card/card";
import CardLink from "./card/cardLink";
import CardMemberGroupLink from "./card/memberGroupLink";
import CardFAQLink from "./card/faqLink";
import CardMemberGroup from "./card/memberGroup";
import TranslateTablePattern from "./translatetables/pattern";
import TranslateTableName from "./translatetables/name";
import TranslateTableSong from "./translatetables/song";
import CardMemberExtraInfo from "./card/memberExtraInfo";
import CardMemberIdolizePieceExtraInfo from "./card/memberIdolizePieceExtraInfo";
import CardSongExtraInfo from "./card/songExtraInfo";
import CardSongAnyReqExtraInfo from "./card/songAnyReqExtraInfo";
import CardSongAttrReqExtraInfo from "./card/songAttrReqExtraInfo";
import Skill from "./skill/skill";

const modelList = [
    Card,
    CardMemberExtraInfo, CardMemberIdolizePieceExtraInfo,
    CardSongExtraInfo, CardSongAnyReqExtraInfo, CardSongAttrReqExtraInfo,
    CardLink, CardMemberGroupLink, CardFAQLink, CardMemberGroup,
    Skill,
    TranslateTableName, TranslateTableSong,
    TranslateTablePattern
];

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "cardlist.db",
    logging: Log.debug.bind(Log, "DB"),
    logQueryParameters: true,
    models: modelList
});

const DB = {
    syncPromise: Promise.all(modelList.map(m => m.sync())),
    sequelize: sequelize,
    Card: <typeof Card>sequelize.models.Card,
    CardMemberExtraInfo: <typeof CardMemberExtraInfo>sequelize.models.CardMemberExtraInfo,
    CardMemberIdolizePieceExtraInfo: <typeof CardMemberIdolizePieceExtraInfo>sequelize.models.CardMemberIdolizePieceExtraInfo,
    CardMemberGroup: <typeof CardMemberGroup>sequelize.models.CardMemberGroup,
    CardSongExtraInfo: <typeof CardSongExtraInfo>sequelize.models.CardSongExtraInfo,
    CardSongAnyReqExtraInfo: <typeof CardSongAnyReqExtraInfo>sequelize.models.CardSongAnyReqExtraInfo,
    CardSongAttrReqExtraInfo: <typeof CardSongAttrReqExtraInfo>sequelize.models.CardSongAttrReqExtraInfo,
    CardLink: <typeof CardLink>sequelize.models.CardLink,
    CardMemberGroupLink: <typeof CardMemberGroupLink>sequelize.models.CardMemberGroupLink,
    CardFAQLink: <typeof CardFAQLink>sequelize.models.CardFAQLink,
    Skill: <typeof Skill>sequelize.models.Skill,
    TranslateTableName: <typeof TranslateTableName>sequelize.models.TranslateTableName,
    TranslateTableSong: <typeof TranslateTableSong>sequelize.models.TranslateTableSong,
    TranslateTablePattern: <typeof TranslateTablePattern>sequelize.models.TranslateTablePattern
};

export default DB;