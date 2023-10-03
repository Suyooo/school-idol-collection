import { Op } from "@sequelize/core";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types.js";

export type CheckSkillList = {
    skillId: number;
    cardNo: string | null;
    annotations: CheckAnnotation[];
};

export type CheckAnnotation = {
    annotationJpn?: string;
    annotationEng?: string;
};

export type CheckResult = {
    common: string[];
    onlyInJpn: string[];
    onlyInEng: string[];
};

const ANNOTATION_REGEX = /\{\{([a-z]*):(.+?)\}\}/g;

export const POST: RequestHandler = (async ({ locals }) => {
    const DB = await locals.DB;

    const skills = await DB.m.Skill.findAll({
        where: { [Op.or]: [{ jpn: { [Op.like]: "%{{%:%}}%" } }, { eng: { [Op.like]: "%{{%:%}}%" } }] },
    });

    const checks: CheckSkillList[] = [];
    const knownPairs: Set<string> = new Set();
    for (const skill of skills) {
        const allAnnotations = { jpn: new Map<string, string[]>(), eng: new Map<string, string[]>() };
        for (const lang of ["jpn", "eng"] as const) {
            const matches = skill[lang]?.matchAll(ANNOTATION_REGEX);
            if (!matches) continue;

            for (const match of matches) {
                if (match[1] === "card") {
                    continue;
                }

                if (!allAnnotations["jpn"].has(match[1])) {
                    allAnnotations["jpn"].set(match[1], []);
                    allAnnotations["eng"].set(match[1], []);
                } else if (allAnnotations[lang].get(match[1])!.indexOf(match[0]) !== -1) {
                    continue;
                }
                allAnnotations[lang].get(match[1])!.push(match[0]);
            }
        }

        const annotations: CheckAnnotation[] = [];
        for (const [key, annos] of allAnnotations.jpn) {
            while (annos.length > 0) {
                const pair = {
                    annotationJpn: annos.shift(),
                    annotationEng: allAnnotations.eng.get(key)!.pop(),
                };
                if (pair.annotationJpn === pair.annotationEng) {
                    continue;
                }
                const pairString = JSON.stringify(pair);
                if (!knownPairs.has(pairString)) {
                    annotations.push(pair);
                    knownPairs.add(pairString);
                }
            }
        }
        for (const [_key, annos] of allAnnotations.eng) {
            while (annos.length > 0) {
                const pair = {
                    annotationJpn: undefined,
                    annotationEng: annos.shift(),
                };
                if (pair.annotationJpn === pair.annotationEng) {
                    continue;
                }
                const pairString = JSON.stringify(pair);
                if (!knownPairs.has(pairString)) {
                    annotations.push(pair);
                    knownPairs.add(pairString);
                }
            }
        }

        if (annotations.length > 0) {
            if (skill.cardNo) {
                checks.push({
                    skillId: skill.id,
                    cardNo: skill.cardNo,
                    annotations,
                });
            } else {
                const group = await DB.m.CardMemberGroup.findByPk(skill.groupId!, {
                    include: DB.m.CardMemberExtraInfo,
                });
                checks.push({
                    skillId: skill.id,
                    cardNo: group!.memberExtraInfos[0].cardNo,
                    annotations,
                });
            }
        }
    }

    return json(checks);
}) satisfies RequestHandler;
