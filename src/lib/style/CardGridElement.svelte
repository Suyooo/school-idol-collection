<script lang="ts">
	import type Card from "$models/card/card.js";
	import { cardRarityShort, cardType } from "$lib/card/strings.js";
	import CardImage from "$lib/format/CardImage.svelte";
	import BaseGridElement from "./BaseGridElement.svelte";

	export let card: Card;
	export let squareCorners: boolean = false;
</script>

<div class="contents">
	<BaseGridElement
		href="/card/{card.cardNo}"
		title={`<span class="rarity">${cardRarityShort(card)}</span> ${card.nameEng || card.nameJpn}`}
		{squareCorners}
		extraInfoLeft={card.cardNo}
		extraInfoRight={cardType(card)}
	>
		<CardImage {card} />
		<CardImage {card} back />
	</BaseGridElement>
</div>

<style lang="postcss">
	div :global(.imgcont) {
		@apply bg-background-grid;
	}
</style>
