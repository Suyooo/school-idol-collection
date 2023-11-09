<script lang="ts">
	import type Card from "$models/card/card.js";
	import { cardLink } from "$lib/card/strings.js";

	export let subjects: (Card | { from: Card; to: Card })[];

	function isMultipleSubjects(s: Card | { from: Card; to: Card }): s is { from: Card; to: Card } {
		return "from" in s;
	}
</script>

{#each subjects as subject}
	{#if isMultipleSubjects(subject)}
		<h3 id={subject.from.cardNo}>
			{@html cardLink(subject.from)} to {@html cardLink(subject.to)}
		</h3>
	{:else}
		<h3 id={subject.cardNo}>
			{@html cardLink(subject)}
		</h3>
	{/if}
{/each}
<slot />

<style lang="postcss">
	h3 {
		@apply mb-2;
		& + h3 {
			@apply -mt-4;
		}
	}
</style>
