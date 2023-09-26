<script context="module" lang="ts">
    import { getContext } from "svelte";
    import type { Readable, Writable } from "svelte/store";
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
    import PlusMinusButtons from "./PlusMinusButtons.svelte";

    export let playerIdx: number;
    export let isClient: boolean;
    export let fieldElement: HTMLDivElement;
    export let deckComponent: StackObject;
    export let setListComponent: StackObject;
    const logic: ClientGameLogic = getContext("logic");
    const fieldZoom: Writable<number> = getContext("fieldZoom");

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

<div
    class="objfield"
    style:--player-color={$profile.fieldColor}
    style:--zoom={$fieldZoom}
    use:action
    bind:this={fieldElement}
>
    <div class="background">
        <div class="area deck" />
        <div class="area setlist" />
        <div class="line live" />
        <div class="line info" />
        <div class="name">{$profile.name}</div>
        <div class="livepoints">
            {$livePoints}
            <div class="livepointsbuttons">
                <PlusMinusButtons value={$livePoints} update={(d) => logic.requestLPUpdate(d)} limit={99} accent />
            </div>
        </div>
        <div class="livepointslabel">Live Points</div>
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
        y={293}
        color={$profile.deckColor}
    />
    <StackObject
        bind:this={setListComponent}
        cardNos={$setList}
        stackType={StackType.SET_LIST}
        x={40}
        y={320}
        color={$profile.setListColor}
    />
</div>

<style lang="postcss">
    .objfield {
        @apply relative flex-shrink-0 box-content border-solid min-w-0 select-none;
        width: calc(720px * var(--zoom));
        height: calc(401px * var(--zoom));
        border-width: calc(1px * var(--zoom));
        border-color: var(--player-color);

        &:global(.hovering) {
            @apply outline outline-white/50;
            outline-offset: calc(-4px * var(--zoom));
            outline-width: calc(4px * var(--zoom));
        }

        & .background {
            @apply pointer-events-none;

            & .area {
                @apply absolute border-solid z-play-field box-content rounded-md;
                border-width: calc(1px * var(--zoom));
                border-color: var(--player-color);

                &.setlist {
                    left: calc(33px * var(--zoom));
                    right: calc(120px * var(--zoom));
                    height: calc(75.5px * var(--zoom));
                    bottom: calc(10px * var(--zoom));

                    &:before {
                        content: "Set List";
                        left: calc(-1rem * var(--zoom));
                        top: calc(-10px * var(--zoom));
                        bottom: calc(-10px * var(--zoom));
                        transform: rotate(180deg);
                    }
                }

                &.deck {
                    right: calc(32px * var(--zoom));
                    width: calc(77.5px * var(--zoom));
                    bottom: calc(10px * var(--zoom));
                    height: calc(102px * var(--zoom));

                    &:before {
                        content: "Deck";
                        right: calc(-1rem * var(--zoom));
                        top: 0px;
                        bottom: 0px;
                    }
                }

                &:before {
                    @apply absolute font-bold text-center uppercase tracking-widest;
                    color: var(--player-color);
                    font-size: calc(1rem * var(--zoom));
                    line-height: calc(-1.5rem * var(--zoom));
                    writing-mode: vertical-rl;
                }
            }

            & .line {
                @apply absolute  border-solid z-play-field;
                border-left-width: calc(1px * var(--zoom));
                width: calc(1px * var(--zoom));
                top: calc(10px * var(--zoom));
                bottom: calc(98px * var(--zoom));
                border-color: var(--player-color);

                &.live {
                    left: calc(281px * var(--zoom));
                }
                &.info {
                    left: calc(61px * var(--zoom));
                }
            }

            & .name {
                @apply absolute text-white font-bold overflow-hidden text-ellipsis text-center z-play-ui;
                left: 0px;
                width: calc(60px * var(--zoom));
                top: calc(60px * var(--zoom));
                bottom: calc(96px * var(--zoom));
                font-size: calc(30px * var(--zoom));
                line-height: calc(60px * var(--zoom));
                writing-mode: vertical-rl;
                transform: rotate(180deg);
            }

            & .livepoints {
                @apply absolute text-white font-bold text-center z-play-ui;
                left: 0px;
                width: calc(60px * var(--zoom));
                top: calc(5px * var(--zoom));
                font-size: calc(30px * var(--zoom));
                line-height: calc(30px * var(--zoom));
            }

            & .livepointsbuttons {
                @apply absolute z-play-ui pointer-events-auto right-0 top-1;
            }

            & .livepointslabel {
                @apply absolute flex items-center justify-around text-center uppercase font-normal tracking-tighter leading-none z-play-ui;
                left: 0px;
                width: calc(60px * var(--zoom));
                top: calc(35px * var(--zoom));
                height: calc(25px * var(--zoom));
                font-size: calc(12.5px * var(--zoom));
                line-height: calc(12.5px * var(--zoom));

                & button {
                    @apply flex items-center justify-center bg-accent-600 hover:bg-accent-400 text-white rounded-full;
                    width: calc(20px * var(--zoom));
                    height: calc(20px * var(--zoom));
                    font-size: calc(15px * var(--zoom));
                    line-height: calc(20px * var(--zoom));

                    &.disable {
                        @apply !bg-primary-500 pointer-events-none;
                    }
                }
            }
        }
    }
</style>
