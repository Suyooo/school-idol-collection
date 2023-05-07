<script context="module" lang="ts">
    import { droppable } from "svelte-agnostic-draggable";
    import CardType from "$lib/enums/cardType.js";
    import { createEventDispatcher, getContext } from "svelte";
</script>

<script lang="ts">
    export let cardNos: string[];
    export let cardType: CardType;
    export let x: number = 0;
    export let y: number = 0;

    let deckLength: number, h: number;
    $: deckLength = Math.min(cardNos.length, 40);
    $: h = cardType === CardType.MEMBER ? 91 : 65;

    const openMenu = getContext<
        (
            x: number,
            y: number,
            header: string,
            entries: {
                label: string;
                handler: () => void;
                close?: boolean;
            }[],
            cancelable: boolean
        ) => void
    >("openMenu");
    const dispatch = createEventDispatcher();

    function menuFromDeck(e: MouseEvent) {
        if (cardNos.length === 0) return;
        if (cardType === CardType.MEMBER) {
            openMenu(
                e.pageX,
                e.pageY,
                `Deck`,
                [
                    {
                        label: "Draw Top Card to Hand",
                        handler: () => dispatch("draw", { useTop: true }),
                        close: false,
                    },
                    {
                        label: "Draw Bottom Card to Hand",
                        handler: () => dispatch("draw", { useTop: false }),
                        close: false,
                    },
                    {
                        label: "Reveal Top Card on Stage",
                        handler: () =>
                            dispatch("reveal", {
                                useTop: true,
                                x,
                                y: y - deckLength,
                            }),
                    },
                    {
                        label: "Reveal Bottom Card on Stage",
                        handler: () =>
                            dispatch("reveal", { useTop: false, x, y: y }),
                    },
                    {
                        label: "Shuffle",
                        handler: () => dispatch("shuffle"),
                    },
                ],
                true
            );
        } else {
            openMenu(
                e.pageX,
                e.pageY,
                `Set List`,
                [
                    {
                        label: "Reveal Top Card on Stage",
                        handler: () =>
                            dispatch("reveal", {
                                useTop: true,
                                x,
                                y: y - deckLength,
                            }),
                    },
                    {
                        label: "Shuffle",
                        handler: () => dispatch("shuffle"),
                    },
                ],
                true
            );
        }
    }
    function menuToDeck(e: Event & DroppableEvent) {
        openMenu(
            e.detail.sensorEvent.data.pageX,
            e.detail.sensorEvent.data.pageY,
            `${e.detail.draggable.element.dataset.cardNo} &rarr; Deck`,
            [
                {
                    label: "Return to Top",
                    handler: () =>
                        dispatch("return", {
                            id: parseInt(
                                e.detail.draggable.element.dataset.id!
                            ),
                            useTop: true,
                        }),
                },
                {
                    label: "Return to Bottom",
                    handler: () =>
                        dispatch("return", {
                            id: parseInt(
                                e.detail.draggable.element.dataset.id!
                            ),
                            useTop: false,
                        }),
                },
            ],
            true
        );
    }
</script>

<!-- Accessibility considerations maybe later... -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="deckcontainer"
    style:left={`${x}px`}
    style:top={`${y - 40}px`}
    class:deck-v={cardType === CardType.MEMBER}
    class:deck-h={cardType !== CardType.MEMBER}
    class:!cursor-not-allowed={cardNos.length === 0}
    use:droppable={{ scope: cardType.toString() }}
    on:droppable:drop={menuToDeck}
    on:click={menuFromDeck}
>
    <div class="deck bottom" class:opacity-0={cardNos.length === 0} />
    <div
        class="deck top"
        class:!bg-primary-600={cardNos.length === 0}
        style:margin-top={`-${deckLength + h}px`}
    >
        {cardNos.length}
    </div>
</div>

<style lang="postcss">
    .deckcontainer {
        @apply absolute w-min -z-10 select-none cursor-pointer;

        & .deck {
            &.bottom {
                background: repeating-linear-gradient(
                    theme(colors.primary.600),
                    theme(colors.primary.600) 1px,
                    theme(colors.primary.500) 1px,
                    theme(colors.primary.500) 2px
                );
                margin-top: 40px;
            }

            &.top {
                @apply flex items-center justify-center text-xl font-bold bg-primary-400;
            }
        }

        &.deck-v .deck {
            @apply rounded-card-v;
            width: 65px;
            height: 91px;
        }

        &.deck-h .deck {
            @apply rounded-card-h;
            width: 91px;
            height: 65px;
        }

        &:global(.ui-droppable-hover) .deck.top {
            @apply border-4 border-solid border-accent-400;
        }
    }
</style>
