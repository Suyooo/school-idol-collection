<script context="module" lang="ts">
    import { onMount, setContext } from "svelte";
    import { type Readable, type Writable, writable } from "svelte/store";
    import "svooltip/styles.css";
    import "@interactjs/types";
    import "../../app.css";
    import { cardTitle } from "$l/card/strings.js";
    import { CardOrientation } from "$l/enums/cardOrientation.js";
    import Language from "$l/enums/language.js";
    import { type CardWithImageData, loadCardInfo } from "$l/play/cardInfo.js";
    import { LocalClientGameLogic } from "$l/play/logic/local.js";
    import { loadProfileOrNew } from "$l/play/profile.js";
    import type { ClientGameLogic, ClientGameSchema, ClientPlayerSchema } from "$l/play/schema.js";
    import { type HandCardSchema, StackType } from "$l/play/schema.js";
    import Button from "$l/style/Button.svelte";
    import Spinner from "$l/style/icons/Spinner.svelte";
    import CardInfoRows from "../(site)/card/[cardNo]/CardInfoRows.svelte";
    import FieldObject from "./FieldObject.svelte";
    import HandObject from "./HandObject.svelte";
    import PopupMenu from "./PopupMenu.svelte";
    import SidebarLiveMode from "./SidebarLiveMode.svelte";
    import type StackObject from "./StackObject.svelte";

    export type OpenMenuFunction = (
        openedBy: string | undefined,
        x: number,
        y: number,
        header: string,
        entries: { label: string; handler: () => void; condition?: boolean }[],
        cancelable: boolean
    ) => void;

    export type FieldPositionFunction = {
        (boundingBox: DOMRect): Interact.Point;
        (x: number, y: number): Interact.Point;
    };
</script>

