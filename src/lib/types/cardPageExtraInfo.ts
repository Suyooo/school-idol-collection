import type Card from "$models/card/card.js";

export default interface CardPageExtraInfo<IncludeSameId extends boolean, IncludeNeighbors extends boolean> {
    cardSet: string;
    sameId: IncludeSameId extends true ? Card[] : never;
    neighbors: IncludeNeighbors extends true ? { [k in "prev" | "next"]: string | null } : never;
}