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
    uuid: string;
    fieldColor: string;
    deckColor: string;
    setListColor: string;
}

export interface GameSchema {
    players: PlayerSchema[];
    round: number;
    turnPlayerIdx: number;
}

export interface PlayerSchema {
    profile: Profile;
    matchUuid: string;
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

export interface ClientProfile {
    name: string;
    fieldColor: string;
    deckColor: string;
    setListColor: string;
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
    turnOrder: Readable<number[]>;
    round: Readable<number>;
    turnPlayerIdx: Readable<number>;
}

export interface ClientPlayerSchema {
    profile: Readable<ClientProfile>;
    matchUuid: string;
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