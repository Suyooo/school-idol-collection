import { type Readable, type Writable, derived, get, readonly, writable } from "svelte/store";
import CardType from "$lib/enums/cardType.js";
import {
    type ClientFieldCardSchema,
    ClientGameLogic,
    type ClientGameSchema,
    type ClientPlayerSchema,
    type ClientProfile,
    type FieldCardSchema,
    type HandCardSchema,
    StackSide,
    StackType,
} from "$lib/play/schema.js";

export class LocalClientGameLogic extends ClientGameLogic {
    private storeCardFlips = new Map<number, Writable<boolean>>();
    private storeCardPositions = new Map<number, Writable<{ x: number; y: number; z: number }>>();
    private storePlayers = [
        {
            profile: writable<ClientProfile>({
                name: "Local Player",
                fieldColor: "skyblue",
                deckColor: "lightblue",
                setListColor: "lightpink",
            }),
            matchUuid: "local",
            livePoints: writable(0),
            field: writable(new Map<number, ClientFieldCardSchema>()),
            hand: writable<HandCardSchema[]>([]),
            deck: writable<string[]>([]),
            setList: writable<string[]>([]),
        },
    ];
    private storeGame = writable({
        players: writable<ClientPlayerSchema[]>(this.storePlayers),
        turnOrder: writable([0]),
        round: writable(1),
        turnPlayerIdx: writable(0),
    });

    game: Readable<ClientGameSchema> = derived(this.storeGame, (gameObj) => ({
        players: derived(gameObj.players, (playersObj) =>
            playersObj.map((playerObj) => ({
                profile: readonly(playerObj.profile),
                matchUuid: playerObj.matchUuid,
                livePoints: readonly(playerObj.livePoints),
                field: derived(
                    playerObj.field,
                    (fieldObj) =>
                        new Map(
                            [...fieldObj.entries()].map(([cardId, cardObj]) => [
                                cardId,
                                {
                                    ...cardObj,
                                    flipped: readonly(cardObj.flipped),
                                    position: readonly(cardObj.position),
                                },
                            ])
                        )
                ),
                hand: readonly(playerObj.hand),
                deck: readonly(playerObj.deck),
                setList: readonly(playerObj.setList),
            }))
        ),
        turnOrder: readonly(gameObj.turnOrder),
        round: readonly(gameObj.round),
        turnPlayerIdx: readonly(gameObj.turnPlayerIdx),
    }));
    clientPlayerId: number = 0;

    private nextId: number = 0;
    private nextZ: number = 10;

    constructor(profile: ClientProfile) {
        super();
        this.storePlayers[0].profile.set(profile);
        this.storePlayers[0].deck.set(["LL01-001", "LL01-002", "LL01-003"]);
        this.storePlayers[0].setList.set(["LL01-064", "LL01-065", "LL01-066"]);
        this.storePlayers[0].hand.set([
            { id: -2, cardNo: "LL01-004" },
            { id: -3, cardNo: "LL01-005" },
            { id: -4, cardNo: "LL01-006" },
        ]);
        this.storeCardFlips.set(-1, writable(false));
        this.storeCardPositions.set(-1, writable({ x: 10, y: 10, z: 10 }));
        this.storePlayers[0].field.update((m) => {
            m.set(-1, {
                cardNo: "LL01-063",
                cardType: CardType.MEMBER,
                flipped: this.storeCardFlips.get(-1)!,
                position: this.storeCardPositions.get(-1)!,
            });
            return m;
        });
    }

    private targetToProperty(target: StackType) {
        return target == StackType.DECK ? "deck" : "setList";
    }

    private addToStack(target: StackType, side: StackSide, cardNo: string) {
        const prop = this.targetToProperty(target);
        this.storePlayers[0][prop].update((arr) => {
            if (side === StackSide.TOP) arr.push(cardNo);
            else arr.unshift(cardNo);
            return arr;
        });
    }

