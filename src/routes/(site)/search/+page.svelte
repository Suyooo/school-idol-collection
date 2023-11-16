<script lang="ts">
	import { onMount } from "svelte";
	import type { SearchUiOptions } from "$lib/search/ui.js";
	import { urlToUiOptions } from "$lib/search/ui.js";
	import type { Snapshot } from "./$types.js";
	import SearchOptions from "./SearchOptions.svelte";
	import PageHeader from "$lib/style/PageHeader.svelte";

	let options: SearchUiOptions = {};

	export const snapshot: Snapshot = {
		capture: () => options,
		restore: (value) => (options = value),
	};

	onMount(() => {
		if (history.state.prefillQueryUrl) {
			options = urlToUiOptions(history.state.prefillQueryUrl);
		}
	});
</script>

<svelte:head>
	<title>Search &bull; SIC</title>
</svelte:head>

<PageHeader>Search</PageHeader>
<div class="panel">
	<div class="panel-inner">
		<SearchOptions {options} />
	</div>
</div>
