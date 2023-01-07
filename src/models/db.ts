import {Sequelize} from "sequelize-typescript";
import type {ModelCtor} from "sequelize-typescript";
import type Card from "./card/card";
import {CardBase} from "./card/card";
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
import type Skill from "./skill/skill";
import {SkillBase} from "./skill/skill";
import Annotation from "./skill/annotation";
import Link from "./skill/link";
import Set from "$models/set/set";
import SetCategory from "$models/set/category";

const modelList = [
    CardBase, CardMemberGroup, CardFAQLink,
    CardMemberExtraInfo, CardMemberIdolizePieceExtraInfo,
    CardSongExtraInfo, CardSongAnyReqExtraInfo, CardSongAttrReqExtraInfo,
    SkillBase, Link, Annotation,
    TranslationName, TranslationSong, TranslationPattern,
    Set, SetCategory
];

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "cardlist.db",
    models: modelList,
    logQueryParameters: true
});

export interface DBObject {
    syncPromise: Promise<any>,
    sequelize: Sequelize,

    Card: ModelCtor<Card>
    CardMemberGroup: ModelCtor<CardMemberGroup>
    CardFAQLink: ModelCtor<CardFAQLink>

    CardMemberExtraInfo: ModelCtor<CardMemberExtraInfo>
    CardMemberIdolizePieceExtraInfo: ModelCtor<CardMemberIdolizePieceExtraInfo>

    CardSongExtraInfo: ModelCtor<CardSongExtraInfo>
    CardSongAnyReqExtraInfo: ModelCtor<CardSongAnyReqExtraInfo>
    CardSongAttrReqExtraInfo: ModelCtor<CardSongAttrReqExtraInfo>

    Skill: ModelCtor<Skill>
    Link: ModelCtor<Link>
    Annotation: ModelCtor<Annotation>

    TranslationName: ModelCtor<TranslationName>
    TranslationSong: ModelCtor<TranslationSong>
    TranslationPattern: ModelCtor<TranslationPattern>

    Set: ModelCtor<Set>
    SetCategory: ModelCtor<SetCategory>
}

const DB: DBObject = {
    syncPromise: Promise.all(modelList.map(m => m.sync())),
    sequelize: sequelize,

    Card: <ModelCtor<Card>>sequelize.models.Card,
    CardMemberGroup: <ModelCtor<CardMemberGroup>>sequelize.models.CardMemberGroup,
    CardFAQLink: <ModelCtor<CardFAQLink>>sequelize.models.CardFAQLink,

    CardMemberExtraInfo: <ModelCtor<CardMemberExtraInfo>>sequelize.models.CardMemberExtraInfo,
    CardMemberIdolizePieceExtraInfo: <ModelCtor<CardMemberIdolizePieceExtraInfo>>sequelize.models.CardMemberIdolizePieceExtraInfo,

    CardSongExtraInfo: <ModelCtor<CardSongExtraInfo>>sequelize.models.CardSongExtraInfo,
    CardSongAnyReqExtraInfo: <ModelCtor<CardSongAnyReqExtraInfo>>sequelize.models.CardSongAnyReqExtraInfo,
    CardSongAttrReqExtraInfo: <ModelCtor<CardSongAttrReqExtraInfo>>sequelize.models.CardSongAttrReqExtraInfo,

    Skill: <ModelCtor<Skill>>sequelize.models.Skill,
    Link: <ModelCtor<Link>>sequelize.models.Link,
    Annotation: <ModelCtor<Annotation>>sequelize.models.Annotation,

    TranslationName: <ModelCtor<TranslationName>>sequelize.models.TranslationName,
    TranslationSong: <ModelCtor<TranslationSong>>sequelize.models.TranslationSong,
    TranslationPattern: <ModelCtor<TranslationPattern>>sequelize.models.TranslationPattern,

    Set: <ModelCtor<Set>>sequelize.models.Set,
    SetCategory: <ModelCtor<SetCategory>>sequelize.models.SetCategory
};

export default DB;