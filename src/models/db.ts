import { Sequelize as OrigSequelize } from "@sequelize/core";
import type { ModelStatic } from "@sequelize/core";
import type Card from "$models/card/card.js";
import { CardBase } from "$models/card/card.js";
import { addScopes as addScopesCardBase } from "$models/card/card.js";
import CardFAQLink from "$models/card/faqLink.js";
import CardMemberExtraInfo from "$models/card/memberExtraInfo.js";
import CardMemberGroup from "$models/card/memberGroup.js";
import { addScopes as addScopesCardMemberGroup } from "$models/card/memberGroup.js";
import CardMemberIdolizePieceExtraInfo from "$models/card/memberIdolizePieceExtraInfo.js";
import CardSongAnyReqExtraInfo from "$models/card/songAnyReqExtraInfo.js";
import CardSongAttrReqExtraInfo from "$models/card/songAttrReqExtraInfo.js";
import CardSongExtraInfo from "$models/card/songExtraInfo.js";
import SetCategory from "$models/set/category.js";
import Set from "$models/set/set.js";
import Annotation from "$models/skill/annotation.js";
import Link from "$models/skill/link.js";
import type Skill from "$models/skill/skill.js";
import { SkillBase } from "$models/skill/skill.js";
import TranslationName from "$models/translation/name.js";
import TranslationPattern from "$models/translation/pattern.js";
import TranslationSong from "$models/translation/song.js";
import { addScopes as addScopesSearch } from "$lib/search/scopes.js";

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
    dialect: "sqlite",
    storage: "cardlist.db",
    models: modelList,
    logging: true,
    logQueryParameters: true,
});

async function addScopes(sq: Sequelize) {
    addScopesCardBase(sq);
    addScopesCardMemberGroup(sq);
    addScopesSearch(sq);
}

export interface Sequelize extends OrigSequelize {
    models: {
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
    .then(() => addScopes(sequelize as Sequelize))
    .then(() => sequelize as Sequelize);

export default DB;
