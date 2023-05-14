<script context="module" lang="ts">
    import { getContext } from "svelte";
    import HandCardObject from "./HandCardObject.svelte";
    import interact from "@interactjs/interact/index";
    import "@interactjs/actions/drop";
    import type { ClientGameLogic } from "$lib/play/schema.js";
    import type { DropEvent } from "@interactjs/types/index";
</script>

<script lang="ts">
    export let cardNos: string[];
    const logic: ClientGameLogic = getContext("logic");

    let indicatorPos: number | null = null;
    export function getHandIndex(event: DropEvent, sizeOffset: number = 0): number {
        if (cardNos.length - sizeOffset === 0) {
            return 0;
        }

        const cardCenterX = event.dragEvent.rect.left + event.dragEvent.rect.width / 2;
        const handCenterX = event.target.clientWidth / 2;

        if (cardNos.length - sizeOffset === 1) {
            return cardCenterX < handCenterX ? 0 : 1;
        } else {
            // TODO: scroll position of hand row
            const totalCardWidth = (displayCardNos.length - sizeOffset + 1) * 65;
            let checkX = handCenterX - Math.floor(totalCardWidth / 2) + 65;
            let ret = 0;
            while (cardCenterX > checkX && ret < displayCardNos.length - sizeOffset) {
                checkX += 65;
                ret++;
            }
            return ret;
        }
    }

    let displayCardNos: { idx: number; cardNo: string | null }[];
    $: {
        displayCardNos = cardNos.map((cardNo, idx) => ({ idx, cardNo }));
        if (indicatorPos !== null) {
            displayCardNos.splice(indicatorPos, 0, { idx: -1, cardNo: null });
        }
    }

    function action(node: HTMLElement) {
        const interactable = interact(node).dropzone({
            accept: ".objcardfieldmember, .objcardhand",
            overlap: "center",
            listeners: {
                enter(event) {
                    event.relatedTarget.classList.add("inhand");
                    indicatorPos = getHandIndex(event);
                },
                move(event) {
                    if (event.relatedTarget.classList.contains("objcardfieldmember")) {
                        indicatorPos = getHandIndex(event);
                    } else {
                        const newIndicatorPos = getHandIndex(event, -1);
                        if (newIndicatorPos > indicatorPos!) {
                            indicatorPos = newIndicatorPos - 1;
                        } else {
                            indicatorPos = newIndicatorPos;
                        }
                    }
                },
                leave(event) {
                    event.relatedTarget.classList.remove("inhand");
                    indicatorPos = null;
                },
                drop(event) {
                    if (event.relatedTarget.classList.contains("objcardfieldmember")) {
                        logic.requestFieldToHand(parseInt(event.relatedTarget.dataset.id!), getHandIndex(event));
                    } else {
                        indicatorPos = null;
                        const oldIdx = parseInt(event.relatedTarget.dataset.idx!);
                        const newIdx = getHandIndex(event, -1);
                        console.log(oldIdx, newIdx);
                        if (oldIdx !== newIdx) logic.requestHandMove(oldIdx, newIdx);
                        else {
                            event.relatedTarget.classList.remove("inhand");
                        }
                    }
                    indicatorPos = null;
                },
            },
        });

        return {
            destroy: () => interactable.unset(),
        };
    }
</script>

<div class="objhand" use:action>
    {#key cardNos}
        {#each displayCardNos as card (card.idx)}
            <HandCardObject {...card} />
        {/each}
    {/key}
</div>

<style lang="postcss">
    .objhand {
        @apply absolute z-play-hand flex items-start justify-center bg-primary-600 border-4 border-solid border-transparent select-none;
        left: 0;
        right: 0;
        bottom: -15vh;
        height: 30vh;
        padding-top: 1vh;
    }
</style>
