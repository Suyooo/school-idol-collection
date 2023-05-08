<script context="module" lang="ts">
    import { droppable } from "svelte-agnostic-draggable";
    import CardType from "$lib/enums/cardType.js";
    import { createEventDispatcher, getContext } from "svelte";
    import { StackSide } from "$lib/play/schema.js";
    import type { OpenMenuFunction } from "./+page.svelte";
</script>

<script lang="ts">
    export let cardNos: string[];
    export let cardType: CardType;
    export let x: number = 0;
    export let y: number = 0;

    let stackLength: number, h: number;
    $: stackLength = Math.min(cardNos.length, 40);
    $: h = cardType === CardType.MEMBER ? 91 : 65;

    const openMenu = getContext<OpenMenuFunction>("openMenu");
    const dispatch = createEventDispatcher();

    function menuFromStack(e: MouseEvent) {
        if (cardNos.length === 0) return;
        if (cardType === CardType.MEMBER) {
            openMenu(
                e.pageX,
                e.pageY,
                `Deck`,
                [
                    {
                        label: "Draw Top Card to Hand",
                        handler: () =>
                            dispatch("draw", { side: StackSide.TOP }),
                        close: false,
                    },
                    {
                        label: "Draw Bottom Card to Hand",
                        handler: () =>
                            dispatch("draw", { side: StackSide.BOTTOM }),
                        close: false,
                    },
                    {
                        label: "Reveal Top Card on Stage",
                        handler: () =>
                            dispatch("reveal", {
                                side: StackSide.TOP,
                                x,
                                y: y - stackLength,
                            }),
                    },
                    {
                        label: "Reveal Bottom Card on Stage",
                        handler: () =>
                            dispatch("reveal", {
                                side: StackSide.BOTTOM,
                                x,
                                y: y,
                            }),
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
                `Song Card Stack`,
                [
                    {
                        label: "Reveal Top Card on Stage",
                        handler: () =>
                            dispatch("reveal", {
                                side: StackSide.TOP,
                                x,
                                y: y - stackLength,
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

    function menuToStack(e: Event & DroppableEvent) {
        openMenu(
            e.detail.sensorEvent.data.pageX,
            e.detail.sensorEvent.data.pageY,
            `${e.detail.draggable.element.dataset.cardNo} &rarr; ${
                cardType === CardType.MEMBER ? "Deck" : "Song Card Stack"
            }`,
            [
                {
                    label: "Return to Top",
                    handler: () =>
                        dispatch("return", {
                            id: parseInt(
                                e.detail.draggable.element.dataset.id!
                            ),
                            side: StackSide.TOP,
                        }),
                },
                {
                    label: "Return to Bottom",
                    handler: () =>
                        dispatch("return", {
                            id: parseInt(
                                e.detail.draggable.element.dataset.id!
                            ),
                            side: StackSide.BOTTOM,
                        }),
                },
            ],
            true
        );
    }

    let shakeX = 0;
    export function shake() {
        let t = 16;
        const anim = () => {
            t--;
            if (t % 4 === 3) {
                shakeX = -1 * (t / 4);
            } else if (t % 4 === 1) {
                shakeX = 1 * (t / 4);
            } else {
                shakeX = 0;
            }
            if (t > 0) requestAnimationFrame(anim);
        };
        requestAnimationFrame(anim);
    }
</script>

<!-- Accessibility considerations maybe later... -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="stackcontainer"
    style:left={`${x}px`}
    style:top={`${y - 40}px`}
    style:transform={`translateX(${shakeX}px)`}
    class:stack-v={cardType === CardType.MEMBER}
    class:stack-h={cardType !== CardType.MEMBER}
    class:!cursor-not-allowed={cardNos.length === 0}
    use:droppable={{ scope: cardType.toString() }}
    on:droppable:drop={menuToStack}
    on:click={menuFromStack}
>
    <div class="stack bottom" class:opacity-0={cardNos.length === 0} />
    <div
        class="stack top"
        class:!bg-primary-600={cardNos.length === 0}
        style:margin-top={`-${stackLength + h}px`}
    >
        {cardNos.length}
    </div>
</div>

<style lang="postcss">
    .stackcontainer {
        @apply absolute w-min -z-10 select-none cursor-pointer;

        & .stack {
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

        &.stack-v .stack {
            @apply rounded-card-v;
            width: 65px;
            height: 91px;
        }

        &.stack-h .stack {
            @apply rounded-card-h;
            width: 91px;
            height: 65px;
        }

        &:global(.ui-droppable-hover) .stack.top {
            @apply border-4 border-solid border-primary-100;
        }
    }
</style>
