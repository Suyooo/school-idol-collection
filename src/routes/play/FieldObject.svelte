<script context="module" lang="ts">
    import CardType from "$lib/enums/cardType.js";
    import {
        StackTarget,
        type ClientGameLogic,
        type ClientGameSchema,
        type ClientPlayerSchema,
        type ClientCardSchema,
    } from "$lib/play/schema.js";
    import type { Readable } from "svelte/store";
    import CardObject from "./CardObject.svelte";
    import StackObject from "./StackObject.svelte";
</script>

<script lang="ts">
    export let logic: ClientGameLogic;
    export let playerId: number;
    export let deckComponent: StackObject;
    export let setListComponent: StackObject;
    
    let game: Readable<ClientGameSchema>, players: Readable<ClientPlayerSchema[]>, player: ClientPlayerSchema,
        field: Readable<Map<number, ClientCardSchema>>, deck: Readable<string[]>, setList: Readable<string[]>;
    $: game = logic.game;
    $: players = $game.players;
    $: player = $players[playerId];
    $: ({field, deck, setList} = player);
</script>

<div class="field">
    {#each [...$field.entries()] as [id, card] (id)}
        <CardObject {id} {...card} />
    {/each}
    <StackObject
        bind:this={deckComponent}
        cardNos={$deck}
        cardType={CardType.MEMBER}
        x={450}
        y={50}
        on:reveal={(e) =>
            logic.requestStackToField(
                StackTarget.DECK,
                e.detail.side,
                e.detail.x,
                e.detail.y
            )}
        on:return={(e) => logic.requestFieldToStack(e.detail.id, e.detail.side)}
        on:shuffle={() => logic.requestShuffle(StackTarget.DECK)}
    />
    <StackObject
        bind:this={setListComponent}
        cardNos={$setList}
        cardType={CardType.SONG}
        x={350}
        y={50}
        on:reveal={(e) =>
            logic.requestStackToField(
                StackTarget.SET_LIST,
                e.detail.side,
                e.detail.x,
                e.detail.y
            )}
        on:return={(e) => logic.requestFieldToStack(e.detail.id, e.detail.side)}
        on:shuffle={() => logic.requestShuffle(StackTarget.SET_LIST)}
    />
</div>

<style lang="postcss">
    .field {
        @apply absolute left-0 top-0 box-content border border-solid border-accent-500 -z-50;
        width: 720px;
        height: 360px;
    }
</style>
