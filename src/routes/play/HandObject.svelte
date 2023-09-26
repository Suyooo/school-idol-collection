<script context="module" lang="ts">
    import { getContext } from "svelte";
    import type { Readable } from "svelte/store";
    import interact from "@interactjs/interact/index";
    import "@interactjs/actions/drop";
    import type { DropEvent } from "@interactjs/types/index";
    import type { ClientGameLogic, HandCardSchema } from "$lib/play/schema.js";
    import HandCardObject from "./HandCardObject.svelte";
</script>

<script lang="ts">
    export let hand: HandCardSchema[];
    const logic: ClientGameLogic = getContext("logic");
    const liveModeEnabled: Readable<boolean> = getContext("liveModeEnabled");

    let draggingHandCardIdx: number | null = null;
    let indicatorPos: number | null = null;
    export function getHandIndex(event: DropEvent): number {
        const sizeOffset = draggingHandCardIdx === null ? 0 : 1;
        if (hand.length - sizeOffset === 0) {
            return 0;
        }

        let i = 0;
        for (const e of event.target.children) {
            if (e.classList.contains("emptycard") || e.classList.contains("dragging")) {
                continue;
            }

            if (e.getBoundingClientRect().left > event.dragEvent.rect.left) {
                break;
            }
            i++;
        }
        return i;
    }

    let disableSidewaysAnimations: boolean = false;
    function skipAnimations() {
        disableSidewaysAnimations = true;
        requestAnimationFrame(() => (disableSidewaysAnimations = false));
    }

    function action(node: HTMLElement) {
        const interactable = interact(node).dropzone({
            accept: ".objcardfieldmember, .objcardhand",
            overlap: "center",
            checker: (_dragEvent, _event, dropped) => dropped && !$liveModeEnabled,
            listeners: {
                enter(event) {
                    node.classList.add("hovering");
                    event.relatedTarget.classList.add("inhand");
                    if (event.relatedTarget.classList.contains("objcardhand")) {
                        draggingHandCardIdx = parseInt(event.relatedTarget.dataset.idx!);
                        if (hand.length === 1) {
                            skipAnimations();
                        }
                    } else {
                        if (hand.length === 0) {
                            skipAnimations();
                        }
                    }
                    indicatorPos = getHandIndex(event);
                },
                move(event) {
                    indicatorPos = getHandIndex(event);
                },
                leave(event) {
                    node.classList.remove("hovering");
                    event.relatedTarget.classList.remove("inhand");
                    indicatorPos = draggingHandCardIdx = null;
                },
                drop(event) {
                    node.classList.remove("hovering");
                    skipAnimations();
                    if (event.relatedTarget.classList.contains("objcardfieldmember")) {
                        logic.requestFieldToHand(parseInt(event.relatedTarget.dataset.id!), getHandIndex(event));
                    } else {
                        const oldIdx = parseInt(event.relatedTarget.dataset.idx!);
                        const newIdx = getHandIndex(event);
                        logic.requestHandMove(oldIdx, newIdx);
                    }
                    draggingHandCardIdx = indicatorPos = null;
                },
            },
        });

        return {
            destroy: () => interactable.unset(),
        };
    }
</script>

<div class="objhand" role="list" use:action>
    <HandCardObject idx={-1} cardNo={null} indicatorAfter={indicatorPos === 0} {disableSidewaysAnimations} />
    {#each hand as handCard, idx (handCard.id)}
        <HandCardObject
            {idx}
            cardNo={handCard.cardNo}
            indicatorAfter={indicatorPos !== null && draggingHandCardIdx !== idx
                ? indicatorPos === idx + 1 - (draggingHandCardIdx !== null && idx > draggingHandCardIdx ? 1 : 0)
                : false}
            {disableSidewaysAnimations}
            on:handCardPickedUp={skipAnimations}
        />
    {/each}
</div>

<style lang="postcss">
    .objhand {
        @apply w-full z-play-hand flex items-start justify-center bg-primary-600 border-8 border-solid border-transparent select-none px-4 pt-4;
        height: 15vh;

        & > :global(*):last-child {
            flex-shrink: 0;
        }

        &:global(.hovering) {
            @apply border-white/50;
            & :global(.objcardhand) {
                @apply !brightness-100;

                & :global(.card) {
                    @apply !mt-0;
                }
            }
        }

        &:after {
            @apply pointer-events-none;
            content: " ";
            width: 65px;
            flex-shrink: 0;
        }
    }
</style>
