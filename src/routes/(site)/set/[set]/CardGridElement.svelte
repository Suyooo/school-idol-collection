<script lang="ts">
	import type Card from "$models/card/card.js";
	import { cardRarityShort, cardType } from "$lib/card/strings.js";
	import { cardIsMember, cardIsSong } from "$lib/card/types.js";
	import { CardSongRarity } from "$lib/enums/cardRarity.js";
	import CardImage from "$lib/format/CardImage.svelte";

	export let card: Card;
	export let squareCorners: boolean = false;
</script>

<a href="/card/{card.cardNo}" class="grid-item" class:rounded-2xl={!squareCorners}>
	<div class="imgcont">
		<CardImage {card} />
		<CardImage {card} back />
	</div>
	<div class="namecont">
		<span>⏵</span>
		<span>
			{#if cardIsMember(card) || (cardIsSong(card) && card.song.rarity === CardSongRarity.GR)}
				<span class="rarity">{cardRarityShort(card)}</span>
			{/if}
			{card.nameEng || card.nameJpn}
		</span>
	</div>
	<div class="linecont">
		<span>{card.cardNo}</span><span>{cardType(card)}</span>
	</div>
</a>

<style lang="postcss">
	.grid-item {
		@apply flex flex-col bg-background-grid p-1 no-underline;

		& > * {
			@apply flex-shrink-0 flex-grow-0 basis-0;
		}

		& > .imgcont {
			@apply mb-1 flex w-full basis-36 content-center items-center justify-center gap-2 overflow-hidden rounded-xl bg-background-panel px-2;

			& > :global(img) {
				@apply max-h-32 max-w-[50%] basis-0 object-contain;
			}
		}

		& > .namecont {
			@apply my-1 flex-grow leading-[1.1rem];
		}

		& > .namecont,
		& > .linecont {
			@apply flex pr-2 font-bold no-underline;
		}

		& > .namecont > span,
		& > .linecont > span {
			@apply flex-shrink-0 flex-grow-0 basis-0 pl-2;
		}

		& > .namecont > span:last-child {
			@apply underline;
		}

		& > .namecont > span:first-child {
			@apply text-text-subtle no-underline;
		}

		& > .linecont > span {
			@apply text-center text-xs uppercase tracking-widest text-text no-underline;
		}

		& > .namecont > span:last-child,
		& > .linecont > span {
			@apply flex-grow;
		}
	}
</style>
