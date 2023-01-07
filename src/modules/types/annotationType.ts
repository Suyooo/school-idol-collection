import type {Attributes, FindOptions} from "sequelize";
import type Card from "$models/card/card";
import searchQuery from "../search/query";
import SearchFilter, {
    SearchFilterCardID, SearchFilterCostume,
    SearchFilterMemory,
    SearchFilterName, SearchFilterSkill,
    SearchFilterSong
} from "../search/options";
import {cardTitle} from "$utils/conventions";

export type AnnotationTypeKey = "card" | "song" | "mem" | "costume" | "skilltext";
export type AnnotationTypeID = 0 | 1 | 2 | 3 | 4;
type MappedValue = AnnotationTypeID | AnnotationTypeKey;

export default class AnnotationType {
    readonly id: AnnotationTypeID;
    readonly key: AnnotationTypeKey;
    readonly getSearchFilters: (parameter: string) => SearchFilter[];
    private readonly getLinkTargetOverride?: (parameter: string, cards: Card[]) => string;
    private readonly getLinkLabelOverride?: (parameter: string, cards: Card[]) => string;

    private constructor(map: Map<MappedValue, AnnotationType>,
                        id: AnnotationTypeID, key: AnnotationTypeKey,
                        getSearchFilters: (parameter: string) => SearchFilter[],
                        getLinkTargetOverride?: (parameter: string, cards: Card[]) => string,
                        getLinkLabelOverride?: (parameter: string, cards: Card[]) => string) {
        this.id = id;
        this.key = key;

        map.set(id, this);
        map.set(key, this);

        this.getSearchFilters = getSearchFilters;
        this.getLinkTargetOverride = getLinkTargetOverride;
        this.getLinkLabelOverride = getLinkLabelOverride;
    }

    async getCards(parameter: string, options?: FindOptions<Attributes<Card>>): Promise<Card[]> {
        return await searchQuery(this.getSearchFilters(parameter), "cardNoOnly", options);
    }

    getLinkLabel(parameter: string, cards: Card[]): string {
        if (this.getLinkLabelOverride !== undefined) {
            return this.getLinkLabelOverride(parameter, cards);
        } else {
            return parameter;
        }
    }

    getLinkTarget(parameter: string, cards: Card[]): string {
        if (this.getLinkTargetOverride !== undefined) {
            return this.getLinkTargetOverride(parameter, cards);
        } else if (cards.length === 1) {
            return "/card/" + cards[0].cardNo + "/";
        } else {
            return "/search/" + this.getSearchFilters(parameter).map(f => f.getFilterString()).join("/") + "/";
        }
    }

    private static readonly map = (() => {
        const map = new Map<MappedValue, AnnotationType>();

        new AnnotationType(map, 0, "card",
            (parameter) => {
                const f = new SearchFilterCardID();
                f.param = parameter;
                return [f];
            },
            (_parameter, cards) => "/card/" + cards[0].cardNo + "/",
            (_parameter, cards) => cardTitle(cards[0]));
        new AnnotationType(map, 1, "song",
            (parameter) => {
                const f = new SearchFilterName();
                f.param = parameter;
                return [new SearchFilterSong(), f];
            });
        new AnnotationType(map, 2, "mem",
            (parameter) => {
                const f = new SearchFilterName();
                f.param = parameter;
                return [new SearchFilterMemory(), f];
            });
        new AnnotationType(map, 3, "costume",
            (parameter) => {
                const f = new SearchFilterCostume();
                f.param = parameter;
                return [f];
            });
        new AnnotationType(map, 4, "skilltext",
            (parameter) => {
                const f = new SearchFilterSkill();
                f.param = parameter;
                return [f];
            });

        return map;
    })();

    static get(key: MappedValue): AnnotationType {
        return AnnotationType.map.get(key)!;
    }
}