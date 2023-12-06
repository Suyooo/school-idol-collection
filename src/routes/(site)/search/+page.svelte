<script lang="ts">
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

<PageHeader>Search</PageHeader>
<div class="panel">
	<div class="panel-inner">
		{#key loadedFromSnapshot}
			<SearchUi bind:query />
		{/key}
	</div>
</div>
