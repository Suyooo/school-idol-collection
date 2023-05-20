<script context="module" lang="ts">
    import { getContext, onMount } from "svelte";
    import { CardOrientation } from "$lib/enums/cardOrientation.js";
    import Spinner from "$lib/style/icons/Spinner.svelte";
    import CardType from "$lib/enums/cardType.js";
    import type { Readable, Writable } from "svelte/store";
    import { loadCardInfo, type CardWithImageData } from "$lib/play/cardInfo.js";
    import interact from "@interactjs/interact/index";
    import "@interactjs/auto-start";
    import "@interactjs/actions/drag";
    import "@interactjs/modifiers";
    import { StackSide, type ClientGameLogic } from "$lib/play/schema.js";
    import type { OpenMenuFunction } from "./+page.svelte";
</script>

<script lang="ts">
    export let id: number;
    export let cardNo: string;
    export let cardType: CardType;
    export let flipped: boolean;
    export let position: Readable<{ x: number; y: number; z: number }>;
    export let flippedColor: string;
    const logic: ClientGameLogic = getContext("logic");
    const openMenu: OpenMenuFunction = getContext("openMenu");

    let element: HTMLElement;
    $: if (element) element.dataset.id = id.toString();

    let loadPromise: Promise<CardWithImageData> = new Promise(() => null);
    onMount(() => {
        loadPromise = loadCardInfo(cardNo);
    });

    let displayPosition: { x: number; y: number };
    $: displayPosition = { x: $position.x, y: $position.y };
    let hasMovedSinceMouseDown = false;
    function action(node: HTMLElement) {
        const interactable = interact(node)
            .styleCursor(false)
            .draggable({
                listeners: {
                    start() {
                        node.classList.add("dragging");
                    },
                    move(event) {
                        displayPosition.x += event.dx;
                        displayPosition.y += event.dy;
                        hasMovedSinceMouseDown = true;
                    },
                    end(event) {
                        if (event.relatedTarget?.classList.contains("objhand")) {
                            // handled in HandObject
                        } else {
                            node.classList.remove("dragging");
                            logic.requestFieldMove(id, displayPosition.x, displayPosition.y);
                            if (
                                event.relatedTarget?.classList.contains(
                                    cardType === CardType.MEMBER ? "objstackdeck" : "objstacksetlist"
                                )
                            ) {
                                openMenu(
                                    event.page.x,
                                    event.page.y,
                                    `${cardNo} &rarr; ${cardType === CardType.MEMBER ? "Deck" : "Set List"}`,
                                    [
                                        {
                                            label: "Put on Top",
                                            handler: () => logic.requestFieldToStack(id, StackSide.TOP),
                                        },
                                        {
                                            label: "Put on Bottom",
                                            handler: () => logic.requestFieldToStack(id, StackSide.BOTTOM),
                                            condition: !event.relatedTarget.classList.contains("empty"),
                                        },
                                    ],
                                    true
                                );
                            }
                        }
                    },
                },
                modifiers: [
                    interact.modifiers.snap({
                        targets: [
                            interact.snappers.grid({
                                x: 10,
                                y: 10,
                            }),
                        ],
                        relativePoints: [{ x: 0, y: 0 }],
                        offset: "parent",
                    }),
                    interact.modifiers.restrictRect({
                        restriction: "parent",
                        endOnly: true,
                    }),
                ],
            });

        return {
            destroy: () => interactable.unset(),
        };
    }
    function checkFlip() {
        if (!hasMovedSinceMouseDown) {
            logic.requestFieldFlip(id);
        }
    }

    let sidebarCardNo: Writable<string | undefined> = getContext("sidebarCardNo");

    function updateSidebar() {
        if ($sidebarCardNo === cardNo) {
            $sidebarCardNo = undefined;
        } else {
            $sidebarCardNo = cardNo;
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    bind:this={element}
    class="objcardfield"
    class:objcardfieldmember={cardType === CardType.MEMBER}
    class:objcardfieldsong={cardType === CardType.SONG}
    class:objcardfieldmemory={cardType === CardType.MEMORY}
    style:left={`${displayPosition.x}px`}
    style:top={`${displayPosition.y}px`}
    style:z-index={$position.z}
    style:--flipped-color={flippedColor}
    on:mousedown={() => (hasMovedSinceMouseDown = false)}
    on:mouseup={checkFlip}
    on:contextmenu|preventDefault={updateSidebar}
    use:action
>
    <div
        class="card"
        class:card-v={cardType === CardType.MEMBER}
        class:card-h={cardType !== CardType.MEMBER}
        class:highlight={cardNo === $sidebarCardNo}
    >
        {#await loadPromise}
            <Spinner />
        {:then card}
            {#if !$flipped}
                <img src={card.imageDataUrl} alt={cardNo} />
            {:else}
                <div class="flipped">?</div>
            {/if}
        {/await}
    </div>
</div>

<style lang="postcss">
    .objcardfield {
        @apply absolute w-min select-none touch-none z-play-card cursor-grab;

        & .card {
            @apply flex items-center justify-center overflow-hidden shadow-sm shadow-black;
            background-color: var(--flipped-color);
            transition: width 0.3s, height 0.3s, shadow-blur 0.3s;

            &.card-v {
                @apply rounded-card-v;
                width: 65px;
                height: 91px;
            }

            &.card-h {
                @apply rounded-card-h;
                width: 91px;
                height: 65px;
            }

            & img {
                @apply w-full;
            }

            & .flipped {
                @apply text-3xl font-bold opacity-30;
            }

            &.highlight {
                @apply outline outline-4 outline-accent-500;
            }
        }

        &:hover {
            @apply brightness-110;
        }

        &:global(.dragging) {
            @apply !z-play-card-dragging cursor-grabbing;

            &:global(.inhand) {
                & .card {
                    @apply shadow-md shadow-black;

                    &.card-v {
                        width: 130px;
                        height: 182px;
                    }

                    &.card-h {
                        width: 182px;
                        height: 130px;
                    }
                }
            }
        }
    }
</style>
