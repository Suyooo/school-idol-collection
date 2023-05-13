<script context="module" lang="ts">
    import "../../app.css";
    import FieldObject from "./FieldObject.svelte";
    import { setContext } from "svelte";
    import PopupMenu from "./PopupMenu.svelte";
    import { LocalClientGameLogic } from "$lib/play/logic/local.js";
    import type StackObject from "./StackObject.svelte";
    import { StackType } from "$lib/play/schema.js";
    import type { ClientGameLogic, ClientGameSchema, ClientPlayerSchema } from "$lib/play/schema.js";
    import HandObject from "./HandObject.svelte";
    import { writable, type Readable, type Writable } from "svelte/store";
    import { loadCardInfo, type CardWithImageData } from "$lib/play/cardInfo.js";
    import Spinner from "$lib/style/icons/Spinner.svelte";
    import { cardTitle } from "$lib/card/strings.js";

    export type OpenMenuFunction = (
        x: number,
        y: number,
        header: string,
        entries: { label: string; handler: () => void; condition?: boolean; close?: boolean }[],
        cancelable: boolean
    ) => void;
</script>

<script lang="ts">
    let menuX: number,
        menuY: number,
        menuHeader: string,
        menuEntries: { label: string; handler: () => void; close?: boolean }[] | undefined = undefined;

    const openMenu: OpenMenuFunction = (x, y, header, entries, cancelable) => {
        menuX = x;
        menuY = y;
        menuHeader = header;
        menuEntries = entries
            .filter((e) => e.condition ?? true)
            .map((e) => ({
                label: e.label,
                handler: () => {
                    if (e.close ?? true) menuEntries = undefined;
                    e.handler();
                },
            }));
        if (cancelable) {
            menuEntries.push({
                label: "Cancel",
                handler: () => {
                    menuEntries = undefined;
                },
            });
        }
    };
    setContext("openMenu", openMenu);

    const logic: ClientGameLogic = new LocalClientGameLogic({
        name: "Suyooo",
        fieldColor: "skyblue",
        deckColor: "#FF8246",
        setListColor: "#27C1B7",
    });
    let deckComponents: StackObject[] = [],
        setListComponents: StackObject[] = [];
    logic.handlers.onShuffle = (playerId: number, target: StackType) => {
        (target === StackType.DECK ? deckComponents : setListComponents)[playerId].shake();
    };

    let clientPlayerId: number = 0,
        game: Readable<ClientGameSchema>,
        players: Readable<ClientPlayerSchema[]>,
        handCards: Readable<string[]>;
    $: game = logic.game;
    $: players = $game.players;
    $: handCards = $players[clientPlayerId].hand;
    setContext("logic", logic);

    let sidebarCardNo: Writable<string | undefined> = writable(undefined),
        sidebarCardPromise: Promise<CardWithImageData> = new Promise(() => null);
    $: {
        if ($sidebarCardNo !== undefined) {
            sidebarCardPromise = loadCardInfo($sidebarCardNo);
        }
    }
    setContext("sidebarCardNo", sidebarCardNo);
</script>

<svelte:body on:mousedown={() => (menuEntries = undefined)} />

<div class="play">
    <div class="leftside">
        {#key $players}
            {#each $players as _, i}
                <FieldObject
                    playerIdx={i}
                    isClient={i === clientPlayerId}
                    bind:deckComponent={deckComponents[i]}
                    bind:setListComponent={setListComponents[i]}
                />
            {/each}
        {/key}

        <HandObject cardNos={$handCards} />
    </div>
    <div class="rightside">
        {#if $sidebarCardNo !== undefined}
            {#await sidebarCardPromise}
                <Spinner />
            {:then card}
                {@html cardTitle(card, true)}
            {/await}
        {:else}
            Right-click on a card to show details!
        {/if}
    </div>
</div>

{#if menuEntries}
    <PopupMenu x={menuX} y={menuY} header={menuHeader} entries={menuEntries} />
{/if}

<style lang="postcss">
    :global(body) {
        @apply overflow-hidden;
    }

    .play {
        @apply flex;
    }

    .leftside {
        @apply relative w-3/4 h-screen overflow-hidden;
    }

    .rightside {
        @apply p-4 bg-primary-700 relative w-1/4 h-screen overflow-hidden;
    }
</style>
