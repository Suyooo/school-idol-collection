import { env } from "$env/dynamic/private";
import mariadb from "mariadb";
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

// Order is important - this is the order tables are imported and data is imported
// So tables that have foreign keys must be sorted after the tables they reference
export const modelList: ModelStatic<any>[] = [
	CardBase,
	CardMemberGroup,
	CardMemberExtraInfo,
	CardMemberIdolizePieceExtraInfo,
	CardSongExtraInfo,
	CardSongAnyReqExtraInfo,
	CardSongAttrReqExtraInfo,
	TranslationName,
	TranslationSong,
	TranslationPattern,
	SkillBase,
	Annotation,
	CardFAQLink,
	Link,
	SetCategory,
	Set,
];

const sequelize = new OrigSequelize({
	dialect: "mariadb",
	dialectModule: mariadb,
	host: env.DB_HOST,
	username: env.DB_USER,
	password: env.DB_PASSWORD,
	database: env.DB_DATABASE,
	port: 3306,
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
const DB: Promise<Sequelize> = new Promise<void>(async (resolve) => {
	for (const m of modelList) {
		await m.sync();
	}
	resolve();
})
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
