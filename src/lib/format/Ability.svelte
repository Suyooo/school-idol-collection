<script lang="ts">
	import type CardType from "$lib/enums/cardType.js";
	import Language from "$lib/enums/language.js";

	export let rush: boolean = false;
	export let live: boolean = false;

	export let lang: Language = Language.ENG;
	export let cardType: CardType | undefined = undefined;
	cardType;

	let lbr: string, rbr: string;
	$: lbr = lang.leftSquareBracket;
	$: rbr = lang.rightSquareBracket;
</script>

{#if rush}
	{#if live}
		{@const title = `${lbr}RUSH${rbr}/${lbr}LIVE${rbr}`}
		<span class="skill-icon rush" {title}>{lbr}RUSH{rbr}</span>
		<span class="skill-icon or" {title}>/</span>
		<span class="skill-icon live" {title}>{lbr}LIVE{rbr}</span>
	{:else}
		{@const title = `${lbr}RUSH${rbr}`}
		<span class="skill-icon rush" {title}>{title}</span>
	{/if}
{:else if live}
	{@const title = `${lbr}LIVE${rbr}`}
	<span class="skill-icon live" {title}>{title}</span>
{:else}
	—
{/if}

<style lang="postcss">
	.skill-icon {
		@apply w-[2.88em];

		&.rush {
			background-image: url("/images/icons/ability_rush.png");
		}

		&.live {
			background-image: url("/images/icons/ability_live.png");
		}

		&.or {
			@apply absolute z-10 ml-[-.63em];
			background-image: url("/images/icons/ability_or.png");

			& + .live {
				@apply ml-[-.25em];
			}
		}
	}
</style>
