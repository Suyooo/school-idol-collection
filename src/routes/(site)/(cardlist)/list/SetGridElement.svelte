<script lang="ts">
	import CardListGridElement from "$lib/style/CardListGridElement.svelte";
	import type Set from "$models/set/set.js";

	export let set: Set;
</script>

<div class="contents">
	<CardListGridElement href="/set/{set.id}" title={set.eng}>
		<img src="/images/cards/{set.id}/set.jpg" alt={set.id} class="contain" />
	</CardListGridElement>
</div>

<style lang="postcss">
	div :global(.imgcont) {
		@apply bg-white;
	}
</style>
