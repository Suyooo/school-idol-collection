<script lang="ts">
	import type CardType from "$lib/enums/cardType.js";
	import Language from "$lib/enums/language.js";

	export let repl: string;
	export let lang: Language = Language.ENG;
	export let cardType: CardType | undefined = undefined;
	cardType;
</script>

<span
	><span class="skill-icon" class:jpn={lang === Language.JPN} title={repl}>{repl}</span
	>{#if lang === Language.ENG}&nbsp;Pieces{/if}</span
>

<style lang="postcss">
	.skill-icon {
		@apply mt-[0.03em] w-[3.285em];
		background-image: url("/images/icons/idolized.png");

		&.jpn {
			@apply w-[2.133em];
			background-image: url("/images/icons/idolized_jpn.png");
		}
	}
</style>
