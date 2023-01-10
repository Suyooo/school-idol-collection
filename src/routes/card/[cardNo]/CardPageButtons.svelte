<script lang="ts">
    export let prevCardNo: string | null;
    export let nextCardNo: string | null;
    export let cardSet: string;
    export let listLinksOnLargeOnly: boolean = false;
</script>

<div class="buttons row">
    <div class="col-min flex">
        {#if prevCardNo}
            <a class="button button-primary" href="/card/{prevCardNo}">🢀</a>
        {:else}
            <button class="button pointer-events-none !bg-primary-900" disabled>🢀</button>
        {/if}
        {#if nextCardNo}
            <a class="button button-primary" href="/card/{nextCardNo}">🢂</a>
        {:else}
            <button class="button pointer-events-none !bg-primary-900" disabled>🢂</button>
        {/if}
    </div>
    <div class="col-min lg:flex" class:hidden={listLinksOnLargeOnly} class:flex={!listLinksOnLargeOnly}>
        <a class="button" href="/set/{cardSet}">View Set</a>
    </div>
    <div class="col-min lg:flex" class:hidden={listLinksOnLargeOnly} class:flex={!listLinksOnLargeOnly}>
        <a class="button" href="/list">View Full Card List</a>
    </div>
</div>

<style lang="postcss">
    .buttons {
        @apply gap-x-8 gap-y-4 justify-center flex flex-col lg:flex-row;
    }

    .buttons > .col-min {
        @apply gap-x-4 whitespace-nowrap;
    }

    .buttons > .col-min .button {
        @apply flex-grow flex-shrink-0 basis-0 lg:flex-grow-0 text-center;
    }
</style>