<script lang="ts">
	import { page } from "$app/stores";
	import type { SearchQueryMap } from "$lib/search/types.js";
	import SearchUi from "./SearchUi.svelte";
	import PageHeader from "$lib/style/PageHeader.svelte";
	import type { Snapshot } from "./$types.js";

	let query: SearchQueryMap = {},
		loadedFromSnapshot = false;

	export const snapshot: Snapshot = {
		capture: () => query,
		restore: (value) => {
			query = value;
			loadedFromSnapshot = true;
		},
	};
</script>

<svelte:head>
	<title>Search &bull; SIC</title>
</svelte:head>

<div class="panel error mb-4">
	<div class="panel-inner">
		<b>Error in Search Query:</b>
		{$page.error?.message}
	</div>
</div>

<PageHeader>Search</PageHeader>
<div class="panel">
	<div class="panel-inner">
		{#key loadedFromSnapshot}
			<SearchUi bind:query />
		{/key}
	</div>
</div>
