import CardType from "$lib/enums/cardType.js";
import {Op, Sequelize} from "@sequelize/core";
import type {ModelStatic} from "@sequelize/core";

import type Card from "$models/card/card.js";
import {CardBase, cardOrder} from "$models/card/card.js";
import CardFAQLink from "$models/card/faqLink.js";
import CardMemberGroup from "$models/card/memberGroup.js";
import TranslationPattern from "$models/translation/pattern.js";
import TranslationName from "$models/translation/name.js";
import TranslationSong from "$models/translation/song.js";
import CardMemberExtraInfo from "$models/card/memberExtraInfo.js";
import CardMemberIdolizePieceExtraInfo from "$models/card/memberIdolizePieceExtraInfo.js";
import CardSongExtraInfo from "$models/card/songExtraInfo.js";
import CardSongAnyReqExtraInfo from "$models/card/songAnyReqExtraInfo.js";
import CardSongAttrReqExtraInfo from "$models/card/songAttrReqExtraInfo.js";
import type Skill from "$models/skill/skill.js";
import {SkillBase} from "$models/skill/skill.js";
import Annotation from "$models/skill/annotation.js";
import Link from "$models/skill/link.js";
import Set from "$models/set/set.js";
import SetCategory from "$models/set/category.js";

const modelList: ModelStatic<any>[] = [
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
    logging: false,
    logQueryParameters: true
});

async function scopes() {
    // TODO: Add as decorators once those are implemented? Or move to model files?

    CardBase.addScope("orderCardNo", () => ({
        order: cardOrder("`Card`.`cardNo`")
    }));
    CardBase.addScope("viewCardNoOnly", () => ({
        attributes: ["cardNo"]
    }));
    CardBase.addScope("viewForLink", () => ({
        attributes: ["cardNo", "id", "type", "nameJpn", "nameEng"]
    }));
    CardBase.addScope("viewRarity", () => ({
        include: [
            {model: sequelize.models.CardMemberExtraInfo, attributes: ["rarity"]},
            {model: sequelize.models.CardSongExtraInfo, attributes: ["rarity"]}
        ]
    }));
    CardBase.addScope("filterId", (id) => ({
        where: {id: id}
    }));
    CardBase.addScope("filterBefore", (cardNo) => ({
        where: {cardNo: {[Op.lt]: cardNo}},
        order: [["cardNo", "DESC"]]
    }));
    CardBase.addScope("filterAfter", (cardNo) => ({
        where: {cardNo: {[Op.gt]: cardNo}},
        order: [["cardNo", "ASC"]]
    }));
    CardBase.addScope("filterSet", (set) => ({
        where: {cardNo: {[Op.like]: set + "-%"}}
    }));
    CardBase.addScope("filterMembers", () => ({
        where: {type: CardType.MEMBER}
    }));
    CardBase.addScope("filterSongs", () => ({
        where: {type: CardType.SONG}
    }));
    CardBase.addScope("filterMemories", () => ({
        where: {type: CardType.MEMORY}
    }));
    CardBase.addScope("filterHasSkill", () => ({
        include: [{model: DB.Skill, required: true}]
    }));

    CardMemberGroup.addScope("filterHasSkill", () => ({
        include: [{model: DB.Skill, required: true}]
    }));
}

export interface DBObject {
    syncPromise: Promise<any>,
    sequelize: Sequelize,

    Card: ModelStatic<Card>
    CardMemberGroup: ModelStatic<CardMemberGroup>
    CardFAQLink: ModelStatic<CardFAQLink>

    CardMemberExtraInfo: ModelStatic<CardMemberExtraInfo>
    CardMemberIdolizePieceExtraInfo: ModelStatic<CardMemberIdolizePieceExtraInfo>

    CardSongExtraInfo: ModelStatic<CardSongExtraInfo>
    CardSongAnyReqExtraInfo: ModelStatic<CardSongAnyReqExtraInfo>
    CardSongAttrReqExtraInfo: ModelStatic<CardSongAttrReqExtraInfo>

    Skill: ModelStatic<Skill>
    Link: ModelStatic<Link>
    Annotation: ModelStatic<Annotation>

    TranslationName: ModelStatic<TranslationName>
    TranslationSong: ModelStatic<TranslationSong>
    TranslationPattern: ModelStatic<TranslationPattern>

    Set: ModelStatic<Set>
    SetCategory: ModelStatic<SetCategory>
}

const DB: DBObject = {
    syncPromise: Promise.all(modelList.map(m => m.sync())).then(scopes),
    sequelize: sequelize,

    Card: <ModelStatic<Card>>sequelize.models.Card,
    CardMemberGroup: <ModelStatic<CardMemberGroup>>sequelize.models.CardMemberGroup,
    CardFAQLink: <ModelStatic<CardFAQLink>>sequelize.models.CardFAQLink,

    CardMemberExtraInfo: <ModelStatic<CardMemberExtraInfo>>sequelize.models.CardMemberExtraInfo,
    CardMemberIdolizePieceExtraInfo: <ModelStatic<CardMemberIdolizePieceExtraInfo>>sequelize.models.CardMemberIdolizePieceExtraInfo,

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
    SetCategory: <ModelStatic<SetCategory>>sequelize.models.SetCategory
};

export default DB;