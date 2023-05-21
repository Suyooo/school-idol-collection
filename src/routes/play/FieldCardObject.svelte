<script context="module" lang="ts">
    import { getContext, onMount } from "svelte";
    import type { Readable, Writable } from "svelte/store";
    import interact from "@interactjs/interact/index";
    import "@interactjs/actions/drag";
    import "@interactjs/auto-start";
    import "@interactjs/modifiers";
    import type { SnapFunction } from "@interactjs/types";
    import CardType from "$lib/enums/cardType.js";
    import { type CardWithImageData, loadCardInfo } from "$lib/play/cardInfo.js";
    import { type ClientGameLogic, StackSide } from "$lib/play/schema.js";
    import Spinner from "$lib/style/icons/Spinner.svelte";
    import type { OpenMenuFunction } from "./+page.svelte";
</script>

<script lang="ts">
    export let id: number;
    export let cardNo: string;
    export let cardType: CardType;
    export let flipped: Readable<boolean>;
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
    let wasPickedUp = true;
    function action(node: HTMLElement) {
        const interactable = interact(node)
            .styleCursor(false)
            .draggable({
                listeners: {
                    start() {
                        node.classList.add("dragging");
                        wasPickedUp = true;
                    },
                    move(event) {
                        displayPosition.x += event.dx;
                        displayPosition.y += event.dy;
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
                        targets: [getContext<SnapFunction>("snap")],
                        relativePoints: [{ x: 0, y: 0 }],
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
    function cardMenu(event: MouseEvent) {
        if (event.button === 0 && !wasPickedUp) {
            openMenu(
                event.pageX,
                event.pageY,
                `${cardNo}`,
                [
                    {
                        label: "Flip",
                        handler: () => logic.requestFieldFlip(id),
                    },
                ],
                true
            );
        }
        wasPickedUp = true;
    }

    let sidebarCardNo: Writable<string | undefined> = getContext("sidebarCardNo");

    function updateSidebar() {
        if ($flipped) {
            return;
        }
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
    on:mousedown={() => (wasPickedUp = false)}
    on:mouseup={cardMenu}
    on:contextmenu|preventDefault={updateSidebar}
    use:action
>
    <div
        class="card"
        class:card-v={cardType === CardType.MEMBER}
        class:card-h={cardType !== CardType.MEMBER}
        class:highlight={$flipped === false && cardNo === $sidebarCardNo}
    >
        {#await loadPromise}
            <Spinner />
        {:then card}
            {#if !$flipped}
                <img src={card.imageDataUrl} alt={cardNo} />
            {:else}
                <div class="flipped">✖</div>
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
                @apply text-3xl font-bold opacity-50;
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
