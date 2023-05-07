<script lang="ts">
    export let header: string;
    export let entries: { label: string; handler: () => void }[];
    export let x: number = 0;
    export let y: number = 0;
</script>

<div class="panel" style:left={`${x}px`} style:top={`${y}px`}>
    <div class="panel-inner">
        <h4>{@html header}</h4>
        {#each entries as entry}
            <button on:click={entry.handler}>{@html entry.label}</button>
        {/each}
    </div>
</div>

<style lang="postcss">
    .panel {
        @apply absolute rounded-tl-none select-none;
        z-index: 2000000000;

        & .panel-inner {
            @apply p-0 flex flex-col gap-y-1;

            & h4 {
                @apply text-sm px-4 m-0;
            }

            & button {
                @apply px-2 py-1 bg-primary-600 hover:bg-primary-500 text-left;
            }
        }
    }
</style>
