<script context="module" lang="ts">
    import CardType from "$lib/enums/cardType.js";
    import {
        StackTarget,
        type ClientGameLogic,
        type ClientGameSchema,
        type ClientPlayerSchema,
        type ClientCardSchema,
        type Profile,
    } from "$lib/play/schema.js";
    import type { Readable } from "svelte/store";
    import CardObject from "./CardObject.svelte";
    import StackObject from "./StackObject.svelte";
</script>

<script lang="ts">
    import Minus from "$lib/style/icons/Minus.svelte";
import Plus from "$lib/style/icons/Plus.svelte";

    export let logic: ClientGameLogic;
    export let playerId: number;
    export let isThisPlayer: boolean;
    export let deckComponent: StackObject;
    export let setListComponent: StackObject;

    let game: Readable<ClientGameSchema>,
        players: Readable<ClientPlayerSchema[]>,
        player: ClientPlayerSchema,
        profile: Readable<Profile>,
        livePoints: Readable<number>,
        field: Readable<Map<number, ClientCardSchema>>,
        deck: Readable<string[]>,
        setList: Readable<string[]>;
    $: game = logic.game;
    $: players = $game.players;
    $: player = $players[playerId];
    $: ({ profile, livePoints, field, deck, setList } = player);
</script>

<div class="field" style:--player-color={$profile.fieldColor}>
    <div class="background">
        <div class="area deck"></div>
        <div class="area setlist"></div>
        <div class="line live"></div>
        <div class="line info"></div>
        <div class="name">{$profile.name}</div>
        <div class="livepoints">{$livePoints}</div>
        <div class="livepointsbelow">
            {#if isThisPlayer}
                <button><Plus/></button>
                <button><Minus/></button>
            {:else}
                Live Points
            {/if}
        </div>
    </div>
    {#each [...$field.entries()] as [id, card] (id)}
        <CardObject
            {id}
            {...card}
            on:cardmove={(e) =>
                logic.requestMove(e.detail.id, e.detail.x, e.detail.y)}
        />
    {/each}
    <StackObject
        bind:this={deckComponent}
        cardNos={$deck}
        cardType={CardType.MEMBER}
        x={620}
        y={253}
        color={$profile.deckColor}
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
        x={35}
        y={279}
        color={$profile.setListColor}
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
        @apply absolute left-0 top-0 box-content border border-solid z-play-field;
        width: 720px;
        height: 360px;
        border-color: var(--player-color);

        & .background {
            @apply select-none pointer-events-none;

            & .area {
                @apply absolute border border-solid z-play-field box-content rounded-md;
                border-color: var(--player-color);

                &.setlist {
                    left: 30px;
                    right: 112px;
                    height: 73.5px;
                    bottom: 10px;

                    &:before {
                        content: "Set List";
                        left: -1.5rem;
                        top: 0px;
                        bottom: 0px;
                        writing-mode: vertical-rl;
                        transform: rotate(180deg);
                    }
                }

                &.deck {
                    right: 30px;
                    width: 73.5px;
                    bottom: 10px;
                    height: 100px;

                    &:before {
                        content: "Deck";
                        right: -1.5rem;
                        top: 0px;
                        bottom: 0px;
                        writing-mode: vertical-rl;
                    }
                }

                &:before {
                    @apply absolute text-sm font-bold text-center uppercase tracking-widest;
                    color: var(--player-color);
                }
            }

            & .line {
                @apply absolute border-l border-solid z-play-field;
                width: 1px;
                top: 10px;
                bottom: 96px;
                border-color: var(--player-color);

                &.live {
                    left: 280px;
                }
                &.info {
                    left: 60px;
                }
            }

            & .name {
                @apply absolute text-white text-2xl font-bold overflow-hidden text-ellipsis text-center z-play-ui;
                left: 0px;
                width: 60px;
                top: 60px;
                bottom: 96px;
                line-height: 60px;
                writing-mode: vertical-rl;
                transform: rotate(180deg);
            }

            & .livepoints {
                @apply absolute text-white text-3xl font-bold text-center z-play-ui;
                left: 0px;
                width: 60px;
                top: 5px;
            }

            & .livepointsbelow {
                @apply absolute flex items-center justify-around text-xs text-center uppercase font-normal tracking-tighter leading-none z-play-ui pointer-events-auto;
                left: 0px;
                width: 60px;
                top: 35px;
                height: 25px;

                & button {
                    @apply flex items-center justify-center bg-accent-500 text-white rounded-full;
                }
            }
        }
    }
</style>
