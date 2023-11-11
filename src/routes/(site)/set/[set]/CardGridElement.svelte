<script lang="ts">
	import type Card from "$models/card/card.js";
	import { cardRarityShort, cardType } from "$lib/card/strings.js";
	import CardImage from "$lib/format/CardImage.svelte";
	import CardListGridElement from "$lib/style/CardListGridElement.svelte";

	export let card: Card;
	export let squareCorners: boolean = false;
</script>

<CardListGridElement
	href="/card/{card.cardNo}"
	title={`<span class="rarity">${cardRarityShort(card)}</span> ${card.nameEng || card.nameJpn}`}
	{squareCorners}
	extraInfoLeft={card.cardNo}
	extraInfoRight={cardType(card)}
>
	<CardImage {card} />
	<CardImage {card} back />
</CardListGridElement>

<style lang="postcss">
	:global(.grid-item .imgcont) {
		@apply bg-background-grid;
	}
</style>
