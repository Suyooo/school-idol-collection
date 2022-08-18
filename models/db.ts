import {Sequelize} from "sequelize-typescript";
import Log from "../utils/logger";
import Card from "./card/card";
import CardFAQLink from "./card/faqLink";
import CardMemberGroup from "./card/memberGroup";
import TranslateTablePattern from "./translatetables/pattern";
import TranslateTableName from "./translatetables/name";
import TranslateTableSong from "./translatetables/song";
import TranslationCostume from "./translations/costume";
import TranslationGroupSkill from "./translations/groupSkill";
import TranslationName from "./translations/name";
import TranslationSkill from "./translations/skill";
import CardMemberExtraInfo from "./card/memberExtraInfo";
import CardMemberIdolizePieceExtraInfo from "./card/memberIdolizePieceExtraInfo";
import CardSongExtraInfo from "./card/songExtraInfo";
import CardSongAnyReqExtraInfo from "./card/songAnyReqExtraInfo";
import CardSongAttrReqExtraInfo from "./card/songAttrReqExtraInfo";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "cardlist.db",
    logging: Log.debug.bind(Log, "DB"),
    logQueryParameters: true,
    models: [
        Card,
        CardMemberExtraInfo, CardMemberIdolizePieceExtraInfo,
        CardSongExtraInfo, CardSongAnyReqExtraInfo, CardSongAttrReqExtraInfo,
        CardFAQLink, CardMemberGroup,
        TranslationName, TranslationSkill, TranslationGroupSkill, TranslationCostume,
        TranslateTableName, TranslateTableSong,
        TranslateTablePattern
    ]
});

const DB = {
    syncPromise: sequelize.sync(),
    sequelize: sequelize,
    Card: <typeof Card>sequelize.models.Card,
    CardMemberExtraInfo: <typeof CardMemberExtraInfo>sequelize.models.CardMemberExtraInfo,
    CardMemberIdolizePieceExtraInfo: <typeof CardMemberIdolizePieceExtraInfo>sequelize.models.CardMemberIdolizePieceExtraInfo,
    CardSongExtraInfo: <typeof CardSongExtraInfo>sequelize.models.CardSongExtraInfo,
    CardSongAnyReqExtraInfo: <typeof CardSongAnyReqExtraInfo>sequelize.models.CardSongAnyReqExtraInfo,
    CardSongAttrReqExtraInfo: <typeof CardSongAttrReqExtraInfo>sequelize.models.CardSongAttrReqExtraInfo,
    CardFAQLink: <typeof CardFAQLink>sequelize.models.CardFAQLink,
    CardMemberGroup: <typeof CardMemberGroup>sequelize.models.CardMemberGroup,
    TranslationName: <typeof TranslationName>sequelize.models.TranslationName,
    TranslationSkill: <typeof TranslationSkill>sequelize.models.TranslationSkill,
    TranslationGroupSkill: <typeof TranslationGroupSkill>sequelize.models.TranslationGroupSkill,
    TranslationCostume: <typeof TranslationCostume>sequelize.models.TranslationCostume,
    TranslateTableName: <typeof TranslateTableName>sequelize.models.TranslateTableName,
    TranslateTableSong: <typeof TranslateTableSong>sequelize.models.TranslateTableSong,
    TranslateTablePattern: <typeof TranslateTablePattern>sequelize.models.TranslateTablePattern
};

export default DB;