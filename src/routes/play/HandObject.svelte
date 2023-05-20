<script context="module" lang="ts">
    import { getContext } from "svelte";
    import interact from "@interactjs/interact/index";
    import "@interactjs/actions/drop";
    import type { DropEvent } from "@interactjs/types/index";
    import type { ClientGameLogic, HandCardSchema } from "$lib/play/schema.js";
    import HandCardObject from "./HandCardObject.svelte";
</script>

<script lang="ts">
    export let hand: HandCardSchema[];
    const logic: ClientGameLogic = getContext("logic");

    let draggingHandCardIdx: number | null = null;
    let indicatorPos: number | null = null;
    export function getHandIndex(event: DropEvent): number {
        const sizeOffset = draggingHandCardIdx === null ? 0 : 1;
        if (hand.length - sizeOffset === 0) {
            return 0;
        }

        const cardCenterX = event.dragEvent.rect.left + event.dragEvent.rect.width / 2;
        const handCenterX = event.target.clientWidth / 2;

        if (hand.length - sizeOffset === 1) {
            return cardCenterX < handCenterX ? 0 : 1;
        } else {
            // TODO: scroll position of hand row
            const totalCardWidth = (hand.length - sizeOffset + 1) * 65;
            let checkX = handCenterX - Math.floor(totalCardWidth / 2) + 32;
            let ret = 0;
            while (cardCenterX > checkX && ret < hand.length - sizeOffset) {
                checkX += 65;
                ret++;
            }
            return ret;
        }
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
                    }
                    indicatorPos = getHandIndex(event);
                },
                move(event) {
                    indicatorPos = getHandIndex(event);
                },
                leave(event) {
                    event.relatedTarget.classList.remove("inhand");
                    indicatorPos = draggingHandCardIdx = null;
                },
                drop(event) {
                    if (event.relatedTarget.classList.contains("objcardfieldmember")) {
                        logic.requestFieldToHand(parseInt(event.relatedTarget.dataset.id!), getHandIndex(event));
                    } else {
                        skipAnimations();
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

<div class="objhand" use:action>
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
        @apply absolute z-play-hand flex items-start justify-center bg-primary-600 border-4 border-solid border-transparent select-none;
        left: 0;
        right: 0;
        bottom: -15vh;
        height: 30vh;
        padding-top: 1vh;

        &:after {
            @apply pointer-events-none;
            content: " ";
            width: 65px;
        }
    }
</style>