<script lang="ts">
    import { type LiveModeStore, createLiveModeStore } from "$l/play/livemode.js";
    import PlusMinusButtons from "./PlusMinusButtons.svelte";

    let menuOpenedByCardNo: string | undefined,
        menuX: number,
        menuY: number,
        menuHeader: string,
        menuEntries: { label: string; handler: () => void }[] | undefined = undefined;

    const openMenu: OpenMenuFunction = (openedBy, x, y, header, entries, cancelable) => {
        menuOpenedByCardNo = openedBy;
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

    function closeMenuToSidebar(e: Event) {
        menuEntries = undefined;
        if (menuOpenedByCardNo !== undefined) setSidebarCard(menuOpenedByCardNo);
        e.preventDefault();
    }

    const logic: ClientGameLogic = new LocalClientGameLogic(loadProfileOrNew());

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
    $: round = $game.round;
    $: turnOrder = $game.turnOrder;
    $: turnPlayerIdx = $game.turnPlayerIdx;
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
    function setSidebarCard(newCardNo: string | undefined) {
        if (newCardNo === undefined || $sidebarCardNo === newCardNo) {
            $sidebarCardNo = undefined;
        } else {
            $sidebarCardNo = newCardNo;
        }
    }
    setContext("sidebarCardNo", [sidebarCardNo, setSidebarCard]);

    const liveModeCards: LiveModeStore = createLiveModeStore();
    setContext("liveModeCards", liveModeCards);

    const fieldZoom: Writable<number> = writable(1);
    function snapFunction(): Interact.SnapFunction {
        return (x, y, interaction) => {
            if (interaction.element?.classList.contains("inhand")) {
                return { x, y };
            }

            const gridSize = Math.round(10 * $fieldZoom);
            const field = fieldElements[logic.clientPlayerId];
            const left = field.offsetLeft + 1 - field.parentElement!.parentElement!.scrollLeft;
            const top = field.offsetTop + 1 - field.parentElement!.parentElement!.scrollTop;

            return {
                x: Math.round((x - left) / gridSize) * gridSize + left,
                y: Math.round((y - top) / gridSize) * gridSize + top,
                range: Infinity,
            };
        };
    }
    function fieldPositionFunction(a: DOMRect | number, b?: number): Interact.Point {
        const isFixedXY = typeof a === "number";
        const x = isFixedXY ? a : a.left;
        const y = isFixedXY ? b! : a.top;

        const field = fieldElements[logic.clientPlayerId];
        const left = field.offsetLeft + 1 - field.parentElement!.parentElement!.scrollLeft;
        const top = field.offsetTop + 1 - field.parentElement!.parentElement!.scrollTop;

        const res = { x: x - left, y: y - top };
        if (!isFixedXY) {
            // If called with a DOM rect as parameter, it's a card drop action. Restrict it to the field area
            if (res.x < 0) {
                res.x = 0;
            } else if (res.x + a.width >= field.offsetWidth - 1) {
                res.x = field.offsetWidth - a.width - 2;
            }
            if (res.y < 0) {
                res.y = 0;
            } else if (res.y + a.height >= field.offsetHeight - 1) {
                res.y = field.offsetHeight - a.height - 2;
            }
        }

        res.x = Math.round(res.x / $fieldZoom);
        res.y = Math.round(res.y / $fieldZoom);
        return res;
    }
    setContext("fieldZoom", fieldZoom);
    setContext("snapFunction", snapFunction);
    setContext("fieldPositionFunction", fieldPositionFunction);

    let fieldsContainerElement: HTMLDivElement;
    onMount(() => {
        const maxZoomByWidth =
            Math.floor((fieldsContainerElement.clientWidth / (fieldElements[0].clientWidth + 60)) * 10) / 10;
        const playerNoFactor = $players.length > 1 ? 2 : 1;
        if (fieldElements[0].clientHeight * maxZoomByWidth * playerNoFactor > fieldsContainerElement.clientHeight) {
            $fieldZoom =
                Math.floor(
                    (fieldsContainerElement.clientHeight / (fieldElements[0].clientHeight * playerNoFactor + 20)) * 10
                ) / 10;
        } else {
            $fieldZoom = maxZoomByWidth;
        }
    });
</script>

<svelte:window on:beforeunload|preventDefault={() => ""} />
<svelte:head>
    <title>SIC</title>
</svelte:head>
<svelte:body on:mousedown={() => (menuEntries = undefined)} />

<base target="_blank" />

<div class="play">
    <div class="leftside" on:contextmenu|preventDefault={() => null} role="presentation">
        <div class="fieldscont" bind:this={fieldsContainerElement}>
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
        <div class="bottombar">
            <div class="w-[12.5%] p-2 flex-shrink-0 bg-primary-700 grid grid-rows-[1fr_1.5fr] items-center">
                <div class="text-center text-xl font-bold uppercase tracking-widest">Round {$round}</div>
                <div class="flex flex-col items-center">
                    {#if $turnOrder[$turnPlayerIdx] === logic.clientPlayerId}
                        <div>Your Turn</div>
                        <Button classes="mt-1" label="Finish Turn" accent on:click={() => logic.requestNextTurn()}>
                            Finish Turn
                        </Button>
                    {:else}
                        OTHER PLAYER's Turn
                    {/if}
                </div>
            </div>
            <HandObject hand={$handCards} />
        </div>

        <div
            class="absolute right-2 top-2 text-primary-400 hover:text-white transition-colors flex items-center gap-x-2 select-none"
        >
            {Math.round($fieldZoom * 50)}%
            <PlusMinusButtons
                value={$fieldZoom - 0.1}
                limit={19.9}
                update={(d) => ($fieldZoom += d / 10)}
                labelPlus="Zoom In"
                labelMinus="Zoom Out"
            />
        </div>
    </div>
    <div class="rightside">
        <SidebarLiveMode />
        <div class="panel">
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
                <div class="panel-inner text">Right-click on a card to show details!</div>
            {/if}
        </div>
    </div>
</div>

{#if menuEntries}
    <PopupMenu x={menuX} y={menuY} header={menuHeader} entries={menuEntries} on:contextmenu={closeMenuToSidebar} />
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

        & .bottombar {
            @apply w-full flex-shrink-0 flex items-stretch z-play-hand;
            height: 15vh;
        }
    }

    .rightside {
        @apply min-w-[32rem] bg-primary-700 relative flex-shrink-0 h-screen overflow-x-hidden overflow-y-scroll;
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
