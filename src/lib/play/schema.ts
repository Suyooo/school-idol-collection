import type CardType from "$lib/enums/cardType.js";
import type { Readable } from "svelte/store";

export const enum StackTarget {
    DECK, SET_LIST
}

export const enum StackSide {
    TOP, BOTTOM
}

export interface Profile {
    name: string;
    fieldColor: string;
    deckColor: string;
    setListColor: string;
}

export interface GameSchema {
    players: PlayerSchema[];
    turn: number;
}

export interface PlayerSchema {
    profile: Profile;
    livePoints: number;
    field: Map<number, CardSchema>;
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

export abstract class ClientGameLogic {
    abstract game: Readable<ClientGameSchema>;
    handlers: ClientGameLogicHandlers = {
        onShuffle: undefined
    };

    abstract requestStackToField(target: StackTarget, side: StackSide, x: number, y: number): void;
    abstract requestFieldToStack(id: number, side: StackSide): void;
    abstract requestShuffle(target: StackTarget): void;
    abstract requestMove(id: number, x: number, y: number): void;
}

export interface ClientGameLogicHandlers {
    onShuffle: ((playerId: number, target: StackTarget) => void) | undefined;
}

export interface ClientGameSchema {
    players: Readable<ClientPlayerSchema[]>;
    turn: Readable<number>;
}

export interface ClientPlayerSchema {
    profile: Readable<Profile>;
    livePoints: Readable<number>;
    field: Readable<Map<number, ClientCardSchema>>;
    hand: Readable<string[]>;
    deck: Readable<string[]>;
    setList: Readable<string[]>;
}

export interface ClientCardSchema {
    cardNo: string;
    cardType: CardType;
    position: Readable<{
        x: number;
        y: number;
        z: number;
    }>;
}