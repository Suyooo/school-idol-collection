import type CardType from "$lib/enums/cardType.js";

export interface CardSchema {
    cardNo: string;
    cardType: CardType;
    x: number;
    y: number;
    z: number;
}