import { couldBeEntryCardNo, entryCardNoToCanonical } from "$lib/utils/entry.js";
import { stringIsInteger } from "$lib/utils/string.js";

export async function getUrlForQuicksearchQuery(query: string): Promise<string> {
	if (couldBeEntryCardNo(query, false)) {
		// Card number - go directly to page
		return `/card/${entryCardNoToCanonical(query)}`;
	} else if (query.length <= 4 && stringIsInteger(query)) {
		// Only digits - probably a card ID, search for that
		const res = await fetch(`/json/search/id=${query}`);
		const cards = (await res.json()).cards;
		if (cards && cards.length > 0) {
			return `/card/${cards[0].cardNo}`;
		} else {
			// No cards with that ID, go to search page to show "no results" text
			return `/search/id=${query}`;
		}
	} else {
		// Name search
		return `/search/name=${query}`;
	}
}
