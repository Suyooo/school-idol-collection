import type { QueryOptions } from "@sequelize/core";
import type { Sequelize } from "$models/db.js";
import type TranslationPattern from "$models/translation/pattern.js";
import Language from "$lib/enums/language.js";
import TriggerEnum from "$lib/enums/trigger.js";
import PatternApplyError from "$lib/errors/patternApplyError.js";

export const checkTriggersPattern = /^(【[^【】]*?】(?:\/【[^【】]*?】)*)(.*?)$/;

export function splitTriggersFromSkill(skillLine: string): { skill: string; triggers: TriggerEnum[] } {
	const hasTriggersMatch = checkTriggersPattern.exec(skillLine);
	if (hasTriggersMatch) {
		return {
			skill: hasTriggersMatch[2],
			triggers: hasTriggersMatch[1].split("/").map((t) => TriggerEnum.fromName(t.substring(1, t.length - 1))),
		};
	} else {
		return { skill: skillLine, triggers: [] };
	}
}

export interface ShortSkillInfoCard {
	cardNo: string;
	skillId: number;
	skillJpn: string;
	skillEng: string;
}

export interface ShortSkillInfoGroup {
	groupId: number;
	firstCardNo: string;
	skillId: number;
	skillJpn: string;
	skillEng: string;
}

export type ShortSkillInfo = ShortSkillInfoCard | ShortSkillInfoGroup;

export function isCardSkillShortInfo(s: ShortSkillInfo): s is ShortSkillInfoCard {
	return s.hasOwnProperty("cardNo");
}

export function isGroupSkillShortInfo(s: ShortSkillInfo): s is ShortSkillInfoGroup {
	return s.hasOwnProperty("groupId");
}

export async function listUntranslatedSkills(DB: Sequelize): Promise<ShortSkillInfo[]> {
	const allSkills = await DB.m.Skill.findAll({
		where: { eng: null },
		include: [
			{
				model: DB.m.CardMemberGroup,
				include: [{ model: DB.m.CardMemberExtraInfo, attributes: ["cardNo"] }],
			},
		],
	});

	return allSkills.map((skillObj) =>
		skillObj.isCardSkill() ?
			{ cardNo: skillObj.cardNo, skillJpn: skillObj.jpn, skillEng: "-", skillId: skillObj.id }
		:	{
				groupId: skillObj.groupId,
				firstCardNo: skillObj.group.memberExtraInfos[0].cardNo,
				skillJpn: skillObj.jpn,
				skillEng: "-",
				skillId: skillObj.id,
			}
	);
}

export async function getApplicableSkills(
	DB: Sequelize,
	pattern: TranslationPattern,
	options?: QueryOptions
): Promise<ShortSkillInfo[]> {
	const res = [];
	const allSkills = await DB.m.Skill.findAll({
		...options,
		include: [
			{
				model: DB.m.CardMemberGroup,
				include: [{ model: DB.m.CardMemberExtraInfo, attributes: ["cardNo"] }],
			},
		],
	});

	for (const skillObj of allSkills) {
		const { skill, triggers } = splitTriggersFromSkill(skillObj.jpn);
		const appliedPattern = await applyPatternOrNull(DB, skill, triggers, pattern, options);
		if (appliedPattern !== null) {
			res.push(
				skillObj.isCardSkill() ?
					{
						cardNo: skillObj.cardNo,
						skillId: skillObj.id,
						skillJpn: skill,
						skillEng: appliedPattern,
					}
				:	{
						groupId: skillObj.group.id,
						firstCardNo: skillObj.group.memberExtraInfos[0].cardNo,
						skillId: skillObj.id,
						skillJpn: skill,
						skillEng: appliedPattern,
					}
			);
		}
	}
	return res;
}

export async function applyPatternToSkills(DB: Sequelize, pattern: TranslationPattern, applyTo: number[]) {
	await DB.transaction(async (transaction) => {
		for (const application of applyTo) {
			const skillObj = await DB.m.Skill.findByPk(application, { transaction });
			if (skillObj === null) {
				throw new PatternApplyError(
					Error("Pattern should be applied to Skill #" + application + ", but it does not exist"),
					pattern,
					"---"
				);
			}

			const { skill, triggers } = splitTriggersFromSkill(skillObj.jpn);
			const translatedSkill = await applyPatternOrNull(DB, skill, triggers, pattern, { transaction });
			if (translatedSkill === null) {
				throw new PatternApplyError(
					Error("Pattern should be applied to Skill #" + application + ", but its regex does not match the Skill"),
					pattern,
					skillObj.jpn
				);
			}

			skillObj.eng = appendTriggersToString(triggers, translatedSkill);
			skillObj.patternId = pattern.id;
			await skillObj.save({ transaction });
		}
	});
}

export async function tryAllPatterns(
	DB: Sequelize,
	skillLine: string,
	options?: QueryOptions
): Promise<{ translatedSkill: string; triggers: TriggerEnum[]; pattern: TranslationPattern } | null> {
	const { skill, triggers } = splitTriggersFromSkill(skillLine);
	for (const pattern of await DB.m.TranslationPattern.findAll(options)) {
		const res = await applyPatternOrNull(DB, skill, triggers, pattern, options);
		if (res !== null) {
			return { translatedSkill: res, triggers, pattern };
		}
	}
	return null;
}

async function applyPatternOrNull(
	DB: Sequelize,
	skill: string,
	triggers: TriggerEnum[],
	pattern: TranslationPattern,
	options?: QueryOptions
): Promise<string | null> {
	// If this is a skill without triggers (tutorial text or lyrics), only patterns without triggers can be applied
	// Otherwise, check for at least one overlapping trigger
	if (
		pattern.triggers > 0 &&
		(triggers.length === 0 || pattern.triggerArray.every((t) => triggers.indexOf(t) === -1))
	) {
		return null;
	}

	const match = new RegExp(pattern.regex).exec(skill);
	if (match === null) {
		return null;
	}

	const groupTypeArray = pattern.groupTypeArray;
	const allRepls: string[] = new Array(groupTypeArray.length);
	try {
		for (let gi = 0; gi < groupTypeArray.length; gi++) {
			allRepls[gi] = await groupTypeArray[gi].getReplacement(DB, match[gi + 1], options);
		}
	} catch (e) {
		throw new PatternApplyError(e, pattern, skill);
	}

	let res = pattern.template;
	for (let gi = 0; gi < groupTypeArray.length; gi++) {
		res = res.replace(new RegExp("<" + (gi + 1) + ">", "g"), allRepls[gi]);
		const extraRepl = groupTypeArray[gi].getExtraReplacements(match[gi + 1], gi + 1);
		if (extraRepl !== null) {
			for (const [from, to] of extraRepl) {
				res = res.replace(new RegExp(from, "g"), to);
			}
		}
	}

	return res;
}

export function appendTriggersToString(triggers: TriggerEnum[], s: string, lang: Language = Language.ENG): string {
	return triggers.map((t) => "[" + t.toName(lang) + "]").join("/") + " " + s;
}
