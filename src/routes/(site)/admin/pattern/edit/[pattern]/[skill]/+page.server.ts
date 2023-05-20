import { error } from "@sveltejs/kit";
import TriggerEnum from "$lib/enums/trigger.js";
import type PatternGroupType from "$lib/translation/patternGroupType.js";
import { splitTriggersFromSkill } from "$lib/translation/skills.js";
import { escapeForRegex } from "$lib/utils/string.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = (async ({ params, locals }) => {
    const skill = await locals.DB.Skill.findByPk(params.skill);
    if (skill === null) {
        throw error(404, { message: "This skill does not exist." });
    }
    const { skill: example, triggers } = splitTriggersFromSkill(skill.jpn);

    if (params.pattern === "new") {
        return {
            isNew: true,
            example,
            triggers: TriggerEnum.all.map((t) => triggers.indexOf(t) !== -1),
            regex: "^" + escapeForRegex(example) + "$",
            template: example,
            groupTypeIds: [],
        };
    } else {
        const pattern = await locals.DB.TranslationPattern.findByPk(params.pattern);
        if (pattern === null) {
            throw error(404, { message: "This pattern does not exist." });
        }
        return {
            isNew: false,
            patternId: pattern.id,
            example,
            triggers: TriggerEnum.all.map((t) => pattern.triggerArray.indexOf(t) !== -1),
            regex: pattern.regex,
            template: pattern.template,
            groupTypeIds: pattern.groupTypeArray.map((g: PatternGroupType) => g.id),
        };
    }
}) satisfies PageServerLoad;
