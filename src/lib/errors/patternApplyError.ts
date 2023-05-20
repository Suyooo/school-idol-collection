import type TranslationPattern from "$models/translation/pattern.js";
import ErrorWithCause from "$lib/errors/errorWithCause.js";

export default class PatternApplyError extends ErrorWithCause {
    constructor(cause: any, pattern: TranslationPattern, skill: string) {
        super("Skill: " + skill + "\nRegex: " + pattern.regex + "\nTemplate: " + pattern.template, cause);
    }
}
