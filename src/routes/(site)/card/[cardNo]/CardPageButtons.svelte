<script lang="ts">
	import Button from "$lib/style/Button.svelte";

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
		@apply flex flex-col justify-center gap-x-8 gap-y-4 lg:flex-row;
	}

	.buttons > .col-min {
		@apply gap-x-4 whitespace-nowrap;
	}

	.buttons > .col-min :global(a),
	.buttons > .col-min :global(div) {
		@apply flex-shrink-0 flex-grow basis-0 text-center lg:flex-grow-0;
	}
</style>
