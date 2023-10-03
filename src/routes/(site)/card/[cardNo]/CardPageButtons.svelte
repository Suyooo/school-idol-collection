<script lang="ts">
    import Button from "$l/style/Button.svelte";

    export let prevCardNo: string | null;
    export let nextCardNo: string | null;
    export let cardSet: string;
    export let listLinksOnLargeOnly: boolean = false;
</script>

<div class="buttons row">
    <div class="col-min flex">
        <Button href="/card/{prevCardNo}" label="Previous Card" accent disabled={prevCardNo === null}>🢀</Button>
        <Button href="/card/{nextCardNo}" label="Next Card" accent disabled={nextCardNo === null}>🢂</Button>
    </div>
    <div class="col-min lg:flex" class:hidden={listLinksOnLargeOnly} class:flex={!listLinksOnLargeOnly}>
        <Button label="View Set" href="/set/{cardSet}">View Set</Button>
    </div>
    <div class="col-min lg:flex" class:hidden={listLinksOnLargeOnly} class:flex={!listLinksOnLargeOnly}>
        <Button label="View Full Card List" href="/list">View Full Card List</Button>
    </div>
</div>

<style lang="postcss">
    .buttons {
        @apply gap-x-8 gap-y-4 justify-center flex flex-col lg:flex-row;
    }

    .buttons > .col-min {
        @apply gap-x-4 whitespace-nowrap;
    }

    .buttons > .col-min :global(a),
    .buttons > .col-min :global(div) {
        @apply flex-grow flex-shrink-0 basis-0 lg:flex-grow-0 text-center;
    }
</style>