    private removeFromStack(target: StackType, side: StackSide): string {
        let val: string;
        const prop = this.targetToProperty(target);
        this.storePlayers[0][prop].update((arr) => {
            if (side === StackSide.TOP) val = arr.pop()!;
            else val = arr.shift()!;
            return arr;
        });
        return val!;
    }

    private addToField(cardNo: string, cardType: CardType, x: number, y: number) {
        const thisId = this.nextId++;
        const thisFlip = writable(false);
        const thisPos = writable({ x, y, z: this.nextZ++ });
        const thisCard = {
            cardNo,
            cardType,
            flipped: thisFlip,
            position: thisPos,
        };

        this.storeCardPositions.set(thisId, thisPos);
        this.storeCardFlips.set(thisId, thisFlip);
        this.storePlayers[0].field.update((map) => {
            map.set(thisId, thisCard);
            return map;
        });
    }

    private removeFromField(id: number): FieldCardSchema {
        let ret: FieldCardSchema;
        this.storePlayers[0].field.update((map) => {
            const card = map.get(id)!;
            const flipped = get(card.flipped);
            const position = get(card.position);
            ret = { ...card, flipped, position };
            map.delete(id);
            return map;
        });
        this.storeCardFlips.delete(id);
        this.storeCardPositions.delete(id);
        return ret!;
    }

    private addToHand(cardNo: string, idx?: number) {
        const thisId = this.nextId++;
        this.storePlayers[0].hand.update((arr) => {
            if (idx === undefined) {
                arr.push({ id: thisId, cardNo });
            } else {
                arr.splice(idx, 0, { id: thisId, cardNo });
            }
            return arr;
        });
    }

    private removeFromHand(idx: number): string {
        let cardNo: string;
        this.storePlayers[0].hand.update((arr) => {
            cardNo = arr.splice(idx, 1)[0].cardNo;
            return arr;
        });
        return cardNo!;
    }

    requestStackToField(target: StackType, side: StackSide, x: number, y: number) {
        const cardNo = this.removeFromStack(target, side);
        this.addToField(cardNo, target === StackType.DECK ? CardType.MEMBER : CardType.SONG, x, y);
    }

    requestHandToField(idx: number, x: number, y: number) {
        const cardNo = this.removeFromHand(idx);
        this.addToField(cardNo, CardType.MEMBER, x, y);
    }

    requestFieldToStack(id: number, side: StackSide) {
        const card = this.removeFromField(id);
        this.addToStack(card.cardType === CardType.MEMBER ? StackType.DECK : StackType.SET_LIST, side, card.cardNo);
    }

    requestHandToStack(idx: number, side: StackSide) {
        const cardNo = this.removeFromHand(idx);
        this.addToStack(StackType.DECK, side, cardNo);
    }

    requestFieldToHand(id: number, idx?: number) {
        const card = this.removeFromField(id);
        this.addToHand(card.cardNo, idx);
    }

    requestStackToHand(side: StackSide) {
        const cardNo = this.removeFromStack(StackType.DECK, side);
        this.addToHand(cardNo);
    }

    requestShuffle(target: StackType) {
        const prop = this.targetToProperty(target);
        this.storePlayers[0][prop].update((arr) => this.shuffleArray(arr));
        if (this.handlers.onShuffle) this.handlers.onShuffle(0, target);
    }

    private shuffleArray(deck: string[]) {
        return deck
            .map((v) => ({ v, r: Math.random() }))
            .sort((a, b) => a.r - b.r)
            .map((e) => e.v);
    }

    requestFieldMove(id: number, x: number, y: number) {
        this.storeCardPositions.get(id)!.update((pos) => {
            pos.x = x;
            pos.y = y;
            pos.z = this.nextZ++;
            return pos;
        });
    }

    requestFieldFlip(id: number) {
        this.storeCardFlips.get(id)!.update((flip) => !flip);
    }

    requestHandMove(idx: number, newIdx: number) {
        this.addToHand(this.removeFromHand(idx), newIdx);
    }

    requestLPUpdate(delta: number) {
        this.storePlayers[0].livePoints.update((lp) => Math.max(lp + delta, 0));
    }
}
