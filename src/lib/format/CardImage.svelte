<script lang="ts">
	import type Card from "$models/card/card.js";
	import { cardIsMember } from "$lib/card/types.js";
	import { CardOrientation } from "$lib/enums/cardOrientation.js";
	import { CardMemberRarity } from "$lib/enums/cardRarity.js";

	export let card: Card | undefined = undefined;
	export let cardNo: string | undefined = undefined;
	export let orientation: CardOrientation | undefined = undefined;
	export let back: boolean = false;

	let set: string, secret: boolean, isLandscape: boolean, url: string;

	$: {
		const usedCardNo = <string>(card?.cardNo ?? cardNo);
		set = usedCardNo.split("-")[0];
		secret = card ? cardIsMember(card) && card.member.rarity === CardMemberRarity.Secret : false;
		isLandscape =
			(card ? (back ? card.backOrientation : card.frontOrientation) : orientation) === CardOrientation.LANDSCAPE;
		if (secret) url = `/images/cards/secret.jpg`;
		else url = `/images/cards/${set}/${usedCardNo}-${back ? "back" : "front"}.jpg`;
	}
</script>

{#key card}
	<img
		src={url}
		alt="{card?.cardNo ?? cardNo} {back ? 'Back' : 'Front'} Illustration"
		class:card-v={!isLandscape}
		class:card-h={isLandscape}
	/>
{/key}

<style lang="postcss">
	img {
		@apply rounded-card-fallback bg-background-highlight;

		&.card-v {
			@apply rounded-card-v;
		}

		&.card-h {
			@apply rounded-card-h;
		}
	}
</style>
