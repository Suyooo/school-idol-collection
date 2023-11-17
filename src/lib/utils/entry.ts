const entryCardNoRegex = /^(?:ex?15-?e\d{1,2}|(?:l?l?\d\d|ex?\d\d|pr?)-?\d{1,3})$/i;
const entryCardNoRegexNoDefaultSetName = /^(?:ex?15-?e\d{1,2}|(?:pr?-?0?69[ab])|(?:ll?\d\d|ex?\d\d|pr?)-?\d{1,3})$/i;
//const canonicalCardNoRegex = /(LL\d\d|EX\d\d|PR)-\d\d\d/;

export function couldBeEntryCardNo(test: string, allowDefaultSetName: boolean = true): boolean {
	return (allowDefaultSetName ? entryCardNoRegex : entryCardNoRegexNoDefaultSetName).test(test);
}

export function entryCardNoToCanonical(entry: string): string {
	entry = entry.toUpperCase();

	// fix prefix
	let prefixlength;
	if (entry.startsWith("P")) {
		if (!entry.startsWith("PR")) {
			entry = `PR${entry.substring(1)}`;
		}
		prefixlength = 2;
	} else if (entry.startsWith("E")) {
		if (!entry.startsWith("EX")) {
			entry = `EX${entry.substring(1)}`;
		}
		prefixlength = 4;
	} else {
		if (!entry.startsWith("L")) {
			entry = `LL${entry}`;
		} else if (!entry.startsWith("LL")) {
			entry = `LL${entry.substring(1)}`;
		}
		prefixlength = 4;
	}

	// add hyphen if needed
	if (entry.charAt(prefixlength) !== "-") {
		entry = `${entry.substring(0, prefixlength)}-${entry.substring(prefixlength)}`;
	}

	// add zero padding for in-set number if needed
	if (entry.length !== prefixlength + 4) {
		if (entry.charAt(prefixlength + 1) === "E") {
			entry = `${entry.substring(0, prefixlength + 2)}${entry.substring(prefixlength + 2).padStart(2, "0")}`;
		} else {
			entry = `${entry.substring(0, prefixlength + 1)}${entry.substring(prefixlength + 1).padStart(3, "0")}`;
		}
	}

	// PR-069A / PR-069B: additional zero needed if a postfixed A/B is there, default to A if not
	if (entry.startsWith("PR-069")) {
		if (entry.endsWith("A") || entry.endsWith("B")) {
			if (entry.length !== prefixlength + 5) {
				entry = `${entry.substring(0, prefixlength + 1)}0${entry.substring(prefixlength + 1)}`;
			}
		} else {
			entry += "A";
		}
	}

	return entry;
}
