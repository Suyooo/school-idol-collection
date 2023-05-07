<script context="module" lang="ts">
    import { droppable } from "svelte-agnostic-draggable";
    import CardType from "$lib/enums/cardType.js";
    import { getContext } from "svelte";
</script>

<script lang="ts">
    export let cardNos: string[];
    export let cardType: CardType;
    export let x: number = 0;
    export let y: number = 0;

    let deckLength: number, h: number;
    $: deckLength = Math.min(cardNos.length, 40);
    $: h = cardType === CardType.MEMBER ? 91 : 65;

    const openMenu =
        getContext<
            (
                x: number,
                y: number,
                header: string,
                entries: { label: string; handler: () => void }[],
                cancelable: boolean
            ) => void
        >("openMenu");
    function menuCardToDeck(e: Event & DroppableEvent) {
        openMenu(
            e.detail.sensorEvent.data.pageX,
            e.detail.sensorEvent.data.pageY,
            `${e.detail.draggable.element.dataset.cardNo} &rarr; Deck`,
            [
                { label: "Put on Top", handler: () => {} },
                { label: "Put on Bottom", handler: () => {} },
            ],
            true
        );
    }
</script>

<div
    class="deckcontainer"
    style:left={`${x}px`}
    style:top={`${y - 40}px`}
    class:deck-v={cardType === CardType.MEMBER}
    class:deck-h={cardType !== CardType.MEMBER}
    use:droppable={{ scope: cardType.toString() }}
    on:droppable:drop={menuCardToDeck}
>
    <div class="deck bottom" class:opacity-0={cardNos.length === 0} />
    <div
        class="deck top"
        class:opacity-50={cardNos.length === 0}
        style:margin-top={`-${deckLength + h}px`}
    >
        {cardNos.length}
    </div>
</div>

<style lang="postcss">
    .deckcontainer {
        @apply absolute w-min -z-10 cursor-pointer select-none;

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
                @apply flex items-center justify-center bg-primary-400 text-xl font-bold;
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
