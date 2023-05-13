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
    export function getHandIndex(event: DropEvent): number {
        if (cardNos.length === 0) {
            return 0;
        }

        const cardCenterX = event.dragEvent.rect.left + event.dragEvent.rect.width / 2;
        const handCenterX = event.target.clientWidth / 2;

        if (cardNos.length === 1) {
            return cardCenterX < handCenterX ? 0 : 1;
        } else {
            // TODO: scroll position of hand row
            const totalCardWidth = (displayCardNos.length + 1) * 65;
            let checkX = handCenterX - Math.floor(totalCardWidth / 2) + 97;
            let ret = 0;
            while (cardCenterX > checkX && ret < displayCardNos.length) {
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
            accept: ".objcardfieldmember",
            overlap: "center",
            listeners: {
                enter(event) {
                    node.classList.add("hovering");
                    indicatorPos = getHandIndex(event);
                },
                move(event) {
                    indicatorPos = getHandIndex(event);
                },
                leave() {
                    node.classList.remove("hovering");
                    indicatorPos = null;
                },
                drop(event) {
                    node.classList.remove("hovering");
                    logic.requestFieldToHand(parseInt(event.relatedTarget.dataset.id!), getHandIndex(event));
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
    {#key displayCardNos}
        {#each displayCardNos as card}
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

        &:global(.hovering) {
            @apply border-white/50;
        }
    }
</style>
