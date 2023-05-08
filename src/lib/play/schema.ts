import type CardType from "$lib/enums/cardType.js";
import type { Readable } from "svelte/store";

export interface ClientGameLogic {
    game: Readable<GameSchema>;
    handlers: GameLogicHandlers;
    requestStackToField: (target: StackTarget, side: StackSide, x: number, y: number) => void,
    requestFieldToStack: (id: number, side: StackSide) => void,
    requestShuffle: (target: StackTarget) => void;
}

export interface GameLogicHandlers {
    onShuffle: ((playerId: number, target: StackTarget) => void) | undefined;
}

export const enum StackTarget {
    DECK, SET_LIST
}

export const enum StackSide {
    TOP, BOTTOM
}

export interface GameSchema {
    players: PlayerSchema[];
    turn: number;
}

export interface PlayerSchema {
    name: string;
    livePoints: number;
    field: Map<number,CardSchema>;
    hand: string[];
    deck: string[];
    setList: string[];
}

export interface CardSchema {
    cardNo: string;
    cardType: CardType;
    position: {
        x: number;
        y: number;
        z: number;
    };
}