import { type Readable, type Writable, derived, get, readonly, writable } from "svelte/store";
import CardType from "$l/enums/cardType.js";
import {
    type ClientFieldCardSchema,
    type ClientFieldGroupSchema,
    ClientGameLogic,
    type ClientGameSchema,
    type ClientPlayerSchema,
    type ClientProfile,
    type FieldCardSchema,
    type HandCardSchema,
    StackSide,
    StackType,
} from "$l/play/schema.js";
import { shuffleArray } from "$l/utils/array.js";
import { mapGet } from "$l/utils/map.js";

export class LocalClientGameLogic extends ClientGameLogic {
    private storeCardFlips = new Map<number, Writable<boolean>>();
    private storeCardPositions = new Map<number, Writable<{ x: number; y: number; z: number }>>();
    private storeGroupPositions = new Map<number, Writable<{ x: number; y: number }>>();
    private storePlayers = [
        {
            profile: writable<ClientProfile>({
                name: "Player",
                fieldColor: "skyblue",
                deckColor: "lightblue",
                setListColor: "lightpink",
            }),
            deckUuid: "local",
            livePoints: writable(0),
            field: writable(new Map<number, ClientFieldCardSchema>()),
            groups: writable(new Map<number, ClientFieldGroupSchema>()),
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
                deckUuid: playerObj.deckUuid,
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
                groups: derived(
                    playerObj.groups,
                    (groupsObj) =>
                        new Map(
                            [...groupsObj.entries()].map(([groupId, groupObj]) => [
                                groupId,
                                {
                                    ...groupObj,
                                    position: readonly(groupObj.position),
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
        // TODO: REMOVE TEST DECK
        this.storePlayers[0].profile.set(profile);
        this.storePlayers[0].deck.set([
            "LL15-051",
            "LL04-039",
            "LL09-039",
            "EX09-060",
            "LL12-048",
            "LL10-053",
            "LL14-048",
            "EX09-022",
            "LL07-035",
            "LL07-031",
            "EX09-021",
            "LL04-030",
            "EX09-013",
            "EX09-017",
            "EX09-026",
            "EX09-004",
            "LL11-033",
            "EX09-012",
            "EX09-008",
        ]);
        this.storePlayers[0].setList.set(["LL09-055", "LL07-060", "LL04-058", "LL05-061", "EX09-033", "EX09-031"]);

        this.storeCardFlips.set(-1, writable(false));
        this.storeCardPositions.set(-1, writable({ x: 410, y: 60, z: 9 }));
        this.storePlayers[0].field.update((m) => {
            m.set(-1, {
                cardNo: "LL10-084",
                cardType: CardType.MEMBER,
                flipped: mapGet(this.storeCardFlips, -1),
                position: mapGet(this.storeCardPositions, -1),
                idolizedBaseCardNo: undefined,
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

    private removeFromStack(target: StackType, side: StackSide): string | undefined {
        let val: string | undefined;
        const prop = this.targetToProperty(target);
        this.storePlayers[0][prop].update((arr) => {
            if (side === StackSide.TOP) val = arr.pop();
            else val = arr.shift();
            return arr;
        });
        return val;
    }

    private addToField(
        cardNo: string,
        cardType: CardType,
        x: number,
        y: number,
        flipped: boolean = false,
        idolizedBaseCardNo?: string
    ) {
        const thisId = this.nextId++;
        const thisFlip = writable(flipped);
        const thisPos = writable({ x, y, z: this.nextZ++ });
        const thisCard = {
            cardNo,
            cardType,
            flipped: thisFlip,
            position: thisPos,
            idolizedBaseCardNo,
        };

        this.storeCardPositions.set(thisId, thisPos);
        this.storeCardFlips.set(thisId, thisFlip);
        this.storePlayers[0].field.update((map) => {
            map.set(thisId, thisCard);
            return map;
        });
    }

    private removeFromField(id: number): FieldCardSchema | undefined {
        let ret: FieldCardSchema | undefined = undefined;
        this.storePlayers[0].field.update((map) => {
            const card = map.get(id);
            if (card === undefined) {
                return map;
            }

            const flipped = get(card.flipped);
            const position = get(card.position);
            ret = { ...card, flipped, position };
            map.delete(id);
            return map;
        });
        this.storeCardFlips.delete(id);
        this.storeCardPositions.delete(id);
        return ret;
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

    private removeFromHand(idx: number): string | undefined {
        let cardNo: string | undefined;
        this.storePlayers[0].hand.update((arr) => {
            cardNo = arr.splice(idx, 1)[0]?.cardNo;
            return arr;
        });
        return cardNo;
    }

    requestStackToField(target: StackType, side: StackSide, x: number, y: number) {
        const cardNo = this.removeFromStack(target, side);
        if (cardNo === undefined) return;
        this.addToField(cardNo, target === StackType.DECK ? CardType.MEMBER : CardType.SONG, x, y);
    }

    requestHandToField(idx: number, x: number, y: number) {
        const cardNo = this.removeFromHand(idx);
        if (cardNo === undefined) return;
        this.addToField(cardNo, CardType.MEMBER, x, y);
    }

    requestFieldToStack(id: number, side: StackSide) {
        const card = this.removeFromField(id);
        if (card === undefined) return;
        this.addToStack(card.cardType === CardType.MEMBER ? StackType.DECK : StackType.SET_LIST, side, card.cardNo);
    }

    requestHandToStack(idx: number, side: StackSide) {
        const cardNo = this.removeFromHand(idx);
        if (cardNo === undefined) return;
        this.addToStack(StackType.DECK, side, cardNo);
    }

    requestFieldToHand(id: number, idx?: number) {
        const card = this.removeFromField(id);
        if (card === undefined) return;
        this.addToHand(card.cardNo, idx);
    }

    requestStackToHand(side: StackSide) {
        const cardNo = this.removeFromStack(StackType.DECK, side);
        if (cardNo === undefined) return;
        this.addToHand(cardNo);
    }

    requestScout() {
        let toDraw = Math.max(4 - get(this.storePlayers[0].hand).length, 0);
        for (; toDraw > 0; toDraw--) {
            const cardNo = this.removeFromStack(StackType.DECK, StackSide.TOP);
            if (cardNo === undefined) break;
            this.addToHand(cardNo);
        }
    }

    requestShuffle(target: StackType) {
        const prop = this.targetToProperty(target);
        this.storePlayers[0][prop].update((arr) => shuffleArray(arr));
        if (this.handlers.onShuffle) this.handlers.onShuffle(0, target);
    }

    requestFieldMove(id: number, x: number, y: number) {
        mapGet(this.storeCardPositions, id).update((pos) => {
            pos.x = x;
            pos.y = y;
            pos.z = this.nextZ++;
            return pos;
        });
    }

    requestFieldFlip(id: number) {
        mapGet(this.storeCardFlips, id).update((flip) => !flip);
    }

    requestHandMove(idx: number, newIdx: number) {
        const cardNo = this.removeFromHand(idx);
        if (cardNo === undefined) return;
        this.addToHand(cardNo, newIdx);
    }

    requestGroupCreate(x: number, y: number, cards: { id: number; x: number; y: number; z: number }[]): void {
        const groupId = this.nextId++;
        const groupPosStore = writable({ x, y });
        this.storeGroupPositions.set(groupId, groupPosStore);
        this.storePlayers[0].groups.update((groupMap) => {
            const groupCards = new Map<number, ClientFieldCardSchema>();
            this.storePlayers[0].field.update((fieldMap) => {
                for (const { id: cardId, x: cardX, y: cardY, z: cardZ } of cards) {
                    mapGet(this.storeCardPositions, cardId).update((pos) => {
                        pos.x = cardX;
                        pos.y = cardY;
                        pos.z = cardZ;
                        return pos;
                    });
                    groupCards.set(cardId, mapGet(fieldMap, cardId));
                    fieldMap.delete(cardId);
                }
                return fieldMap;
            });

            groupMap.set(groupId, {
                cards: groupCards,
                position: groupPosStore,
            });
            return groupMap;
        });
    }

    requestGroupMove(id: number, x: number, y: number) {
        mapGet(this.storeGroupPositions, id).update((pos) => {
            pos.x = x;
            pos.y = y;
            return pos;
        });
    }

    requestGroupDestroy(id: number): void {
        this.storePlayers[0].groups.update((groupMap) => {
            const group = mapGet(groupMap, id);
            const groupPos = get(group.position);
            this.storePlayers[0].field.update((fieldMap) => {
                let maxZ = 0;
                for (const [cardId, card] of group.cards.entries()) {
                    mapGet(this.storeCardPositions, cardId).update((pos) => {
                        pos.x += groupPos.x;
                        pos.y += groupPos.y;
                        pos.z += this.nextZ + 1;
                        maxZ = Math.max(maxZ, this.nextZ);
                        return pos;
                    });
                    fieldMap.set(cardId, card);
                }
                this.nextZ = maxZ + 1;
                return fieldMap;
            });
            groupMap.delete(id);
            return groupMap;
        });
        this.storeGroupPositions.delete(id);
    }

    requestLPUpdate(delta: number) {
        this.storePlayers[0].livePoints.update((lp) => Math.max(lp + delta, 0));
    }

    requestIdolizeFromField(idBaseCard: number, idIdolizeCard: number): void {
        const baseCard = this.removeFromField(idBaseCard);
        const idolizeCard = this.removeFromField(idIdolizeCard);
        if (baseCard === undefined || idolizeCard === undefined) return;
        this.addToField(
            idolizeCard.cardNo,
            CardType.MEMBER,
            baseCard.position.x,
            baseCard.position.y,
            false,
            baseCard.cardNo
        );
    }

    requestIdolizeFromHand(idBaseCard: number, idxIdolizeCard: number): void {
        const baseCard = this.removeFromField(idBaseCard);
        const idolizeCardNo = this.removeFromHand(idxIdolizeCard);
        if (baseCard === undefined || idolizeCardNo === undefined) return;
        this.addToField(
            idolizeCardNo,
            CardType.MEMBER,
            baseCard.position.x,
            baseCard.position.y,
            false,
            baseCard.cardNo
        );
    }

    requestIdolizeUndo(id: number): void {
        const card = this.removeFromField(id);
        if (card === undefined) return;
        this.addToField(card.idolizedBaseCardNo!, CardType.MEMBER, card.position.x, card.position.y);
        this.addToField(card.cardNo, CardType.MEMBER, card.position.x + 10, card.position.y);
    }

    requestNextTurn(): void {
        get(this.storeGame).round.update((r) => r + 1);
    }
}
