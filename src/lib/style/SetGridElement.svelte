<script lang="ts">
	import BaseGridElement from "./BaseGridElement.svelte";
	import type Set from "$models/set/set.js";

	export let set: Set;
</script>

<div class="contents">
	<BaseGridElement href="/set/{set.id}" title={set.eng}>
		<img src="/images/cards/{set.id}/set.jpg" alt={set.id} class="contain" />
	</BaseGridElement>
</div>

<style lang="postcss">
	div :global(.imgcont) {
		@apply bg-white;
	}
</style>
