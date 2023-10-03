import { addScopes as addScopesSearch } from "$l/search/scopes.js";
import type Card from "$m/card/card.js";
import { CardBase } from "$m/card/card.js";
import { addScopes as addScopesCardBase } from "$m/card/card.js";
import CardFAQLink from "$m/card/faqLink.js";
import CardMemberExtraInfo from "$m/card/memberExtraInfo.js";
import CardMemberGroup from "$m/card/memberGroup.js";
import { addScopes as addScopesCardMemberGroup } from "$m/card/memberGroup.js";
import CardMemberIdolizePieceExtraInfo from "$m/card/memberIdolizePieceExtraInfo.js";
import CardSongAnyReqExtraInfo from "$m/card/songAnyReqExtraInfo.js";
import CardSongAttrReqExtraInfo from "$m/card/songAttrReqExtraInfo.js";
import CardSongExtraInfo from "$m/card/songExtraInfo.js";
import SetCategory from "$m/set/category.js";
import Set from "$m/set/set.js";
import Annotation from "$m/skill/annotation.js";
import Link from "$m/skill/link.js";
import type Skill from "$m/skill/skill.js";
import { SkillBase } from "$m/skill/skill.js";
import TranslationName from "$m/translation/name.js";
import TranslationPattern from "$m/translation/pattern.js";
import TranslationSong from "$m/translation/song.js";
import dbSettings from "../../dbSettings.json";
import { Sequelize as OrigSequelize } from "@sequelize/core";
import type { ModelStatic } from "@sequelize/core";

const modelList: ModelStatic<any>[] = [
    CardBase,
    CardMemberGroup,
    CardFAQLink,
    CardMemberExtraInfo,
    CardMemberIdolizePieceExtraInfo,
    CardSongExtraInfo,
    CardSongAnyReqExtraInfo,
    CardSongAttrReqExtraInfo,
    SkillBase,
    Link,
    Annotation,
    TranslationName,
    TranslationSong,
    TranslationPattern,
    Set,
    SetCategory,
];

const sequelize = new OrigSequelize({
    dialect: "mariadb",
    dialectOptions: dbSettings,
    models: modelList,
    logging: false,
    logQueryParameters: true,
});

async function addScopes(sq: Sequelize) {
    addScopesCardBase(sq);
    addScopesCardMemberGroup(sq);
    addScopesSearch(sq);
}

export interface Sequelize extends OrigSequelize {
    m: {
        Card: ModelStatic<Card>;
        CardMemberGroup: ModelStatic<CardMemberGroup>;
        CardFAQLink: ModelStatic<CardFAQLink>;

        CardMemberExtraInfo: ModelStatic<CardMemberExtraInfo>;
        CardMemberIdolizePieceExtraInfo: ModelStatic<CardMemberIdolizePieceExtraInfo>;

        CardSongExtraInfo: ModelStatic<CardSongExtraInfo>;
        CardSongAnyReqExtraInfo: ModelStatic<CardSongAnyReqExtraInfo>;
        CardSongAttrReqExtraInfo: ModelStatic<CardSongAttrReqExtraInfo>;

        Skill: ModelStatic<Skill>;
        Link: ModelStatic<Link>;
        Annotation: ModelStatic<Annotation>;

        TranslationName: ModelStatic<TranslationName>;
        TranslationSong: ModelStatic<TranslationSong>;
        TranslationPattern: ModelStatic<TranslationPattern>;

        Set: ModelStatic<Set>;
        SetCategory: ModelStatic<SetCategory>;
    };
}
const DB: Promise<Sequelize> = Promise.all(modelList.map((m) => m.sync()))
    .then(() => {
        /*
         * This might seem odd - why make this object? Doesn't sequelize.models exist?
         * Yes, but for some reason, there is some kind of "scope spillage" - where a scope would keep applying to all
         * queries of that model if it was used once. I spent three days on this problem and have no idea why or how it
         * happens, it doesn't seem intended. To avoid any unexplainable behaviour due to this bug, let's simply skip
         * using the models manager, and have constant references to the original, unscoped models here.
         */
        (sequelize as Sequelize).m = {
            Card: <ModelStatic<Card>>sequelize.models.Card,
            CardMemberGroup: <ModelStatic<CardMemberGroup>>sequelize.models.CardMemberGroup,
            CardFAQLink: <ModelStatic<CardFAQLink>>sequelize.models.CardFAQLink,

            CardMemberExtraInfo: <ModelStatic<CardMemberExtraInfo>>sequelize.models.CardMemberExtraInfo,
            CardMemberIdolizePieceExtraInfo: <ModelStatic<CardMemberIdolizePieceExtraInfo>>(
                sequelize.models.CardMemberIdolizePieceExtraInfo
            ),

            CardSongExtraInfo: <ModelStatic<CardSongExtraInfo>>sequelize.models.CardSongExtraInfo,
            CardSongAnyReqExtraInfo: <ModelStatic<CardSongAnyReqExtraInfo>>sequelize.models.CardSongAnyReqExtraInfo,
            CardSongAttrReqExtraInfo: <ModelStatic<CardSongAttrReqExtraInfo>>sequelize.models.CardSongAttrReqExtraInfo,

            Skill: <ModelStatic<Skill>>sequelize.models.Skill,
            Link: <ModelStatic<Link>>sequelize.models.Link,
            Annotation: <ModelStatic<Annotation>>sequelize.models.Annotation,

            TranslationName: <ModelStatic<TranslationName>>sequelize.models.TranslationName,
            TranslationSong: <ModelStatic<TranslationSong>>sequelize.models.TranslationSong,
            TranslationPattern: <ModelStatic<TranslationPattern>>sequelize.models.TranslationPattern,

            Set: <ModelStatic<Set>>sequelize.models.Set,
            SetCategory: <ModelStatic<SetCategory>>sequelize.models.SetCategory,
        };
    })
    .then(() => addScopes(sequelize as Sequelize))
    .then(() => sequelize as Sequelize);

export default DB;
