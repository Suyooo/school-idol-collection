<script context="module" lang="ts">
    import { createEventDispatcher, getContext, onMount } from "svelte";
    import { fly } from "svelte-reduced-motion/transition";
    import type { Readable, Writable } from "svelte/store";
    import interact from "@interactjs/interact/index";
    import "@interactjs/actions/drag";
    import "@interactjs/auto-start";
    import "@interactjs/modifiers";
    import "@interactjs/types";
    import { cardIsIdolizable, cardIsMember } from "$l/card/types.js";
    import { type CardWithImageData, loadCardInfo } from "$l/play/cardInfo.js";
    import type { LiveModeStore } from "$l/play/livemode.js";
    import { type ClientGameLogic, StackSide } from "$l/play/schema.js";
    import Spinner from "$l/style/icons/Spinner.svelte";
    import type { FieldPositionFunction, OpenMenuFunction } from "./+page.svelte";
</script>

<script lang="ts">
    export let idx: number;
    export let cardNo: string;
    export let isLastItem: boolean;
    export let disableSidewaysAnimations: boolean;
    const logic: ClientGameLogic = getContext("logic");
    const openMenu: OpenMenuFunction = getContext("openMenu");
    const liveModeCards: LiveModeStore = getContext("liveModeCards");
    const fieldZoom: Writable<number> = getContext("fieldZoom");
    const snapFunction: () => Interact.SnapFunction = getContext("snapFunction");
    const fieldPositionFunction: FieldPositionFunction = getContext("fieldPositionFunction");

    let element: HTMLElement;
    $: if (element) element.dataset.idx = idx.toString();

    let loadPromise: Promise<CardWithImageData> = new Promise(() => null),
        card: CardWithImageData;
    onMount(() => {
        if (cardNo !== null) {
            loadPromise = loadCardInfo(cardNo);
            loadPromise.then((loadedCard) => (card = loadedCard));
        }
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
                            const pos = fieldPositionFunction(node.children[0].children[0].getBoundingClientRect());
                            logic.requestHandToField(idx, pos.x, pos.y);
                        } else if (event.relatedTarget?.classList.contains("objhand")) {
                            // handled in HandObject
                            node.classList.remove("dragging");
                            startOffset.x = startOffset.y = displayPosition.x = displayPosition.y = 0;
                        } else if (event.relatedTarget?.classList.contains("objcardfieldmember")) {
                            const pos = fieldPositionFunction(node.children[0].children[0].getBoundingClientRect());
                            node.classList.remove("dragging");
                            startOffset.x = startOffset.y = displayPosition.x = displayPosition.y = 0;
                            openMenu(
                                undefined,
                                event.page.x,
                                event.page.y,
                                `${cardNo} &rarr; ${event.relatedTarget.dataset.cardNo}`,
                                [
                                    {
                                        label: "⟪ENTER⟫ Idolized",
                                        handler: () => {
                                            const baseId = parseInt(event.relatedTarget!.dataset.id!);
                                            liveModeCards.removeMember(baseId);
                                            logic.requestIdolizeFromHand(baseId, idx);
                                        },
                                    },
                                    {
                                        label: "⟪ENTER⟫ Unidolized",
                                        handler: () => {
                                            logic.requestHandToField(idx, pos.x, pos.y);
                                        },
                                    },
                                ],
                                true
                            );
                        } else {
                            node.classList.remove("dragging");
                            startOffset.x = startOffset.y = displayPosition.x = displayPosition.y = 0;
                            if (event.relatedTarget?.classList.contains("objstackdeck")) {
                                openMenu(
                                    undefined,
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
                        targets: [snapFunction()],
                        relativePoints: [{ x: 0, y: 0 }],
                    }),
                ],
            });

        return {
            destroy: () => interactable.unset(),
        };
    }

    const [sidebarCardNo, setSidebarCard] =
        getContext<[Readable<string | undefined>, (c: string | undefined) => void]>("sidebarCardNo");
    function updateSidebar() {
        setSidebarCard(cardNo!);
    }
</script>

<div
    bind:this={element}
    class="objcardhand"
    class:disable-sideways-animations={disableSidewaysAnimations}
    class:idolizable={card !== undefined && cardIsMember(card) && cardIsIdolizable(card)}
    class:last={isLastItem}
    style:--zoom={$fieldZoom}
    style:left={`${startOffset.x + displayPosition.x}px`}
    style:top={`${startOffset.y + displayPosition.y}px`}
    in:fly|global={{ y: -200 }}
    on:contextmenu|preventDefault={updateSidebar}
    use:action
    role="listitem"
>
    <div class="cardholder">
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
</div>

<style lang="postcss">
    .objcardhand {
        @apply relative flex-grow cursor-grab select-none;
        width: 0px;
        height: 91px;
        max-width: 65px;

        &.last {
            width: 130px;
            max-width: 130px;
        }

        & .cardholder {
            width: 130px;
            height: 500px;
        }

        & .card {
            @apply absolute flex items-center justify-center text-black bg-primary-200 overflow-hidden rounded-card-v shadow-card-hand;
            left: 0;
            width: 130px;
            height: 182px;
            transition: margin-top 0.3s, width 0.3s, height 0.3s, box-shadow 0.3s;

            & img {
                @apply w-full h-full;
            }

            &.highlight {
                @apply outline outline-8 outline-accent-500;
            }
        }

        &:global(.dragging) {
            @apply absolute z-play-card-dragging opacity-80;
        }

        &:global(.dragging:not(.inhand)) .card {
            @apply shadow-card-field;
            width: calc(65px * var(--zoom));
            height: calc(91px * var(--zoom));
        }

        &:hover,
        &:global(.dragging) {
            & img {
                @apply brightness-110;
            }
        }

        &:not(.dragging):hover .card {
            margin-top: -91px;
        }
    }
</style>
