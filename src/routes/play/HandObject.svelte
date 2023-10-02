<script context="module" lang="ts">
    import { getContext } from "svelte";
    import interact from "@interactjs/interact/index";
    import "@interactjs/actions/drop";
    import type { DropEvent } from "@interactjs/types/index";
    import type { LiveModeStore } from "$lib/play/livemode.js";
    import type { ClientGameLogic, HandCardSchema } from "$lib/play/schema.js";
    import HandCardObject from "./HandCardObject.svelte";
    import HandIndicator from "./HandIndicator.svelte";
</script>

<script lang="ts">
    export let hand: HandCardSchema[];
    const logic: ClientGameLogic = getContext("logic");
    const liveModeCards: LiveModeStore = getContext("liveModeCards");

    let draggingHandCardIdx: number | null = null;
    let indicatorPos: number | null = null;
    export function getHandIndex(event: DropEvent): number {
        const sizeOffset = draggingHandCardIdx === null ? 0 : 1;
        if (hand.length - sizeOffset === 0) {
            return 0;
        }

        let i = 0;
        for (const e of event.target.children) {
            if (
                e.classList.contains("emptycard") ||
                e.classList.contains("dragging") ||
                e.classList.contains("indicator")
            ) {
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
            listeners: {
                enter(event) {
                    event.relatedTarget.classList.add("inhand");
                    if (event.relatedTarget.classList.contains("objcardhand")) {
                        draggingHandCardIdx = parseInt(event.relatedTarget.dataset.idx!);
                        if (hand.length === 1) {
                            skipAnimations();
                        }
                    } else {
                        node.classList.add("hovering");
                        if (hand.length === 0) {
                            skipAnimations();
                        }
                    }
                    indicatorPos = getHandIndex(event);
                },
                activate(event) {
                    if (event.relatedTarget.classList.contains("objcardhand")) {
                        draggingHandCardIdx = parseInt(event.relatedTarget.dataset.idx!);
                        skipAnimations();
                        indicatorPos = getHandIndex(event);
                    }
                },
                move(event) {
                    indicatorPos = getHandIndex(event);
                },
                leave(event) {
                    node.classList.remove("hovering");
                    event.relatedTarget.classList.remove("inhand");
                    indicatorPos = null;
                },
                drop(event) {
                    node.classList.remove("hovering");
                    skipAnimations();
                    if (event.relatedTarget.classList.contains("objcardfieldmember")) {
                        const baseId = parseInt(event.relatedTarget.dataset.id!);
                        liveModeCards.removeMember(baseId);
                        logic.requestFieldToHand(baseId, getHandIndex(event));
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
    <HandIndicator show={indicatorPos === 0} isLastItem={hand.length === 0} {disableSidewaysAnimations} />
    {#each hand as handCard, idx (handCard.id)}
        {@const isLastItem =
            (idx === hand.length - 1 && draggingHandCardIdx !== hand.length - 1) ||
            (idx === hand.length - 2 && draggingHandCardIdx === hand.length - 1)}
        {@const indicatorAfterThis =
            indicatorPos !== null && draggingHandCardIdx !== idx
                ? indicatorPos === idx + 1 - (draggingHandCardIdx !== null && idx > draggingHandCardIdx ? 1 : 0)
                : false}
        <HandCardObject {idx} cardNo={handCard.cardNo} {isLastItem} {disableSidewaysAnimations} />
        <HandIndicator show={indicatorAfterThis} {isLastItem} {disableSidewaysAnimations} />
    {/each}
</div>

<style lang="postcss">
    .objhand {
        @apply flex-grow flex items-start justify-center bg-primary-600 border-8 border-solid border-transparent select-none px-4 pt-4;
        padding-bottom: 100%;

        &:global(.hovering) {
            @apply border-white/50;
            & :global(.objcardhand) {
                @apply !brightness-100;

                & :global(.card) {
                    @apply !mt-0;
                }
            }
        }
    }
</style>
