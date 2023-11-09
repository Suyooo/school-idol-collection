<script lang="ts" context="module">
	import { Splide, SplideSlide } from "@splidejs/svelte-splide";
	import "@splidejs/svelte-splide/css";
	import Search from "$lib/style/icons/Search.svelte";
	import CardList from "$lib/style/icons/home/CardList.svelte";
	import HowToPlay from "$lib/style/icons/home/HowToPlay.svelte";
	import More from "$lib/style/icons/home/More.svelte";
	import Print from "$lib/style/icons/home/Print.svelte";
	import type { PageServerData } from "./$types.js";
	import SetGridElement from "./list/SetGridElement.svelte";
	import CardGridElement from "./set/[set]/CardGridElement.svelte";
</script>

<script lang="ts">
	export let data: PageServerData;
</script>

<svelte:head>
	<title>SIC</title>
</svelte:head>

<div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
	<div class="content col-span-2">
		<h3>Newest Set</h3>
		<div class=" full-img-element grid grid-cols-1 gap-y-2 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-0">
			<div class="flippable-set-element">
				<SetGridElement set={data.latestSet} />
			</div>
			<div class="col-span-2 overflow-hidden rounded-2xl">
				<Splide
					options={{
						label: `Cards from Set ${data.latestSet.id}`,
						autoplay: true,
						interval: 3000,
						rewind: true,
						type: "loop",
					}}
				>
					{#each data.latestSetCards as slot, i (i)}
						<SplideSlide>
							<div class="mb-8 sm:mb-0">
								<CardGridElement card={slot[Math.floor(Math.random() * slot.length)]} squareCorners />
							</div>
						</SplideSlide>
					{/each}
				</Splide>
			</div>
		</div>
	</div>
	<div class="content">
		<h3>Newest Card</h3>
		<div class="full-img-element !p-0">
			<CardGridElement card={data.latestCard} />
		</div>
	</div>
	<div class="content col-span-2">
		<h3>What Is SIC?</h3>
		<div class="panel">
			<div class="panel-inner text-justify">
				<b>School Idol Collection</b> is a Collectible Card Game with characters from the Love&nbsp;Live! franchise,
				where your goal is to perform a successful live show! Manage your Members on the Stage, organize Lives with
				songs from your Set List, and be the first to reach the Live Points goal to win!<br /><br />
				You can play alone or with as many people as you want, dive deep into deckbuilding to find new ways to score points
				even faster - or just enjoy the illustrations, with both cards from the original School Idol Festival game and original
				designs, and collect them all!<br /><br />
				This site aims to be a complete repository for translations of both the game's cards and official help pages. Maybe
				you already have collected some of the cards because they looked neat, but never knew how the CCG itself works? Check
				out <a href="/faq/rules">the How To Play page</a>, look up your cards with the Quick Search in the top right of
				the site, and give SIC a try!<br /><br />
				In the future, this site will hopefully offer even more, including some deckbuilding helpers and even the ability
				to play-test right in your browser &ndash; to share this little card game I like with everyone, and give other Love&nbsp;Live!
				fans the chance to try it. But for now, I hope you enjoy browsing through all the cards SIC has to offer!
			</div>
		</div>
	</div>
	<div class="content flex flex-col">
		<h3 class="flex-grow-0">Get Started</h3>
		<div class="flex flex-grow flex-col justify-between">
			<a href="/faq/rules" class="button panel big-link">
				<HowToPlay />
				<div>How To Play</div>
			</a>
			<a href="/list" class="button panel big-link">
				<CardList />
				<div>Browse the Card List</div>
			</a>
			<a href="/search" class="button panel big-link">
				<Search />
				<div>Search for Cards</div>
			</a>
			<a href="/labels" class="button panel big-link">
				<Print />
				<div>Print Labels</div>
			</a>
			<a href="https://lovelive-sic.com/" target="_blank" class="button panel big-link">
				<More />
				<div>Visit the Official Site</div>
			</a>
		</div>
	</div>
</div>

<style lang="postcss">
	.full-img-element {
		& :global(.imgcont) {
			@apply !basis-[unset] py-2 sm:!flex-grow;

			& :global(img) {
				@apply !max-h-full;
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
				@apply !basis-12 sm:!basis-[unset];
			}
			& :global(.namecont) {
				@apply sm:pb-4;
			}
		}
	}
</style>
