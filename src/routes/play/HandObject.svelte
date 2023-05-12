<script context="module" lang="ts">
    import HandCardObject from "./HandCardObject.svelte";
    import { droppable } from "svelte-agnostic-draggable";
    import type { ClientGameLogic } from "$lib/play/schema.js";
</script>

<script lang="ts">
    export let cardNos: string[];
    export let logic: ClientGameLogic;

    function returnCard(e: Event & DroppableEvent) {
        logic.requestFieldToHand(parseInt(e.detail.draggable.element.dataset.id!));
    }

    function noHandCards(e: HTMLElement) {
        return !e.classList.contains("handcardcontainer");
    }
</script>

<div class="hand"
    use:droppable={{ scope: "0", accept: noHandCards }}
    on:droppable:drop={returnCard}>
    {#key cardNos}
        {#each cardNos as cardNo, i}
            <HandCardObject idx={i} {cardNo} />
        {/each}
    {/key}
</div>

<style lang="postcss">
    .hand {
        @apply absolute z-play-hand flex items-start justify-center bg-primary-600 border-4 border-solid border-transparent;
        left: 0;
        right: 0;
        bottom: -15vh;
        height: 30vh;
        padding-top: 1vh;
    
        &:global(.ui-droppable-hover) {
            @apply border-white/50;
        }
    }
</style>