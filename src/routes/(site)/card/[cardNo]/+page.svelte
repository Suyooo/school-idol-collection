<script lang="ts">
	import type Card from "$models/card/card.js";
	import { cardTitle } from "$lib/card/strings.js";
	import Language from "$lib/enums/language.js";
	import type CardPageExtraInfo from "$lib/types/cardPageExtraInfo.js";
	import CardImage from "$lib/format/CardImage.svelte";
	import type { PageData } from "./$types.js";
	import CardInfoRows from "./CardInfoRows.svelte";
	import CardPageButtons from "./CardPageButtons.svelte";
	import Go from "$lib/style/icons/Go.svelte";

	export let data: PageData;
	let card: Card & CardPageExtraInfo<true, true>;
	$: card = data.card;
</script>

<svelte:head>
	<title>{cardTitle(card, false)} &bull; SIC</title>
</svelte:head>

<h1>
	<div>
		<a class="button" href="/list">Card List</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
		<a class="button" href="/set/${card.cardSet}">{card.cardSet}</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
	</div>
	<span class="whitespace-pre-line normal-case tracking-wide">{@html cardTitle(card, true, Language.ENG, true)}</span>
</h1>

<div class="panel">
	<div class="panel-inner lg:flex lg:gap-4">
		<div class="imgcont">
			<div>
				<CardImage {card} />
			</div>
			<div>
				<CardImage {card} back />
			</div>
		</div>
		<div class="flex flex-grow flex-col">
			<div class="mb-4">
				<CardPageButtons
					showBackLinksOnlyOnLarge
					prevCardNo={card.neighbors.prev}
					nextCardNo={card.neighbors.next}
					cardSet={card.cardSet}
				/>
			</div>

			<div class="flex-grow">
				<CardInfoRows {card} />
			</div>

			<div class="mt-4">
				<CardPageButtons prevCardNo={card.neighbors.prev} nextCardNo={card.neighbors.next} cardSet={card.cardSet} />
			</div>
		</div>
	</div>
</div>
<div class="cardcopyright">{card.copyright}</div>

<style lang="postcss">
	.cardcopyright {
		@apply mb-1 mt-2 text-right text-xs text-text-subtle;
	}

	.imgcont {
		@apply mx-8 mb-4 flex flex-shrink-0 items-center justify-center gap-4 max-lg:h-card-long lg:mb-0 lg:w-card-long lg:flex-col lg:justify-start;

		& > div {
			@apply flex h-card-long w-card-long flex-shrink-0 items-center justify-center;
			& :global(img) {
				@apply max-w-full;
			}
		}
	}
</style>
