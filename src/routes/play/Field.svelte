<script lang="ts">
    import CardType from "$lib/enums/cardType.js";
    import type { CardSchema } from "$lib/play/schema.js";
    import CardObject from "./CardObject.svelte";
    import Deck from "./Deck.svelte";

    export let cards: Map<number, CardSchema>;
    export let memberDeck: string[];
    export let songDeck: string[];
    let nextId = 5;

    function addToDeck(
        useMemberDeck: boolean,
        useTop: boolean,
        cardNo: string
    ) {
        if (useMemberDeck) {
            if (useTop) memberDeck.push(cardNo);
            else memberDeck.unshift(cardNo);
            memberDeck = memberDeck;
        } else {
            if (useTop) songDeck.push(cardNo);
            else songDeck.unshift(cardNo);
            songDeck = songDeck;
        }
    }

    function removeFromDeck(useMemberDeck: boolean, useTop: boolean): string {
        let val: string;
        if (useMemberDeck) {
            if (useTop) val = memberDeck.pop()!;
            else val = memberDeck.shift()!;
            memberDeck = memberDeck;
        } else {
            if (useTop) val = songDeck.pop()!;
            else val = songDeck.shift()!;
            songDeck = songDeck;
        }
        return val!;
    }

    function addToField(
        cardNo: string,
        cardType: CardType,
        x: number,
        y: number
    ) {
        cards.set(nextId++, {
            cardNo,
            cardType,
            x,
            y,
            z: 0,
        });
        cards = cards;
    }

    function removeFromField(id: number): CardSchema {
        let ret = cards.get(id)!;
        cards.delete(id);
        cards = cards;
        return ret;
    }

    function deckToField(
        useMemberDeck: boolean,
        useTop: boolean,
        x: number,
        y: number
    ) {
        const cardNo = removeFromDeck(useMemberDeck, useTop);
        addToField(
            cardNo,
            useMemberDeck ? CardType.MEMBER : CardType.SONG,
            x,
            y
        );
    }

    function fieldToDeck(id: number, useTop: boolean) {
        const card = removeFromField(id);
        addToDeck(card.cardType === CardType.MEMBER, useTop, card.cardNo);
    }
</script>

<div class="field">
    {#each [...cards.entries()] as [id, card] (id)}
        <CardObject {id} {...card} />
    {/each}
    <Deck
        cardNos={memberDeck}
        cardType={CardType.MEMBER}
        x={450}
        y={50}
        on:reveal={(e) =>
            deckToField(true, e.detail.useTop, e.detail.x, e.detail.y)}
        on:return={(e) => fieldToDeck(e.detail.id, e.detail.useTop)}
    />
    <Deck
        cardNos={songDeck}
        cardType={CardType.SONG}
        x={350}
        y={50}
        on:reveal={(e) =>
            deckToField(false, e.detail.useTop, e.detail.x, e.detail.y)}
        on:return={(e) => fieldToDeck(e.detail.id, e.detail.useTop)}
    />
</div>

<style lang="postcss">
    .field {
        @apply absolute left-0 top-0 box-content border border-solid border-accent-500 -z-50;
        width: 720px;
        height: 360px;
    }
</style>
