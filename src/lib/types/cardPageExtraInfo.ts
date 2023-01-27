import type Card from "$models/card/card.js";

export default interface CardPageExtraInfo {
    cardSet: string,
    sameId?: Card[],
    nextCardNo?: string | null,
    prevCardNo?: string | null
}