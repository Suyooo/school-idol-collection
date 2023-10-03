import Language from "$l/enums/language.js";
import { type ParseNodePrepared, parseSkillToNodes } from "$l/format/format.js";
import type Card from "$m/card/card.js";

export default interface CardSearchResult<IsPreparsed extends boolean> {
    cards: Card[];
    pagination: {
        page: number;
        totalResults: number;
        pageSize: number;
    };
    queryUrl: string;
    queryExplain: IsPreparsed extends true ? ParseNodePrepared[][] : string[];
}

export function addPreparse(res: CardSearchResult<false>): CardSearchResult<true> {
    const newRes = res as CardSearchResult<boolean>;
    newRes.queryExplain = res.queryExplain.map((f) => parseSkillToNodes(f, Language.ENG, true));
    return newRes as CardSearchResult<true>;
}
