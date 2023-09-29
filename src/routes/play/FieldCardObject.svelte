<script context="module" lang="ts">
    import { getContext, onMount } from "svelte";
    import type { Readable, Writable } from "svelte/store";
    import interact from "@interactjs/interact/index";
    import "@interactjs/actions/drag";
    import "@interactjs/auto-start";
    import "@interactjs/modifiers";
    import type { SnapFunction } from "@interactjs/types/index";
    import { cardIsIdolizable, cardIsMember } from "$lib/card/types.js";
    import CardType from "$lib/enums/cardType.js";
    import { type CardWithImageData, loadCardInfo } from "$lib/play/cardInfo.js";
    import { type ClientGameLogic, StackSide } from "$lib/play/schema.js";
    import Spinner from "$lib/style/icons/Spinner.svelte";
    import type { FieldPositionFunction, OpenMenuFunction } from "./+page.svelte";
</script>

<script lang="ts">
    export let id: number;
    export let cardNo: string;
    export let cardType: CardType;
    export let flipped: Readable<boolean>;
    export let position: Readable<{ x: number; y: number; z: number }>;
    export let idolizedBaseCardNo: string | undefined;
    export let flippedColor: string;
    export let grouped: boolean = false;
    const logic: ClientGameLogic = getContext("logic");
    const openMenu: OpenMenuFunction = getContext("openMenu");
    const liveModeCards: Writable<number[]> = getContext("liveModeCards");
    const fieldZoom: Writable<number> = getContext("fieldZoom");
    const snapFunction: () => SnapFunction = getContext("snapFunction");
    const fieldPositionFunction: FieldPositionFunction = getContext("fieldPositionFunction");

    let element: HTMLElement;
    $: if (element) element.dataset.id = id.toString();
    $: if (element) element.dataset.cardNo = cardNo;

    let loadPromise: Promise<CardWithImageData> = new Promise(() => null),
        card: CardWithImageData;
    onMount(() => {
        loadPromise = loadCardInfo(cardNo);
        loadPromise.then((loadedCard) => (card = loadedCard));
    });

    let displayPosition: { x: number; y: number };
    $: displayPosition = { x: $position.x * $fieldZoom, y: $position.y * $fieldZoom };
    let wasMoved = true;
    function action(node: HTMLElement) {
        if (grouped) return;
        const interactable = interact(node)
            .styleCursor(false)
            .draggable({
                listeners: {
                    start() {
                        node.classList.add("dragging");
                        const pos = fieldPositionFunction(0, 0);
                        displayPosition.x -= pos.x * $fieldZoom;
                        displayPosition.y -= pos.y * $fieldZoom;
                    },
                    move(event) {
                        if (Math.abs(event.dx) > 2 || Math.abs(event.dy) > 2) {
                            wasMoved = true;
                        }
                        displayPosition.x += event.dx;
                        displayPosition.y += event.dy;
                    },
                    end(event) {
                        if (event.relatedTarget?.classList.contains("objhand")) {
                            // handled in HandObject
                        } else {
                            const pos = fieldPositionFunction(node.getBoundingClientRect());
                            node.classList.remove("dragging");
                            logic.requestFieldMove(id, pos.x, pos.y);
                            if (
                                event.relatedTarget?.classList.contains(
                                    cardType === CardType.MEMBER ? "objstackdeck" : "objstacksetlist"
                                )
                            ) {
                                openMenu(
                                    undefined,
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
                            } else if (
                                cardType === CardType.MEMBER &&
                                event.relatedTarget?.classList.contains("objcardfieldmember")
                            ) {
                                openMenu(
                                    undefined,
                                    event.page.x,
                                    event.page.y,
                                    `${cardNo} &rarr; ${event.relatedTarget.dataset.cardNo}`,
                                    [
                                        {
                                            label: "Idolize",
                                            handler: () =>
                                                logic.requestIdolizeFromField(
                                                    parseInt(event.relatedTarget.dataset.id),
                                                    id
                                                ),
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
                    interact.modifiers.restrictRect({
                        restriction: "parent",
                        endOnly: true,
                    }),
                ],
            });
        if (cardType === CardType.MEMBER && idolizedBaseCardNo === undefined) {
            interactable.dropzone({
                accept: ".objcardfieldmember.idolizable, .objcardhand.idolizable",
                overlap: "center",
                checker: (dragEvent, _event, _dropped, _dropzone, dropzoneElement, _draggable, draggableElement) => {
                    // This checker is neccessary because overlap=1 doesn't work:
                    // It uses the previous position, and does not take dx/dy into account
                    // Which results in the hovering class being applied one grid move after it was actually hovered
                    const dropzoneBox = dropzoneElement.getBoundingClientRect();
                    const draggableBox = draggableElement.getBoundingClientRect();
                    return (
                        Math.abs(draggableBox.left + dragEvent.dx - dropzoneBox.left) < 5 &&
                        Math.abs(draggableBox.top + dragEvent.dy - dropzoneBox.top) < 5
                    );
                },
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
        }

        return {
            destroy: () => interactable.unset(),
        };
    }

    function onClick(event: MouseEvent) {
        if (event.button !== 0 || wasMoved) {
            return;
        }
        wasMoved = true;
        if ($liveModeCards.length > 0) {
            if (!grouped && !$flipped) {
                if (cardType === CardType.MEMBER) {
                    liveModeCards.update((m) => {
                        const idx = m.indexOf(id);
                        if (idx !== -1) {
                            m.splice(idx, 1);
                        } else {
                            m.push(id);
                        }
                        return m;
                    });
                } else if (cardType === CardType.SONG) {
                    liveModeCards.update((m) => {
                        m[0] = id;
                        return m;
                    });
                }
            }
        } else if (!grouped) {
            openMenu(
                cardNo,
                event.pageX,
                event.pageY,
                `${cardNo}${idolizedBaseCardNo !== undefined ? " (Idolized)" : ""}`,
                [
                    {
                        label: "Prepare ⟪LIVE⟫",
                        handler: () => liveModeCards.set([id]),
                        condition: cardType == CardType.SONG,
                    },
                    {
                        label: "Flip",
                        handler: () => logic.requestFieldFlip(id),
                    },
                    {
                        label: "Check Base Card",
                        handler: () => updateSidebar(idolizedBaseCardNo),
                        condition: idolizedBaseCardNo !== undefined,
                    },
                    {
                        label: "Undo Idolization",
                        handler: () => logic.requestIdolizeUndo(id),
                        condition: idolizedBaseCardNo !== undefined,
                    },
                ],
                true
            );
        }
    }

    const [sidebarCardNo, setSidebarCard] =
        getContext<[Readable<string | undefined>, (c: string | undefined) => void]>("sidebarCardNo");

    function updateSidebar(overrideCardNo?: string) {
        if (overrideCardNo === undefined && $flipped) {
            return;
        }
        if (overrideCardNo === undefined && $sidebarCardNo === cardNo) {
            setSidebarCard(undefined);
        } else {
            setSidebarCard(overrideCardNo ?? cardNo);
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
    bind:this={element}
    class="objcardfield"
    class:objcardfieldmember={cardType === CardType.MEMBER}
    class:objcardfieldsong={cardType === CardType.SONG}
    class:objcardfieldmemory={cardType === CardType.MEMORY}
    class:lowlight={grouped}
    class:livemode-unselected={$liveModeCards.length > 0 && $liveModeCards.indexOf(id) === -1}
    class:livemode-selected={$liveModeCards.length > 0 && $liveModeCards.indexOf(id) !== -1}
    class:livemode-unselectable={$liveModeCards.length > 0 && ($flipped || grouped)}
    class:idolizable={card !== undefined && cardIsMember(card) && cardIsIdolizable(card)}
    style:--flipped-color={flippedColor}
    style:--zoom={$fieldZoom}
    style:left={`${displayPosition.x}px`}
    style:top={`${displayPosition.y}px`}
    style:z-index={$position.z}
    on:mousedown={() => (wasMoved = false)}
    on:mouseup={onClick}
    on:contextmenu|preventDefault={() => updateSidebar()}
    use:action
    role="listitem"
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
                <img class="image" src={card.imageDataUrl} alt={cardNo} />
            {:else}
                <div class="flipped" />
            {/if}
            {#if idolizedBaseCardNo !== undefined}
                <img class="icon" src="/images/icons/idolized.png" alt="Idolized" />
            {/if}
        {/await}
    </div>
</div>

<style lang="postcss">
    .objcardfield {
        @apply absolute w-min select-none touch-none z-play-card cursor-grab;

        & .card {
            @apply flex items-center justify-center text-black bg-primary-200 overflow-hidden shadow-sm shadow-black;

            &.card-v {
                @apply rounded-card-v;
                width: calc(65px * var(--zoom));
                height: calc(91px * var(--zoom));
            }

            &.card-h {
                @apply rounded-card-h;
                width: calc(91px * var(--zoom));
                height: calc(65px * var(--zoom));
            }

            & img.image {
                @apply w-full h-full hover:brightness-110;
            }

            & .flipped {
                @apply w-full h-full hover:brightness-110;
                background-color: var(--flipped-color);
            }

            &.highlight {
                @apply outline outline-accent-500;
                outline-width: calc(4px * var(--zoom));
            }

            & img.icon {
                @apply absolute w-1/4;
                top: calc(5px * var(--zoom));
                right: calc(5px * var(--zoom));
            }
        }

        &.lowlight {
            & img.image,
            & .flipped {
                @apply brightness-90 hover:brightness-100;
            }
        }

        &.livemode-selected {
            @apply outline outline-primary-100;
            outline-width: calc(2px * var(--zoom));
            outline-offset: calc(4px * var(--zoom));
            border-radius: calc(6px * var(--zoom));
        }

        &.livemode-unselected {
            & img.image,
            & .flipped {
                @apply brightness-75 hover:brightness-75;
            }

            &.objcardfieldmember {
                & img.image,
                & .flipped {
                    @apply hover:brightness-100;
                }
            }
        }

        &.livemode-unselectable {
            @apply pointer-events-none brightness-50;
        }

        &:global(.dragging) {
            @apply fixed !z-play-card-dragging cursor-grabbing;

            & .card {
                transition: width 0.3s, height 0.3s, shadow-blur 0.3s;
            }

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

        &:global(.hovering) {
            & .card {
                @apply outline outline-primary-300;
                outline-width: calc(4px * var(--zoom));
            }
        }
    }
</style>
