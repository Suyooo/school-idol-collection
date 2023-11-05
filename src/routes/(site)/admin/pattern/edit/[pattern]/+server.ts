import { error, json } from "@sveltejs/kit";
import type TranslationPattern from "$models/translation/pattern.js";
import type { RequestHandler } from "./$types.js";

export const POST: RequestHandler = (async ({ params, locals, request }) => {
	const DB = await locals.DB;

	const sentData = await request.json();
	const data = {
		regex: sentData.regex,
		template: sentData.template,
		triggers: sentData.triggers
			.map((t: boolean, i: number) => (t ? i : null))
			.reduce((acc: number, x: number) => (x === null ? acc : acc + (1 << x)), 0),
		groupTypes: sentData.groupTypeIds.reduce((str: string, x: number) => str + x.toString(), ""),
	};
	let pattern: TranslationPattern;

	if (params.pattern === "new") {
		pattern = await DB.m.TranslationPattern.create(data);
	} else {
		const loadedPattern = await DB.m.TranslationPattern.findByPk(params.pattern);
		if (loadedPattern === null) {
			throw error(404, { message: "This pattern does not exist." });
		}
		pattern = await loadedPattern.update(data);
	}

	return json({ success: true, patternId: pattern.id });
}) satisfies RequestHandler;
