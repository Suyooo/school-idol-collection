import {Sequelize} from "sequelize-typescript";
import Log from "../utils/logger";
import {
    Card,
    CardMemberExtraInfo,
    CardMemberIdolizePieceExtraInfo,
    CardSongAnyReqExtraInfo, CardSongAttrReqExtraInfo,
    CardSongExtraInfo
} from "./card/card";
import CardFAQLink from "./card/faqLink";
import CardMemberGroup from "./card/memberGroup";
import TranslateTablePattern from "./translatetables/pattern";
import TranslateTableName from "./translatetables/name";
import TranslateTableSong from "./translatetables/song";
import TranslationCostume from "./translations/costume";
import TranslationGroupSkill from "./translations/groupSkill";
import TranslationName from "./translations/name";
import TranslationSkill from "./translations/skill";

const DB = new Sequelize({
    dialect: "sqlite",
    storage: "cardlist2.db",
    logging: Log.debug.bind(Log, "DB"),
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

DB.sync();

export default DB;