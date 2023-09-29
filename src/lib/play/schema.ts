import type { Readable } from "svelte/store";
import type CardType from "$lib/enums/cardType.js";
import type { Profile } from "./profile.js";

export const enum StackType {
    DECK,
    SET_LIST,
}

export const enum StackSide {
    TOP,
    BOTTOM,
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
    field: Map<number, FieldCardSchema>;
    groups: Map<number, FieldGroupSchema>;
    hand: HandCardSchema[];
    deck: string[];
    setList: string[];
}

export interface FieldCardSchema {
    cardNo: string;
    cardType: CardType;
    flipped: boolean;
    position: {
        x: number;
        y: number;
        z: number;
    };
    idolizedBaseCardNo: string | undefined;
}

export interface FieldGroupSchema {
    cards: Map<number, FieldCardSchema>;
    position: {
        x: number;
        y: number;
    };
}

export interface HandCardSchema {
    id: number;
    cardNo: string;
}

export type ClientProfile = Omit<Profile, "uuid">;

export abstract class ClientGameLogic {
    abstract game: Readable<ClientGameSchema>;
    handlers: ClientGameLogicHandlers = {
        onShuffle: undefined,
    };
    abstract clientPlayerId: number;

    abstract requestStackToField(target: StackType, side: StackSide, x: number, y: number): void;
    abstract requestHandToField(idx: number, x: number, y: number): void;
    abstract requestFieldToStack(id: number, side: StackSide): void;
    abstract requestHandToStack(idx: number, side: StackSide): void;
    abstract requestFieldToHand(id: number, idx?: number): void;
    abstract requestStackToHand(side: StackSide): void;
    abstract requestScout(): void;
    abstract requestShuffle(target: StackType): void;
    abstract requestFieldMove(id: number, x: number, y: number): void;
    abstract requestFieldFlip(id: number): void;
    abstract requestHandMove(idx: number, newIdx: number): void;
    abstract requestGroupCreate(x: number, y: number, cards: { id: number; x: number; y: number; z: number }[]): void;
    abstract requestGroupMove(id: number, x: number, y: number): void;
    abstract requestGroupDestroy(id: number): void;
    abstract requestLPUpdate(delta: number): void;
    abstract requestIdolizeFromField(idBaseCard: number, idIdolizeCard: number): void;
    abstract requestIdolizeFromHand(idBaseCard: number, idxIdolizeCard: number): void;
    abstract requestIdolizeUndo(id: number): void;
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
    deckUuid: string;
    livePoints: Readable<number>;
    field: Readable<Map<number, ClientFieldCardSchema>>;
    groups: Readable<Map<number, ClientFieldGroupSchema>>;
    hand: Readable<HandCardSchema[]>;
    deck: Readable<string[]>;
    setList: Readable<string[]>;
}

export interface ClientFieldCardSchema {
    cardNo: string;
    cardType: CardType;
    flipped: Readable<boolean>;
    position: Readable<{
        x: number;
        y: number;
        z: number;
    }>;
    idolizedBaseCardNo: string | undefined;
}

export interface ClientFieldGroupSchema {
    cards: Map<number, ClientFieldCardSchema>;
    position: Readable<{
        x: number;
        y: number;
    }>;
}
