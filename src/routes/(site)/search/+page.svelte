<script lang="ts">
	import { onMount } from "svelte";
	import type { SearchUiOptions } from "$lib/search/ui.js";
	import { urlToUiOptions } from "$lib/search/ui.js";
	import type { PageData, Snapshot } from "./$types.js";
	import SearchOptions from "./SearchOptions.svelte";
	import PageHeader from "$lib/style/PageHeader.svelte";
	import { goto } from "$app/navigation";
	import Skill from "$lib/format/Skill.svelte";
	import Button from "$lib/style/Button.svelte";
	import CardListGrid from "$lib/style/CardListGrid.svelte";
	import Collapse from "$lib/style/icons/Collapse.svelte";
	import Expand from "$lib/style/icons/Expand.svelte";
	import CardGridElement from "../set/[set]/CardGridElement.svelte";
	import type CardSearchResult from "$lib/types/cardSearchResult.js";

	export let data: {} | CardSearchResult<true>;

	let options: SearchUiOptions,
		showOptions: boolean = false;

	function hasResults(data: any): data is CardSearchResult<true> {
		return data.hasOwnProperty("cards");
	}
	$: options = hasResults(data) ? urlToUiOptions(data.queryUrl) : {};

	export const snapshot: Snapshot = {
		capture: () => options,
		restore: (value) => (options = value),
	};

	onMount(() => {
		if (!hasResults(data) && history.state.prefillQueryUrl) {
			options = urlToUiOptions(history.state.prefillQueryUrl);
		}
	});
</script>

<svelte:head>
	<title>Search &bull; SIC</title>
</svelte:head>

<PageHeader>Search</PageHeader>
{#if !hasResults(data)}
	<div class="panel">
		<div class="panel-inner">
			<SearchOptions {options} />
		</div>
	</div>
{:else}
	<div class="panel mb-4">
		<div class="panel-inner pb-0">
			<div class="flex items-center">
				<div class="flex-grow font-bold text-text-header-intext">
					{#each data.queryExplain as q, i}
						{#if i > 0},{/if}
						<Skill skill={q} />
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
			<div class="mt-4" class:hidden={!showOptions}>
				{#key data.queryUrl}
					<SearchOptions {options} />
				{/key}
			</div>
		</div>
	</div>
	{#if data.cards.length === 0}
		<div class="panel !border-error-border !bg-error-background">
			<div class="panel-inner">There are no results for this query.</div>
		</div>
	{:else}
		<div class="panel">
			<div class="panel-inner">
				<h2>Results</h2>
				<CardListGrid items={data.cards} key="cardNo" let:item={card}>
					<CardGridElement {card} />
				</CardListGrid>
			</div>
		</div>

		{#if data.pagination.totalResults > data.pagination.pageSize}
			<div class="mt-2 flex flex-col items-center gap-y-2">
				<div>
					Cards {(data.pagination.page - 1) * data.pagination.pageSize + 1}
					- {Math.min(data.pagination.page * data.pagination.pageSize, data.pagination.totalResults)}
					of {data.pagination.totalResults}
				</div>
				<div class="flex max-w-md flex-wrap justify-center gap-2">
					{#each { length: Math.ceil(data.pagination.totalResults / data.pagination.pageSize) } as _, i}
						{@const queryUrl = data.queryUrl}
						<Button
							class="w-12 px-0"
							accent={i + 1 === data.pagination.page}
							label={`Page ${i + 1}`}
							on:click={() => goto(`/search${queryUrl}&page=${i + 1}`)}
						>
							{i + 1}
						</Button>
					{/each}
				</div>
			</div>
		{/if}
	{/if}
{/if}
