<script context="module" lang="ts">
    import "../../app.css";
    import FieldObject from "./FieldObject.svelte";
    import { setContext } from "svelte";
    import PopupMenu from "./PopupMenu.svelte";
    import { LocalClientGameLogic } from "$lib/play/logic/local.js";
    import type StackObject from "./StackObject.svelte";
    import { StackTarget } from "$lib/play/schema.js";
    import type {
        ClientGameLogic,
        ClientGameSchema,
        ClientPlayerSchema,
    } from "$lib/play/schema.js";
    import HandObject from "./HandObject.svelte";
    import type { Readable } from "svelte/store";

    export type OpenMenuFunction = (
        x: number,
        y: number,
        header: string,
        entries: { label: string; handler: () => void; close?: boolean }[],
        cancelable: boolean
    ) => void;
</script>

<script lang="ts">
    let menuX: number,
        menuY: number,
        menuHeader: string,
        menuEntries:
            | { label: string; handler: () => void; close?: boolean }[]
            | undefined = undefined;

    const openMenu: OpenMenuFunction = (x, y, header, entries, cancelable) => {
        menuX = x;
        menuY = y;
        menuHeader = header;
        menuEntries = entries.map((e) => ({
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
    logic.handlers.onShuffle = (playerId: number, target: StackTarget) => {
        (target === StackTarget.DECK ? deckComponents : setListComponents)[
            playerId
        ].shake();
    };

    let clientPlayerId: number = 0,
        game: Readable<ClientGameSchema>,
        players: Readable<ClientPlayerSchema[]>,
        handCards: Readable<string[]>;
    $: game = logic.game;
    $: players = $game.players;
    $: handCards = $players[clientPlayerId].hand;
</script>

<svelte:body on:mousedown={() => (menuEntries = undefined)} />

<div class="play">
    <div class="leftside">
        <FieldObject
            {logic}
            playerId={0}
            isClient={0 === clientPlayerId}
            bind:deckComponent={deckComponents[0]}
            bind:setListComponent={setListComponents[0]}
        />

        <HandObject {logic} cardNos={$handCards} />
    </div>
    <div class="rightside">
        Sidebar!
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
        @apply bg-primary-700 relative w-1/4 h-screen overflow-hidden;
    }
</style>
