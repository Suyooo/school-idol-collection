import type CardType from "$lib/enums/cardType.js";
import type { Readable } from "svelte/store";

export const enum StackType {
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

    abstract requestStackToField(target: StackType, side: StackSide, x: number, y: number): void;
    abstract requestHandToField(idx: number, x: number, y: number): void;
    abstract requestFieldToStack(id: number, side: StackSide): void;
    abstract requestHandToStack(idx: number, side: StackSide): void;
    abstract requestFieldToHand(id: number, idx?: number): void;
    abstract requestStackToHand(side: StackSide): void;
    abstract requestShuffle(target: StackType): void;
    abstract requestFieldMove(id: number, x: number, y: number): void;
    abstract requestHandMove(idx: number, newIdx: number): void;
    abstract requestLPUpdate(delta: number): void;
}

export interface ClientGameLogicHandlers {
    onShuffle: ((playerId: number, target: StackType) => void) | undefined;
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