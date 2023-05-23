<script context="module" lang="ts">
    import { getContext, onMount } from "svelte";
    import type { Readable, Writable } from "svelte/store";
    import interact from "@interactjs/interact/index";
    import "@interactjs/actions/drag";
    import "@interactjs/auto-start";
    import "@interactjs/modifiers";
    import { cardIsIdolizable, cardIsMember } from "$lib/card/types.js";
    import CardType from "$lib/enums/cardType.js";
    import { type CardWithImageData, loadCardInfo } from "$lib/play/cardInfo.js";
    import { type ClientGameLogic, StackSide } from "$lib/play/schema.js";
    import Spinner from "$lib/style/icons/Spinner.svelte";
    import { type OpenMenuFunction, snapFunction } from "./+page.svelte";
</script>

<script lang="ts">
    export let id: number;
    export let cardNo: string;
    export let cardType: CardType;
    export let flipped: Readable<boolean>;
    export let position: Readable<{ x: number; y: number; z: number }>;
    export let idolizedBaseCardNo: string | undefined;
    export let flippedColor: string;
    export let blockInteract: boolean = false;
    const logic: ClientGameLogic = getContext("logic");
    const openMenu: OpenMenuFunction = getContext("openMenu");
    const playerFieldStore: Writable<HTMLDivElement> = getContext("playerField");

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
    $: displayPosition = { x: $position.x, y: $position.y };
    let wasPickedUp = true;
    function action(node: HTMLElement) {
        if (blockInteract) return;
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
                            } else if (
                                cardType === CardType.MEMBER &&
                                event.relatedTarget?.classList.contains("objcardfieldmember")
                            ) {
                                openMenu(
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
                        targets: [snapFunction(playerFieldStore)],
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

    function cardMenu(event: MouseEvent) {
        if (!blockInteract && event.button === 0 && !wasPickedUp) {
            openMenu(
                event.pageX,
                event.pageY,
                `${cardNo}${idolizedBaseCardNo !== undefined ? " (Idolized)" : ""}`,
                [
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
        wasPickedUp = true;
    }

    let sidebarCardNo: Writable<string | undefined> = getContext("sidebarCardNo");

    function updateSidebar(newCardNo?: string) {
        if (newCardNo === undefined && $flipped) {
            return;
        }
        if (newCardNo === undefined && $sidebarCardNo === cardNo) {
            $sidebarCardNo = undefined;
        } else {
            $sidebarCardNo = newCardNo ?? cardNo;
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
    class:block-interact={blockInteract}
    class:idolizable={card !== undefined && cardIsMember(card) && cardIsIdolizable(card)}
    style:left={`${displayPosition.x}px`}
    style:top={`${displayPosition.y}px`}
    style:z-index={$position.z}
    style:--flipped-color={flippedColor}
    on:mousedown={() => (wasPickedUp = false)}
    on:mouseup={cardMenu}
    on:contextmenu|preventDefault={() => updateSidebar()}
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
            @apply flex items-center justify-center bg-primary-300 overflow-hidden shadow-sm shadow-black;
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

            & img.image {
                @apply w-full hover:brightness-110;
            }

            & .flipped {
                @apply w-full h-full hover:brightness-110;
                background-color: var(--flipped-color);
            }

            &.highlight {
                @apply outline outline-4 outline-accent-500;
            }

            & img.icon {
                @apply absolute w-1/4 right-0.5 top-0.5;
            }
        }

        &.block-interact {
            & img.image,
            & .flipped {
                @apply brightness-90;
            }
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

        &:global(.hovering) {
            & .card {
                @apply outline outline-4 outline-primary-300;
            }
        }
    }
</style>
