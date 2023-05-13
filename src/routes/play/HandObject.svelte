<script context="module" lang="ts">
    import HandCardObject from "./HandCardObject.svelte";
    import type { ClientGameLogic } from "$lib/play/schema.js";
    import interact from "@interactjs/interact/index";
    import "@interactjs/actions/drop";
</script>

<script lang="ts">
    export let cardNos: string[];
    export let logic: ClientGameLogic;

    function action(node: HTMLElement) {
        const interactable = interact(node).dropzone({
            accept: ".objcardfieldmember",
            overlap: "center",
            listeners: {
                drop(event) {
                    node.classList.remove("hovering");
                    console.log("HANDDROP", event);
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

    /*function returnCard(e: Event & DroppableEvent) {
        logic.requestFieldToHand(parseInt(e.detail.draggable.element.dataset.id!));
    }

    function noHandCards(e: HTMLElement) {
        return !e.classList.contains("handcardcontainer");
    }*/
</script>

<div class="hand" use:action>
    {#key cardNos}
        {#each cardNos as cardNo, i}
            <HandCardObject idx={i} {cardNo} />
        {/each}
    {/key}
</div>

<style lang="postcss">
    .hand {
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
