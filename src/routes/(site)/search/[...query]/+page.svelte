<script lang="ts">
	import type { PageData } from "./$types.js";
	import SearchUi from "../SearchUi.svelte";
	import PageHeader from "$lib/style/PageHeader.svelte";
	import Skill from "$lib/format/Skill.svelte";
	import Button from "$lib/style/Button.svelte";
	import CardListGrid from "$lib/style/Grid.svelte";
	import Collapse from "$lib/style/icons/Collapse.svelte";
	import Expand from "$lib/style/icons/Expand.svelte";
	import CardGridElement from "$lib/style/CardGridElement.svelte";
	import type CardSearchResult from "$lib/types/cardSearchResult.js";
	import Go from "$lib/style/icons/Go.svelte";
	import Back from "$lib/style/icons/Back.svelte";
	import { urlToQueryMap } from "$lib/search/querymap.js";
	import type { SearchQueryMap } from "$lib/search/types.js";

	export let data: PageData;

	let query: SearchQueryMap,
		showOptions: boolean = false;

	$: {
		data;
		updateOptions();
	}
	function updateOptions() {
		query = urlToQueryMap(data.queryUrl);
		showOptions = false;
	}
</script>

<svelte:head>
	<title>Search ({data.queryExplain.join(", ")}) &bull; SIC</title>
	<link rel="canonical" href="/search/{data.queryUrl}" />
</svelte:head>

<PageHeader>Search</PageHeader>
<div class="panel mb-4">
	<div class="panel-inner pb-0">
		<div class="flex items-center" class:mb-4={showOptions}>
			<div class="flex-grow font-bold text-text-header-intext">
				{#each data.queryExplainPreparsed as q, i}
					{#if i > 0},
					{/if}<Skill skill={q} />
				{/each}
			</div>
			<Button
				class="flex items-center"
				on:click={() => (showOptions = !showOptions)}
				label={showOptions ? "Collapse Search Options" : "Expand Search Options"}
			>
				{#if showOptions}
					<Collapse />
				{:else}
					<Expand />
				{/if}
				<span class="ml-2">Change Search Query</span>
			</Button>
		</div>
		<div class:hidden={!showOptions}>
			<SearchUi bind:query />
		</div>
	</div>
</div>

{#if data.cards.length === 0}
	<div class="panel error">
		<div class="panel-inner">There are no results for this query.</div>
	</div>
{:else}
	<div class="panel">
		<div class="panel-inner">
			<h2>Results</h2>
			<CardListGrid items={data.cards} key="cardNo" let:item={card}>
				<CardGridElement {card} />
			</CardListGrid>

			<div class="mt-6 flex flex-col items-center gap-y-2">
				<div>
					Cards {(data.pagination.page - 1) * data.pagination.pageSize + 1}
					- {Math.min(data.pagination.page * data.pagination.pageSize, data.pagination.totalResults)}
					of {data.pagination.totalResults}
				</div>
				{#if data.pagination.totalResults > data.pagination.pageSize}
					{@const queryUrl = data.queryUrl}
					<div class="flex items-center gap-2">
						<div class="w-12">
							{#if data.pagination.page > 1}
								<Button
									class="h-6 w-12 px-0"
									label={`Previous Page`}
									href={`/search/${queryUrl}${data.pagination.page > 2 ? `/page=${data.pagination.page - 1}` : ""}`}
								>
									<Back />
								</Button>
							{/if}
						</div>
						<div class="flex max-w-md flex-wrap justify-center gap-2">
							{#each { length: Math.ceil(data.pagination.totalResults / data.pagination.pageSize) } as _, i}
								<Button
									class="w-12 px-0"
									accent={i + 1 === data.pagination.page}
									label={`Page ${i + 1}`}
									href={`/search/${queryUrl}${i > 0 ? `/page=${i + 1}` : ""}`}
								>
									{i + 1}
								</Button>
							{/each}
						</div>
						<div class="w-12">
							{#if data.pagination.page < data.pagination.totalResults / data.pagination.pageSize}
								<Button
									class="h-6 w-12 px-0"
									label={`Next Page`}
									href={`/search/${queryUrl}/page=${data.pagination.page + 1}`}
								>
									<Go />
								</Button>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
