import CardType from "$lib/enums/cardType.js";
import { readable, type Readable, type Subscriber } from "svelte/store";
import { StackTarget, type ClientGameLogic, type GameSchema, type GameLogicHandlers, StackSide, type CardSchema, type PlayerSchema } from "../schema.js";

export class LocalClientGameLogic implements ClientGameLogic {
    private gameStoreSetFunc: Subscriber<GameSchema> | undefined;
    private gameObj: GameSchema = {
        players: [
            {
                name: "Local Player",
                livePoints: 0,
                field: new Map(),
                hand: [],
                deck: ["LL01-001", "LL01-002", "LL01-003"],
                setList: ["LL01-064", "LL01-065", "LL01-066"]
            }
        ],
        turn: 0,
    };

    game: Readable<GameSchema> = readable(this.gameObj, (setFunc) => {
        this.gameStoreSetFunc = setFunc;
        return () => this.gameStoreSetFunc = undefined;
    });
    handlers: GameLogicHandlers = {
        onShuffle: undefined
    };

    private nextId: number = 0;

    constructor(name: string) {
        this.gameObj.players[0].name = name;
    }

    private targetToProperty(target: StackTarget) {
        return target == StackTarget.DECK ? "deck" : "setList";
    }

    private notifyChanged() {
        if (this.gameStoreSetFunc) this.gameStoreSetFunc(this.gameObj);
    }

    private addToStack(target: StackTarget, side: StackSide, cardNo: string) {
        const prop = this.targetToProperty(target);
        if (side === StackSide.TOP) this.gameObj.players[0][prop].push(cardNo);
        else this.gameObj.players[0][prop].unshift(cardNo);
    }

    private removeFromStack(target: StackTarget, side: StackSide): string {
        let val: string;
        const prop = this.targetToProperty(target);
        if (side === StackSide.TOP) val = this.gameObj.players[0][prop].pop()!;
        else val = this.gameObj.players[0][prop].shift()!;
        return val;
    }

    private addToField(cardNo: string, cardType: CardType, x: number, y: number) {
        this.gameObj.players[0].field.set(this.nextId++, {
            cardNo,
            cardType,
            position: {
                x,
                y,
                z: 0,
            }
        });
    }

    private removeFromField(id: number): CardSchema {
        let ret = this.gameObj.players[0].field.get(id)!;
        this.gameObj.players[0].field.delete(id);
        return ret;
    }

    requestStackToField(target: StackTarget, side: StackSide, x: number, y: number) {
        const cardNo = this.removeFromStack(target, side);
        this.addToField(
            cardNo,
            target === StackTarget.DECK ? CardType.MEMBER : CardType.SONG,
            x,
            y
        );
        this.notifyChanged();
    }

    requestFieldToStack(id: number, side: StackSide) {
        const card = this.removeFromField(id);
        this.addToStack(card.cardType === CardType.MEMBER ? StackTarget.DECK : StackTarget.SET_LIST, side, card.cardNo);
        this.notifyChanged();
    }

    requestShuffle(target: StackTarget) {
        const prop = this.targetToProperty(target);
        this.gameObj.players[0][prop] = this.shuffleArray(this.gameObj.players[0][prop]);
        if (this.handlers.onShuffle) this.handlers.onShuffle(0, target);
        this.notifyChanged();
    }

    private shuffleArray(deck: string[]) {
        return deck
            .map((v) => ({ v, r: Math.random() }))
            .sort((a, b) => a.r - b.r)
            .map((e) => e.v);
    }
}