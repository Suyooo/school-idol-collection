<script context="module" lang="ts">
    import HandCardObject from "./HandCardObject.svelte";
</script>

<script lang="ts">
    export let cardNos: string[];
</script>

<div class="hand">
    {#each cardNos as cardNo, i (i)}
        <HandCardObject idx={i} {cardNo} />
    {/each}
</div>

<style lang="postcss">
    .hand {
        @apply absolute z-play-ui flex items-start justify-center bg-primary-600;
        left: 0;
        right: 0;
        bottom: 0;
        height: 15vh;
    }
</style>