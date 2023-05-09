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
    export let color: string;

    let stackLength: number, h: number;
    $: stackLength = Math.min(cardNos.length - 1, 60);
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
        let t = 30;
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
    style:--stack-color={color}
    style:left={`${x}px`}
    style:top={`${y - 60}px`}
    style:transform={`translateX(${shakeX}px)`}
    class:stack-v={cardType === CardType.MEMBER}
    class:stack-h={cardType !== CardType.MEMBER}
    class:almostempty={cardNos.length <= 1}
    class:empty={cardNos.length === 0}
    use:droppable={{ scope: cardType.toString() }}
    on:droppable:drop={menuToStack}
    on:click={menuFromStack}
>
    <div class="stack bottom" />
    <div class="stack top" style:margin-top={`-${stackLength + h}px`}>
        {cardNos.length}
    </div>
</div>

<style lang="postcss">
    .stackcontainer {
        @apply absolute w-min z-play-stack select-none cursor-pointer;

        & .stack {
            background-color: var(--stack-color);

            &.bottom {
                @apply relative;
                margin-top: 60px;

                &:after {
                    @apply absolute left-0 right-0 top-0 bottom-0;
                    content: " ";
                    background: repeating-linear-gradient(
                        rgba(0, 0, 0, 0.25),
                        rgba(0, 0, 0, 0.25) 1px,
                        rgba(0, 0, 0, 0.5) 1px,
                        rgba(0, 0, 0, 0.5) 2px
                    );
                }
            }

            &.top {
                @apply relative flex items-center justify-center text-xl font-bold;
                border: 1px solid rgba(0, 0, 0, 0.5);
            }
        }

        &.stack-v .stack {
            @apply rounded-card-v;
            width: 65px;
            height: 91px;

            &.bottom:after {
                @apply rounded-card-v;
            }
        }

        &.stack-h .stack {
            @apply rounded-card-h;
            width: 91px;
            height: 65px;

            &.bottom:after {
                @apply rounded-card-h;
            }
        }

        &.almostempty {
            & .stack {
                &.bottom {
                    @apply opacity-0;
                }
            }
        }

        &.empty {
            @apply cursor-not-allowed;
            & .stack {
                &.top {
                    @apply bg-transparent;
                    border: 1px solid var(--stack-color);
                }
            }
        }

        &:global(.ui-droppable-hover) .stack.top {
            border: 4px solid rgba(255, 255, 255, 0.5);
        }
    }
</style>
