import type Card from "$models/card/card.js";
import type Annotation from "$models/skill/annotation.js";
import type { AttributeID } from "$lib/enums/attribute.js";
import Language from "$lib/enums/language.js";
import EnumError from "$lib/errors/enumError.js";
import SearchFilter, {
	SearchFilterCardID,
	SearchFilterCostume,
	SearchFilterMemory,
	SearchFilterName,
	SearchFilterSkill,
	SearchFilterSong,
} from "$lib/search/filters.js";

type Key = "card" | "song" | "mem" | "costume" | "skilltext";
export type AnnotationID = 0 | 1 | 2 | 3 | 4;

export default class AnnotationEnum {
	readonly id: AnnotationID;
	readonly key: Key;
	readonly getSearchFilters: (parameter: string) => SearchFilter[];
	private readonly getLinkTargetOverride?: (parameter: string, cards: Card[]) => string;
	private readonly getLinkLabelOverride?: (parameter: string, cards: Card[], lang: Language) => string;

	private static readonly idMap: Map<AnnotationID, AnnotationEnum> = new Map();
	private static readonly keyMap: Map<Key, AnnotationEnum> = new Map();
	static readonly all: AnnotationEnum[] = [];
	static readonly allShowBacklink: AnnotationEnum[] = [];

	private constructor(
		id: AnnotationID,
		key: Key,
		showBacklink: boolean,
		getSearchFilters: (parameter: string) => SearchFilter[],
		getLinkTargetOverride?: (parameter: string, cards: Card[]) => string,
		getLinkLabelOverride?: (parameter: string, cards: Card[], lang: Language) => string
	) {
		this.id = id;
		this.key = key;
		this.getSearchFilters = getSearchFilters;
		this.getLinkTargetOverride = getLinkTargetOverride;
		this.getLinkLabelOverride = getLinkLabelOverride;

		AnnotationEnum.all.push(this);
		AnnotationEnum.idMap.set(this.id, this);
		AnnotationEnum.keyMap.set(this.key, this);
		if (showBacklink) {
			AnnotationEnum.allShowBacklink.push(this);
		}
	}

	getLinkLabel(parameter: string, cards: Card[], lang: Language): string {
		if (this.getLinkLabelOverride !== undefined) {
			return this.getLinkLabelOverride(parameter, cards, lang);
		} else {
			return parameter;
		}
	}

	getLinkTarget(parameter: string, cards: Card[]): string {
		if (this.getLinkTargetOverride !== undefined) {
			return this.getLinkTargetOverride(parameter, cards);
		} else if (cards.length === 1) {
			return "/card/" + cards[0].cardNo;
		} else {
			return (
				"/search/" +
				this.getSearchFilters(parameter)
					.map((f) => f.getUrlPart())
					.join("/")
			);
		}
	}

	static CARD = new AnnotationEnum(
		0,
		"card",
		true,
		(parameter) => [new SearchFilterCardID(parameter)],
		(_parameter, cards) => "/card/" + cards[0].cardNo,
		(_parameter, cards, lang: Language) => {
			let name;
			if (lang === Language.ENG) {
				name = (cards[0].nameEng ?? cards[0].nameJpn).split(" ")[0];
			} else {
				name = cards[0].nameJpn.split(" ")[1];
			}
			return cards[0].id + " " + name;
		}
	);
	static SONG = new AnnotationEnum(1, "song", true, (parameter) => [
		new SearchFilterSong(),
		new SearchFilterName(parameter),
	]);
	static MEM = new AnnotationEnum(2, "mem", true, (parameter) => [
		new SearchFilterMemory(),
		new SearchFilterName(parameter),
	]);
	static COSTUME = new AnnotationEnum(3, "costume", true, (parameter) => [new SearchFilterCostume(parameter)]);
	static SKILLTEXT = new AnnotationEnum(4, "skilltext", false, (parameter) => [new SearchFilterSkill(parameter)]);

	static fromId(n: number): AnnotationEnum {
		const a = AnnotationEnum.idMap.get(<AttributeID>n);
		if (a === undefined) throw new EnumError("Annotation", "ID", n);
		else return a;
	}

	static fromKey(s: string): AnnotationEnum {
		const a = AnnotationEnum.keyMap.get(<Key>s);
		if (a === undefined) throw new EnumError("Annotation", "key", s);
		else return a;
	}

	static getAnnotationString(ann: Annotation) {
		return "{{" + AnnotationEnum.fromId(ann.type).key + ":" + ann.parameter + "}}";
	}
}
