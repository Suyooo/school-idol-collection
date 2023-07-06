import type Card from "$models/card/card.js";
import type { ParseNodePrepared } from "$lib/format/format.js";

export default interface CardSearchResult<IncludeExplain extends boolean> {
    cards: Card[];
    pagination: {
        page: number;
        totalResults: number;
        pageSize: number;
    };
    queryUrl: string;
    queryExplain: IncludeExplain extends true ? ParseNodePrepared[][] : never;
}
