<script lang="ts" context="module">
	import { Splide, SplideSlide } from "@splidejs/svelte-splide";
	import "@splidejs/svelte-splide/css";
	import Search from "$lib/style/icons/Search.svelte";
	import CardList from "$lib/style/icons/biglink/CardList.svelte";
	import HowToPlay from "$lib/style/icons/biglink/HowToPlay.svelte";
	import ExternalLink from "$lib/style/icons/biglink/ExternalLink.svelte";
	import Print from "$lib/style/icons/biglink/Print.svelte";
	import type { PageServerData } from "./$types.js";
	import SetGridElement from "$lib/style/SetGridElement.svelte";
	import CardGridElement from "$lib/style/CardGridElement.svelte";
	import BigLink from "$lib/style/BigLink.svelte";
	import { browser } from "$app/environment";
</script>

<script lang="ts">
	export let data: PageServerData;
</script>

<svelte:head>
	<title>SIC</title>
	<noscript>
		<style>
			.splidespacer {
				pointer-events: auto !important;
				opacity: 1 !important;
			}
		</style>
	</noscript>
</svelte:head>

<h1 class="sr-only">Front Page</h1>
<div class="grid grid-cols-1 gap-y-4 lg:grid-cols-3 lg:gap-x-4">
	<div class="panel col-span-2">
		<div class="panel-inner">
			<h2 class="mb-4">Newest Set</h2>
			<div class="full-img-element grid grid-cols-1 gap-y-2 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-0">
				<div class="flippable-set-element">
					<SetGridElement set={data.latestSet} />
				</div>
				<div class="splide">
					{#if browser}
						<Splide
							options={{
								label: `Cards from Set ${data.latestSet.id}`,
								autoplay: true,
								interval: 5000,
								rewind: true,
								type: "loop",
							}}
						>
							{#each data.latestSetCards as slot}
								{@const pickIdx = Math.floor(Math.random() * slot.length)}
								<SplideSlide>
									<CardGridElement card={slot[pickIdx]} squareCorners />
								</SplideSlide>
							{/each}
						</Splide>
					{:else}
						<div class="splidespacer">
							<CardGridElement
								card={data.latestSetCards[data.latestSetCardHighlightId[0]][data.latestSetCardHighlightId[1]]}
							/>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div class="panel">
		<div class="panel-inner">
			<h2 class="mb-4">Newest Card</h2>
			<div class="full-img-element !p-0">
				<CardGridElement card={data.latestCard} />
			</div>
		</div>
	</div>
	<div class="panel col-span-2">
		<div class="panel-inner">
			<h2>What Is SIC?</h2>
			<b>School Idol Collection</b> is a Collectible Card Game with characters from the Love&nbsp;Live! franchise, where
			your goal is to perform a successful live show! Manage your Members on the Stage, organize Lives with songs from
			your Set List, and be the first to reach the Live Points goal to win!<br /><br />
			This game uses illustrations and ideas from the original School Idol Festival game and remixes them into a turn-based
			strategy game. You can play alone or with as many people as you want, dive deep into deckbuilding to find new ways
			to score points even faster - or just enjoy the illustrations, with both familiar cards from SIF and original designs,
			and collect them all!<br /><br />
			Maybe you already have collected some of the cards because they looked neat, but never knew how the CCG itself works?
			Check out <a href="/faq">the How To Play page</a>, look up your cards with the Quick Search in the top right of
			the site, and give SIC a try!<br /><br />
			Right now, this site aims to be a complete repository for translations of both the game's cards and official help pages,
			with some extra bits like linking to search results right from Skill texts and the Label Printer. In the future, this
			site will hopefully offer even more, including deckbuilding helpers and even the ability to play-test right in your
			browser &ndash; to share this little card game I like with everyone, and give other Love&nbsp;Live! fans the chance
			to try it. But for now, I hope you enjoy browsing through all the cards SIC has to offer!
		</div>
	</div>
	<div class="panel">
		<div class="panel-inner flex h-full flex-col">
			<h2 class="mb-4 flex-grow-0">Get Started</h2>
			<div class="flex flex-grow flex-col justify-between gap-2">
				<BigLink href="/faq"><HowToPlay slot="icon" /> How To Play</BigLink>
				<BigLink href="/list"><CardList slot="icon" /> Browse the Card List</BigLink>
				<BigLink href="/search"><Search slot="icon" /> Search for Cards</BigLink>
				<BigLink href="/labels"><Print slot="icon" /> Print Labels</BigLink>
				<BigLink href="https://lovelive-sic.com/" target="_blank">
					<ExternalLink slot="icon" />
					<svelte:fragment slot="primary">Visit the Official Site</svelte:fragment>
					<svelte:fragment slot="secondary">(Japanese, External Link)</svelte:fragment>
				</BigLink>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.full-img-element {
		& :global(.imgcont) {
			@apply !basis-[unset] py-2 sm:!flex-grow;
			height: 181px;

			& :global(img) {
				@apply !max-h-full !max-w-full;
			}
			& :global(img.card-v) {
				height: 181px;
			}
			& :global(img.card-h) {
				height: 130px;
			}
		}
		& :global(.namecont) {
			@apply sm:!flex-grow-0;
		}
	}
	.flippable-set-element {
		& :global(.grid-item) {
			@apply !flex-row items-center sm:h-full sm:!flex-col sm:items-start;
			& :global(.imgcont) {
				@apply !basis-12 max-sm:!mb-0 sm:!basis-[unset] h-[unset];
			}
			& :global(.namecont) {
				@apply sm:pb-4;
			}
		}
	}

	.splide {
		@apply visible relative col-span-2 overflow-hidden rounded;

		& :global(.splide__arrow) {
			@apply top-[calc(50%_-_1.25rem)] bg-background-accent opacity-100;
			& :global(svg) {
				@apply fill-text-header-breadcrumb;
			}
		}

		& :global(.splide__pagination) {
			@apply bottom-14 flex justify-end;
			& :global(.splide__pagination__page) {
				@apply bg-background-accent opacity-100;
			}
			& :global(.splide__pagination__page.is-active) {
				@apply bg-text-header-breadcrumb;
			}
		}
	}
	.splidespacer {
		@apply pointer-events-none opacity-0;
	}
</style>
