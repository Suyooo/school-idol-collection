import {Sequelize} from "sequelize-typescript";
//import Log from "../utils/logger";
/*import Card from "./card/card";
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
import Annotation from "./skill/annotation";
import Link from "./skill/link";*/
import Set from "$models/set/set";
import SetCategory from "$models/set/category";

const modelList = [
    /*Card, CardMemberGroup, CardFAQLink,
    CardMemberExtraInfo, CardMemberIdolizePieceExtraInfo,
    CardSongExtraInfo, CardSongAnyReqExtraInfo, CardSongAttrReqExtraInfo,
    Skill, Link, Annotation,
    TranslationName, TranslationSong, TranslationPattern*/
    Set, SetCategory
];

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "cardlist.db",
//    logging: Log.debug.bind(Log, "DB"),
    logQueryParameters: true,
    models: modelList
});

const DB = {
    syncPromise: Promise.all(modelList.map(m => m.sync())),
    sequelize: sequelize,

    /*Card: <typeof Card>sequelize.models.Card,
    CardMemberGroup: <typeof CardMemberGroup>sequelize.models.CardMemberGroup,
    CardFAQLink: <typeof CardFAQLink>sequelize.models.CardFAQLink,

    CardMemberExtraInfo: <typeof CardMemberExtraInfo>sequelize.models.CardMemberExtraInfo,
    CardMemberIdolizePieceExtraInfo: <typeof CardMemberIdolizePieceExtraInfo>sequelize.models.CardMemberIdolizePieceExtraInfo,

    CardSongExtraInfo: <typeof CardSongExtraInfo>sequelize.models.CardSongExtraInfo,
    CardSongAnyReqExtraInfo: <typeof CardSongAnyReqExtraInfo>sequelize.models.CardSongAnyReqExtraInfo,
    CardSongAttrReqExtraInfo: <typeof CardSongAttrReqExtraInfo>sequelize.models.CardSongAttrReqExtraInfo,

    Skill: <typeof Skill>sequelize.models.Skill,
    Link: <typeof Link>sequelize.models.Link,
    Annotation: <typeof Annotation>sequelize.models.Annotation,

    TranslationName: <typeof TranslationName>sequelize.models.TranslationName,
    TranslationSong: <typeof TranslationSong>sequelize.models.TranslationSong,
    TranslationPattern: <typeof TranslationPattern>sequelize.models.TranslationPattern,*/

    Set: <typeof Set>sequelize.models.Set,
    SetCategory: <typeof SetCategory>sequelize.models.SetCategory
};

export default DB;