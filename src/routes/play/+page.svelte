<script context="module" lang="ts">
    import { setContext } from "svelte";
    import { type Readable, type Writable, derived, get, writable } from "svelte/store";
    import type { SnapFunction } from "@interactjs/types";
    import type { Point } from "@interactjs/types/index";
    import "../../app.css";
    import { cardTitle } from "$lib/card/strings.js";
    import { CardOrientation } from "$lib/enums/cardOrientation.js";
    import Language from "$lib/enums/language.js";
    import { type CardWithImageData, loadCardInfo } from "$lib/play/cardInfo.js";
    import { LocalClientGameLogic } from "$lib/play/logic/local.js";
    import type { ClientGameLogic, ClientGameSchema, ClientPlayerSchema } from "$lib/play/schema.js";
    import { type HandCardSchema, StackType } from "$lib/play/schema.js";
    import Button from "$lib/style/Button.svelte";
    import Spinner from "$lib/style/icons/Spinner.svelte";
    import CardInfoRows from "../(site)/card/[cardNo]/CardInfoRows.svelte";
    import FieldObject from "./FieldObject.svelte";
    import HandObject from "./HandObject.svelte";
    import PopupMenu from "./PopupMenu.svelte";
    import type StackObject from "./StackObject.svelte";

    export type OpenMenuFunction = (
        x: number,
        y: number,
        header: string,
        entries: { label: string; handler: () => void; condition?: boolean }[],
        cancelable: boolean
    ) => void;

    export type FieldPositionFunction = {
        (boundingBox: DOMRect): Point;
        (x: number, y: number): Point;
    };
</script>

