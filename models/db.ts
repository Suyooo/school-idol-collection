import {Sequelize} from "sequelize-typescript";
import Log from "../utils/logger";
import Card from "./card/card";
import CardLink from "./card/cardLink";
import CardMemberGroupLink from "./card/memberGroupLink";
import CardFAQLink from "./card/faqLink";
import CardMemberGroup from "./card/memberGroup";
import TranslationPattern from "./translation/pattern";
import TranslationName from "./translation/name";
import TranslationSong from "./translation/song";
import CardMemberExtraInfo from "./card/memberExtraInfo";
import CardMemberIdolizePieceExtraInfo from "./card/memberIdolizePieceExtraInfo";
import CardSongExtraInfo from "./card/songExtraInfo";
import CardSongAnyReqExtraInfo from "./card/songAnyReqExtraInfo";
import CardSongAttrReqExtraInfo from "./card/songAttrReqExtraInfo";
import Skill from "./skill/skill";

const modelList = [
    Card, CardMemberGroup, CardFAQLink,
    CardMemberExtraInfo, CardMemberIdolizePieceExtraInfo,
    CardSongExtraInfo, CardSongAnyReqExtraInfo, CardSongAttrReqExtraInfo,
    Skill, CardLink, CardMemberGroupLink,
    TranslationName, TranslationSong, TranslationPattern
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
    TranslationName: <typeof TranslationName>sequelize.models.TranslationName,
    TranslationSong: <typeof TranslationSong>sequelize.models.TranslationSong,
    TranslationPattern: <typeof TranslationPattern>sequelize.models.TranslationPattern
};

export default DB;