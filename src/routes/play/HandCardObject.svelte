<script context="module" lang="ts">
    import { getContext, onMount } from "svelte";
    import Spinner from "$lib/style/icons/Spinner.svelte";
    import { loadCardInfo, type CardWithImageData } from "$lib/play/cardInfo.js";
    import type { Writable } from "svelte/store";
    import interact from "@interactjs/interact/index";
    import "@interactjs/auto-start";
    import "@interactjs/actions/drag";
    import "@interactjs/modifiers";
    import { StackSide, type ClientGameLogic } from "$lib/play/schema.js";
    import type { OpenMenuFunction } from "./+page.svelte";
</script>

<script lang="ts">
    export let idx: number;
    export let cardNo: string | null;
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
    function action(node: HTMLElement) {
        const interactable = interact(node)
            .styleCursor(false)
            .draggable({
                listeners: {
                    start() {
                        startOffset.x = node.offsetLeft;
                        startOffset.y = node.offsetTop;
                        node.classList.add("dragging");
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
        $sidebarCardNo = cardNo!;
    }
</script>

{#if cardNo !== null}
    <div
        bind:this={element}
        class="objcardhand"
        style:left={`${startOffset.x + displayPosition.x}px`}
        style:top={`${startOffset.y + displayPosition.y}px`}
        on:contextmenu|preventDefault={updateSidebar}
        use:action
    >
        {#await loadPromise}
            <div class="card">
                <Spinner />
            </div>
        {:then card}
            <div class="card">
                <img src={card.imageDataUrl} alt={cardNo} />
            </div>
        {/await}
    </div>
{:else}
    <div class="indicator" />
{/if}

<style lang="postcss">
    .objcardhand {
        @apply relative w-min cursor-grab select-none;
        width: 65px;
        height: 91px;

        &:last-child {
            width: 130px;
        }

        & .card {
            @apply absolute flex pt-4 items-start justify-center text-black bg-primary-200 overflow-hidden rounded-card-h shadow-md shadow-black;
            left: 0;
            width: 130px;
            height: 182px;
            transition: margin-top 0.3s, width 0.3s, height 0.3s, shadow-blur 0.3s;
            transform-origin: 0 0;

            & img {
                @apply -mt-4 w-full;
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
            margin-top: -50%;
        }
    }

    .indicator {
        @apply relative pt-4 pointer-events-none;
        width: 65px;

        &:last-child {
            width: 130px;
        }

        &:before {
            @apply absolute text-center text-accent-500 leading-none;
            left: 0;
            bottom: -0.75rem;
            width: 100px;
            height: 1em;
            font-size: 500%;
            content: "🠛";
        }
    }
</style>
