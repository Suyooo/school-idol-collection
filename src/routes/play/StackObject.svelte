<script context="module" lang="ts">
    import CardType from "$lib/enums/cardType.js";
    import { createEventDispatcher, getContext } from "svelte";
    import { StackSide } from "$lib/play/schema.js";
    import type { OpenMenuFunction } from "./+page.svelte";
    import interact from "@interactjs/interact/index";
    import "@interactjs/actions/drop";
    import type { DropEvent } from "@interactjs/types/index";
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

    function action(node: HTMLElement) {
        const interactable = interact(node).dropzone({
            accept:
                cardType === CardType.MEMBER
                    ? ".objcardfieldmember, .objcardhand"
                    : ".objcardfieldsong",
            overlap: "center",
            listeners: {
                drop(event) {
                    node.classList.remove("hovering");
                    menuToStack(event);
                },
                enter() {
                    node.classList.add("hovering");
                },
                leave() {
                    node.classList.remove("hovering");
                },
            },
        });

        return {
            destroy: () => interactable.unset(),
        };
    }

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

    function menuToStack(e: DropEvent) {
        openMenu(
            e.dragEvent.page.x,
            e.dragEvent.page.y,
            `${e.relatedTarget.dataset.cardNo} &rarr; ${
                cardType === CardType.MEMBER ? "Deck" : "Song Card Stack"
            }`,
            e.relatedTarget.classList.contains("objcardHand")
            ? [
                {
                    label: "Return to Top",
                    handler: () =>
                        dispatch("returnHand", {
                            idx: parseInt(
                                e.relatedTarget.dataset.idx!
                            ),
                            side: StackSide.TOP,
                        }),
                },
                {
                    label: "Return to Bottom",
                    handler: () =>
                        dispatch("returnHand", {
                            idx: parseInt(
                                e.relatedTarget.dataset.idx!
                            ),
                            side: StackSide.BOTTOM,
                        }),
                },
            ]
            : [
                {
                    label: "Return to Top",
                    handler: () =>
                        dispatch("returnField", {
                            id: parseInt(
                                e.relatedTarget.dataset.id!
                            ),
                            side: StackSide.TOP,
                        }),
                },
                {
                    label: "Return to Bottom",
                    handler: () =>
                        dispatch("returnField", {
                            id: parseInt(
                                e.relatedTarget.dataset.id!
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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="objstack"
    style:--stack-color={color}
    style:left={`${x}px`}
    style:top={`${y - 60}px`}
    style:transform={`translateX(${shakeX}px)`}
    class:stack-v={cardType === CardType.MEMBER}
    class:stack-h={cardType !== CardType.MEMBER}
    class:almostempty={cardNos.length <= 1}
    class:empty={cardNos.length === 0}
    on:click={menuFromStack}
    use:action
>
    <div class="stack bottom" />
    <div class="stack top" style:margin-top={`-${stackLength + h}px`}>
        {cardNos.length}
    </div>
</div>

<style lang="postcss">
    .objstack {
        @apply absolute w-min z-play-stack select-none cursor-pointer;

        &:hover {
            @apply brightness-110;
        }

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
                @apply relative flex items-center justify-center text-xl font-bold border border-solid border-black/50;
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
                    border-color: var(--stack-color);
                }
            }
        }

        &:global(.hovering) .stack.top {
            @apply border-4 border-white/50;
        }
    }
</style>
