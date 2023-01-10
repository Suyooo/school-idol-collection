import type Card from "$models/card/card.js";

export default interface CardPageExtraInfo {
    sameId: Card[],
    nextCardNo: string | null,
    prevCardNo: string | null
}