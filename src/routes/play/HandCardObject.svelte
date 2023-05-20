<script context="module" lang="ts">
    import { createEventDispatcher, getContext, onMount } from "svelte";
    import { fly } from "svelte-reduced-motion/transition";
    import type { Writable } from "svelte/store";
    import interact from "@interactjs/interact/index";
    import "@interactjs/actions/drag";
    import "@interactjs/auto-start";
    import "@interactjs/modifiers";
    import { type CardWithImageData, loadCardInfo } from "$lib/play/cardInfo.js";
    import { type ClientGameLogic, StackSide } from "$lib/play/schema.js";
    import Spinner from "$lib/style/icons/Spinner.svelte";
    import type { OpenMenuFunction } from "./+page.svelte";
</script>

<script lang="ts">
    export let idx: number;
    export let cardNo: string | null;
    export let indicatorAfter: boolean;
    export let disableSidewaysAnimations: boolean;
    const logic: ClientGameLogic = getContext("logic");
    const openMenu: OpenMenuFunction = getContext("openMenu");

    let element: HTMLElement;
    $: if (element) element.dataset.idx = idx.toString();

    let loadPromise: Promise<CardWithImageData> = new Promise(() => null);
    onMount(() => {
        if (cardNo !== null) loadPromise = loadCardInfo(cardNo);
    });

    let startOffset: { x: number; y: number } = { x: 0, y: 0 };
    let displayPosition: { x: number; y: number } = { x: 0, y: 0 };
    const dispatch = createEventDispatcher();
    function action(node: HTMLElement) {
        const interactable = interact(node)
            .styleCursor(false)
            .draggable({
                listeners: {
                    start() {
                        startOffset.x = node.offsetLeft;
                        startOffset.y = node.offsetTop;
                        node.classList.add("dragging");
                        dispatch("handCardPickedUp");
                    },
                    move(event) {
                        displayPosition.x += event.dx;
                        displayPosition.y += event.dy;
                    },
                    end(event) {
                        if (event.relatedTarget?.classList.contains("objfield")) {
                            const box = node.getBoundingClientRect();
                            // TODO: scroll position of field view
                            logic.requestHandToField(idx, box.left - 1, box.top - 1);
                        } else if (event.relatedTarget?.classList.contains("objhand")) {
                            // handled in HandObject
                            node.classList.remove("dragging");
                            startOffset.x = startOffset.y = displayPosition.x = displayPosition.y = 0;
                        } else {
                            node.classList.remove("dragging");
                            startOffset.x = startOffset.y = displayPosition.x = displayPosition.y = 0;
                            if (event.relatedTarget?.classList.contains("objstackdeck")) {
                                openMenu(
                                    event.page.x,
                                    event.page.y,
                                    `${cardNo} &rarr; Deck`,
                                    [
                                        {
                                            label: "Put on Top",
                                            handler: () => logic.requestHandToStack(idx, StackSide.TOP),
                                        },
                                        {
                                            label: "Put on Bottom",
                                            handler: () => logic.requestHandToStack(idx, StackSide.BOTTOM),
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
                        offset: { x: 0, y: 0 },
                    }),
                ],
            });

        return {
            destroy: () => interactable.unset(),
        };
    }

    let sidebarCardNo: Writable<string | undefined> = getContext("sidebarCardNo");
    function updateSidebar() {
        if ($sidebarCardNo === cardNo) {
            $sidebarCardNo = undefined;
        } else {
            $sidebarCardNo = cardNo!;
        }
    }
</script>

{#if cardNo !== null}
    <div
        bind:this={element}
        class="objcardhand"
        class:indicator-after={indicatorAfter}
        class:disable-sideways-animations={disableSidewaysAnimations}
        style:left={`${startOffset.x + displayPosition.x}px`}
        style:top={`${startOffset.y + displayPosition.y}px`}
        in:fly={{ y: -200 }}
        on:contextmenu|preventDefault={updateSidebar}
        use:action
    >
        {#await loadPromise}
            <div class="card">
                <Spinner />
            </div>
        {:then card}
            <div class="card" class:highlight={cardNo === $sidebarCardNo}>
                <img src={card.imageDataUrl} alt={cardNo} />
            </div>
        {/await}
    </div>
{:else}
    <div
        class="emptycard"
        class:indicator-after={indicatorAfter}
        class:disable-sideways-animations={disableSidewaysAnimations}
    />
{/if}

<style lang="postcss">
    .objcardhand,
    .emptycard {
        @apply relative mt-4 select-none;
        transition: margin-left 0.3s, margin-right 0.3s;
        margin-right: 0;

        &:after {
            @apply absolute text-center text-accent-500 leading-none pointer-events-none;
            content: " ";
            left: 10px;
            top: -1em;
            width: 130px;
            height: 1em;
            font-size: 500%;
            transition: left 0.3s;
        }

        &:first-child:after {
            left: -65px;
        }

        &:last-child:after {
            left: 65px;
        }

        &.indicator-after {
            margin-right: 65px;

            &:after {
                @apply absolute text-center text-accent-500 leading-none;
                content: "🠛";
                left: 45px;
            }

            &:first-child:after {
                left: 0px;
            }

            &:last-child:after {
                left: 65px;
            }

            &:first-child:last-child {
                margin-right: 0;
                &:after {
                    left: -65px;
                }
            }
        }

        &.disable-sideways-animations {
            transition: none;

            &:after {
                transition: none;
            }
        }
    }

    .objcardhand {
        @apply cursor-grab;
        width: 65px;
        height: 91px;

        & .card {
            @apply absolute flex items-start justify-center text-black bg-primary-200 overflow-hidden rounded-card-v shadow-md shadow-black;
            left: 0;
            width: 130px;
            height: 182px;
            transition: margin-top 0.3s, width 0.3s, height 0.3s, shadow-blur 0.3s, opacity 0.3s;

            & img {
                @apply w-full;
            }

            &.highlight {
                @apply outline outline-4 outline-accent-500;
            }
        }

        &:global(.dragging) {
            @apply absolute z-play-card-dragging;
        }

        &:global(.dragging:not(.inhand)) .card {
            @apply shadow-sm shadow-black;
            width: 65px;
            height: 91px;
        }

        &:hover,
        &:global(.dragging) {
            @apply brightness-110;
        }

        &:not(.dragging):hover .card {
            margin-top: -91px;
        }
    }

    .emptycard {
        @apply pointer-events-none;
        width: 0px;
    }
</style>
