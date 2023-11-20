<script lang="ts">
	import type { SearchQueryMap } from "$lib/search/types.js";
	import SearchUi from "./SearchUi.svelte";
	import PageHeader from "$lib/style/PageHeader.svelte";
	import type { Snapshot } from "./$types.js";

	let query: SearchQueryMap = {};

	export const snapshot: Snapshot = {
		capture: () => query,
		restore: (value) => (query = value),
	};
</script>

<svelte:head>
	<title>Search &bull; SIC</title>
</svelte:head>

<PageHeader>Search</PageHeader>
<div class="panel">
	<div class="panel-inner">
		<SearchUi bind:query />
	</div>
</div>
