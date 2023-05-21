<script context="module" lang="ts">
    import { getContext } from "svelte";
    import type { Readable } from "svelte/store";
    import interact from "@interactjs/interact/index";
    import "@interactjs/actions/drop";
    import CardType from "$lib/enums/cardType.js";
    import {
        type ClientFieldCardSchema,
        type ClientFieldGroupSchema,
        type ClientGameLogic,
        type ClientGameSchema,
        type ClientPlayerSchema,
        type ClientProfile,
        StackType,
    } from "$lib/play/schema.js";
    import Minus from "$lib/style/icons/Minus.svelte";
    import Plus from "$lib/style/icons/Plus.svelte";
    import FieldCardObject from "./FieldCardObject.svelte";
    import FieldGroupObject from "./FieldGroupObject.svelte";
    import StackObject from "./StackObject.svelte";
</script>

<script lang="ts">
    export let playerIdx: number;
    export let isClient: boolean;
    export let fieldElement: HTMLDivElement;
    export let deckComponent: StackObject;
    export let setListComponent: StackObject;
    const logic: ClientGameLogic = getContext("logic");

    let game: Readable<ClientGameSchema>,
        players: Readable<ClientPlayerSchema[]>,
        player: ClientPlayerSchema,
        profile: Readable<ClientProfile>,
        livePoints: Readable<number>,
        field: Readable<Map<number, ClientFieldCardSchema>>,
        groups: Readable<Map<number, ClientFieldGroupSchema>>,
        deck: Readable<string[]>,
        setList: Readable<string[]>;
    $: game = logic.game;
    $: players = $game.players;
    $: player = $players[playerIdx];
    $: profile = player.profile;
    $: livePoints = player.livePoints;
    $: field = player.field;
    $: groups = player.groups;
    $: deck = player.deck;
    $: setList = player.setList;

    function action(node: HTMLElement) {
        const interactable = interact(node).dropzone({
            accept: ".objcardhand",
            overlap: "center",
            listeners: {
                enter() {
                    node.classList.add("hovering");
                },
                leave() {
                    node.classList.remove("hovering");
                },
                drop() {
                    node.classList.remove("hovering");
                },
            },
        });

        return {
            destroy: () => interactable.unset(),
        };
    }
</script>

<div class="objfield" style:--player-color={$profile.fieldColor} use:action bind:this={fieldElement}>
    <div class="background">
        <div class="area deck" />
        <div class="area setlist" />
        <div class="line live" />
        <div class="line info" />
        <div class="name">{$profile.name}</div>
        <div class="livepoints">{$livePoints}</div>
        <div class="livepointsbelow">
            {#if isClient}
                <button on:click={() => logic.requestLPUpdate(1)}><Plus /></button>
                <button on:click={() => logic.requestLPUpdate(-1)}><Minus /></button>
            {:else}
                Live Points
            {/if}
        </div>
    </div>

    {#each [...$groups.entries()] as [id, group] (id)}
        <FieldGroupObject {id} {...group} />
    {/each}
    {#each [...$field.entries()] as [id, card] (id)}
        <FieldCardObject
            {id}
            {...card}
            flippedColor={card.cardType === CardType.MEMBER ? $profile.deckColor : $profile.setListColor}
        />
    {/each}

    <StackObject
        bind:this={deckComponent}
        cardNos={$deck}
        stackType={StackType.DECK}
        x={616}
        y={288}
        color={$profile.deckColor}
    />
    <StackObject
        bind:this={setListComponent}
        cardNos={$setList}
        stackType={StackType.SET_LIST}
        x={39}
        y={314}
        color={$profile.setListColor}
    />
</div>

<style lang="postcss">
    .objfield {
        @apply relative flex-shrink-0 box-content border border-solid;
        width: 720px;
        height: 396px;
        margin: 10px;
        border-color: var(--player-color);

        &:global(.ui-droppable-hover) {
            @apply outline outline-4 -outline-offset-4 outline-white/50;
        }

        & .background {
            @apply select-none pointer-events-none;

            & .area {
                @apply absolute border border-solid z-play-field box-content rounded-md;
                border-color: var(--player-color);

                &.setlist {
                    left: 32px;
                    right: 120px;
                    height: 75.5px;
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
                    right: 32px;
                    width: 77.5px;
                    bottom: 10px;
                    height: 102px;

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
                bottom: 98px;
                border-color: var(--player-color);

                &.live {
                    left: 281px;
                }
                &.info {
                    left: 61px;
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
                    @apply flex items-center justify-center bg-accent-600 hover:bg-accent-400 text-white rounded-full;
                }
            }
        }
    }
</style>