<script lang="ts">
    let menuX: number,
        menuY: number,
        menuHeader: string,
        menuEntries: { label: string; handler: () => void }[] | undefined = undefined;

    const openMenu: OpenMenuFunction = (x, y, header, entries, cancelable) => {
        menuX = x;
        menuY = y;
        menuHeader = header;
        menuEntries = entries
            .filter((e) => e.condition ?? true)
            .map((e) => ({
                label: e.label,
                handler: () => {
                    menuEntries = undefined;
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

    const fieldElements: HTMLDivElement[] = [];
    const playerField: Writable<HTMLDivElement> = writable();
    $: $playerField = fieldElements[logic.clientPlayerId];
    setContext("playerField", playerField);

    const deckComponents: StackObject[] = [],
        setListComponents: StackObject[] = [];
    logic.handlers.onShuffle = (playerId: number, target: StackType) => {
        (target === StackType.DECK ? deckComponents : setListComponents)[playerId].shake();
    };

    let game: Readable<ClientGameSchema>,
        players: Readable<ClientPlayerSchema[]>,
        handCards: Readable<HandCardSchema[]>;
    $: game = logic.game;
    $: players = $game.players;
    $: handCards = $players[logic.clientPlayerId].hand;
    setContext("logic", logic);

    const sidebarCardNo: Writable<string | undefined> = writable(undefined);
    let sidebarCardPromise: Promise<CardWithImageData> = new Promise(() => null);
    $: {
        if ($sidebarCardNo !== undefined) {
            sidebarCardPromise = loadCardInfo($sidebarCardNo);
        }
    }
    setContext("sidebarCardNo", sidebarCardNo);

    const liveModeCards: Writable<number[]> = writable([]);
    const liveModeEnabled: Readable<boolean> = derived(liveModeCards, (cards) => cards.length > 0);
    setContext("liveModeCards", liveModeCards);
    setContext("liveModeEnabled", liveModeEnabled);

    const fieldZoom: Writable<number> = writable(1);
    let currentZoom: number;
    $: currentZoom = $fieldZoom;
    function snapFunction(): SnapFunction {
        return (x, y, interaction) => {
            if (interaction.element?.classList.contains("inhand")) {
                return { x, y };
            }

            const gridSize = Math.round(10 * currentZoom);
            const field = fieldElements[logic.clientPlayerId];
            const left = field.offsetLeft + 1;
            const top = field.offsetTop + 1;
            const scroll = field.parentElement!.scrollTop;

            return {
                x: Math.round((x - left) / gridSize) * gridSize + left,
                y: Math.round((y - top + scroll) / gridSize) * gridSize + top - scroll,
                range: Infinity,
            };
        };
    }
    function fieldPositionFunction(boundingBox: DOMRect): Point;
    function fieldPositionFunction(x: number, y: number): Point;
    function fieldPositionFunction(a: DOMRect | number, b?: number): Point {
        const x = typeof a === "number" ? a : a.left;
        const y = typeof a === "number" ? b! : a.top;

        const field = fieldElements[logic.clientPlayerId];
        const left = field.offsetLeft + 1;
        const top = field.offsetTop + 1;
        const scroll = field.parentElement!.scrollTop;

        return { x: Math.round((x - left) / currentZoom), y: Math.round((y - top + scroll) / currentZoom) };
    }
    setContext("fieldZoom", fieldZoom);
    setContext("snapFunction", snapFunction);
    setContext("fieldPositionFunction", fieldPositionFunction);
</script>

<svelte:body on:mousedown={() => (menuEntries = undefined)} />

<div class="play">
    <div class="leftside">
        <div class="fieldscont">
            <div class="fields">
                {#key $players}
                    {#each $players as _, i}
                        <FieldObject
                            playerIdx={i}
                            isClient={i === logic.clientPlayerId}
                            bind:fieldElement={fieldElements[i]}
                            bind:deckComponent={deckComponents[i]}
                            bind:setListComponent={setListComponents[i]}
                        />
                    {/each}
                {/key}
            </div>
        </div>

        <HandObject hand={$handCards} />

        <Button classes="absolute right-2 top-2 w-6 h-6 !p-0" label="Zoom In" on:click={() => ($fieldZoom += 0.1)}
            >+</Button
        >
        <Button classes="absolute right-2 top-10 w-6 h-6 !p-0" label="Zoom Out" on:click={() => ($fieldZoom -= 0.1)}
            >-</Button
        >
        <span class="absolute right-10 top-2">{Math.round($fieldZoom * 50)}%</span>
    </div>
    <div class="rightside">
        {#if $sidebarCardNo !== undefined}
            {#await sidebarCardPromise}
                <Spinner />
            {:then card}
                <div class="panel-inner">
                    <h4>{@html cardTitle(card, true, Language.ENG, true)}</h4>
                    <div class="sidebar-info">
                        <CardInfoRows {card} hideSharedId hideBacklinks hideFaq forceSingleColumn />
                        <img
                            src={card.imageDataUrl}
                            alt={`${card.cardNo} Front Illustration`}
                            class:rounded-card-v={card.frontOrientation === CardOrientation.PORTRAIT}
                            class:rounded-card-h={card.frontOrientation === CardOrientation.LANDSCAPE}
                        />
                    </div>
                </div>
                <div class="cardcopyright">{card.copyright}</div>
            {/await}
            <Button
                accent
                href={`/card/${$sidebarCardNo}`}
                classes="float-right mt-1"
                target="_blank"
                label="Open Card Page in New Tab"
            >
                Open Card Page
            </Button>
        {:else}
            <div class="panel">
                <div class="panel-inner text">Right-click on a card to show details!</div>
            </div>
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
        @apply relative flex-1 flex flex-col items-center justify-center h-screen overflow-hidden;

        & .fieldscont {
            @apply w-full overflow-x-auto overflow-y-auto flex-grow p-4;
            & .fields {
                @apply mx-auto w-min min-h-full flex flex-col items-start justify-center gap-y-8;
            }
        }
    }

    .rightside {
        @apply p-2 bg-primary-700 relative flex-shrink-0 h-screen overflow-x-hidden;
        flex-basis: 25%;
    }

    h4 {
        @apply mb-0 tracking-normal;
    }

    .panel-inner {
        @apply pb-0;

        &.text {
            @apply py-12 select-none text-center;
        }
    }

    .panel-inner :global(.row) {
        @apply -mx-4;
    }

    .sidebar-info {
        @apply relative;

        & img {
            @apply absolute -right-2 top-0;
        }
    }

    .cardcopyright {
        @apply text-right text-2xs text-primary-500 mb-1;
    }
</style>
