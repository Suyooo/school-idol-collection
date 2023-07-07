<script context="module" lang="ts">
    import { getContext } from "svelte";
    import { type Readable, get } from "svelte/store";
    import interact from "@interactjs/interact/index";
    import "@interactjs/actions/drop";
    import { ClientGameLogic, StackSide, StackType } from "$lib/play/schema.js";
    import type { OpenMenuFunction } from "./+page.svelte";
</script>

<script lang="ts">
    export let cardNos: string[];
    export let stackType: StackType;
    export let x: number = 0;
    export let y: number = 0;
    export let color: string;
    const logic: ClientGameLogic = getContext("logic");
    const openMenu = getContext<OpenMenuFunction>("openMenu");
    const liveModeEnabled: Readable<boolean> = getContext("liveModeEnabled");

    let stackLength: number, h: number;
    $: stackLength = Math.min(cardNos.length - 1, 60);
    $: h = stackType === StackType.DECK ? 91 : 65;

    function action(node: HTMLElement) {
        const interactable = interact(node).dropzone({
            accept: stackType === StackType.DECK ? ".objcardfieldmember, .objcardhand" : ".objcardfieldsong",
            overlap: "center",
            checker: (_dragEvent, _event, dropped) => dropped && !$liveModeEnabled,
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

        return {
            destroy: () => interactable.unset(),
        };
    }

    function menu(e: MouseEvent) {
        if (cardNos.length === 0) return;
        openMenu(
            e.pageX,
            e.pageY,
            stackType === StackType.DECK ? "Deck" : "Set List",
            [
                {
                    label: "⟪SCOUT⟫",
                    handler: () => {
                        let toDraw = Math.max(
                            4 - get(get(get(logic.game).players)[logic.clientPlayerId].hand).length,
                            0
                        );
                        for (; toDraw > 0; toDraw--) logic.requestStackToHand(StackSide.TOP);
                    },
                    condition: stackType === StackType.DECK,
                },
                {
                    label: "Draw Top Card to Hand",
                    handler: () => logic.requestStackToHand(StackSide.TOP),
                    condition: stackType === StackType.DECK,
                },
                {
                    label: "Draw Bottom Card to Hand",
                    handler: () => logic.requestStackToHand(StackSide.BOTTOM),
                    condition: stackType === StackType.DECK && cardNos.length > 1,
                },
                {
                    label: "Reveal Top Card on Stage",
                    handler: () => logic.requestStackToField(stackType, StackSide.TOP, x, y - stackLength),
                },
                {
                    label: "Reveal Bottom Card on Stage",
                    handler: () => logic.requestStackToField(stackType, StackSide.BOTTOM, x, y),
                    condition: cardNos.length > 1,
                },
                {
                    label: "Shuffle",
                    handler: () => logic.requestShuffle(stackType),
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

<!-- TODO: on:contextmenu opens deck list in side bar -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<button
    class="objstack"
    class:objstackdeck={stackType === StackType.DECK}
    class:objstacksetlist={stackType === StackType.SET_LIST}
    class:almostempty={cardNos.length <= 1}
    class:empty={cardNos.length === 0}
    class:disabled={$liveModeEnabled}
    style:--stack-color={color}
    style:left={`${x}px`}
    style:top={`${y - 60}px`}
    style:transform={`translateX(${shakeX}px)`}
    on:click={menu}
    on:contextmenu|preventDefault={menu}
    use:action
>
    <div class="stack bottom" />
    <div class="stack top" style:margin-top={`-${stackLength + h}px`}>
        {cardNos.length}
    </div>
</button>

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

        &.objstackdeck .stack {
            @apply rounded-card-v;
            width: 65px;
            height: 91px;

            &.bottom:after {
                @apply rounded-card-v;
            }
        }

        &.objstacksetlist .stack {
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

        &.disabled {
            @apply pointer-events-none brightness-50;
        }
    }
</style>
