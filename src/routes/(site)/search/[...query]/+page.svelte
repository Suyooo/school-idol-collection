<script lang="ts">
	import { goto } from "$app/navigation";
	import type Card from "$models/card/card.js";
	import type { ParseNodePrepared } from "$lib/format/format.js";
	import type { SearchUiOptions } from "$lib/search/ui.js";
	import { urlToUiOptions } from "$lib/search/ui.js";
	import Skill from "$lib/format/Skill.svelte";
	import Button from "$lib/style/Button.svelte";
	import CardListGrid from "$lib/style/CardListGrid.svelte";
	import Collapse from "$lib/style/icons/Collapse.svelte";
	import Expand from "$lib/style/icons/Expand.svelte";
	import type { PageData } from "./$types.js";
	import CardGridElement from "../../set/[set]/CardGridElement.svelte";
	import SearchOptions from "../SearchOptions.svelte";

	export let data: PageData;
	let cards: Card[],
		queryUrl: string,
		options: SearchUiOptions,
		showOptions: boolean = false,
		queryExplain: ParseNodePrepared[][],
		pagination: { page: number; totalResults: number; pageSize: number };
	$: {
		cards = data.cards;
		showOptions = false;
	}
	$: queryUrl = data.queryUrl;
	$: options = urlToUiOptions(queryUrl);
	$: queryExplain = data.queryExplain;
	$: pagination = data.pagination;
</script>

<svelte:head>
	<title>Search Results &bull; SIC</title>
</svelte:head>

<div class="content">
	<h3>Search Results</h3>

	<div class="panel mb-8">
		<div class="panel-inner pb-0">
			<div class="flex items-center">
				<div class="flex-grow font-bold text-text-header-inpanel">
					{#each queryExplain as q, i}
						{#if i > 0},{/if}
						<Skill skill={q} />
					{/each}
				</div>
				<Button
					class="flex items-center"
					onpanel
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
				{#key queryUrl}
					<SearchOptions {options} />
				{/key}
			</div>
		</div>
	</div>
	{#if cards.length === 0}
		<div class="panel !bg-error-background">
			<div class="panel-inner !py-2">There are no results for this query.</div>
		</div>
	{:else}
		<CardListGrid items={cards} key="cardNo" let:item={card}>
			<CardGridElement {card} />
		</CardListGrid>

		{#if pagination.totalResults > pagination.pageSize}
			<div class="mt-2 flex flex-col items-center gap-y-2">
				<div>
					Cards {(pagination.page - 1) * pagination.pageSize + 1}
					- {Math.min(pagination.page * pagination.pageSize, pagination.totalResults)}
					of {pagination.totalResults}
				</div>
				<div class="flex max-w-md flex-wrap justify-center gap-2">
					{#each { length: Math.ceil(pagination.totalResults / pagination.pageSize) } as _, i}
						<Button
							class="w-12 px-0"
							accent={i + 1 === pagination.page}
							label={`Page ${i + 1}`}
							on:click={() => goto(`/search/${queryUrl}/page:${i + 1}`)}>{i + 1}</Button
						>
					{/each}
				</div>
			</div>
		{/if}
	{/if}
</div>
