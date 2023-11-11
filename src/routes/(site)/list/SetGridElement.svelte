<script lang="ts">
	import CardListGridElement from "$lib/style/CardListGridElement.svelte";
	import type Set from "$models/set/set.js";

	export let set: Set;
</script>

<CardListGridElement href="/set/{set.id}" title={set.eng}>
	<img src="/images/cards/{set.id}/set.jpg" alt={set.id} />
</CardListGridElement>

<style lang="postcss">
	:global(.grid-item .imgcont) {
		@apply bg-white;
	}
</style>
