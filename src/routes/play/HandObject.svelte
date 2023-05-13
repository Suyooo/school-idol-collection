<script context="module" lang="ts">
    import HandCardObject from "./HandCardObject.svelte";
    import interact from "@interactjs/interact/index";
    import "@interactjs/actions/drop";
</script>

<script lang="ts">
    export let cardNos: string[];

    function action(node: HTMLElement) {
        const interactable = interact(node).dropzone({
            accept: ".objcardfieldmember",
            overlap: "center",
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
</script>

<div class="objhand" use:action>
    {#key cardNos}
        {#each cardNos as cardNo, i}
            <HandCardObject idx={i} {cardNo} />
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
