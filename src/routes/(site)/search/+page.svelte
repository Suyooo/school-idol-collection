<script lang="ts">
    import { onMount } from "svelte";
    import type { SearchUiOptions } from "$l/search/ui.js";
    import { urlToUiOptions } from "$l/search/ui.js";
    import type { Snapshot } from "./$types.js";
    import SearchOptions from "./SearchOptions.svelte";

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

<div class="content">
    <h3>Search</h3>
    <div class="panel">
        <div class="panel-inner">
            <SearchOptions {options} />
        </div>
    </div>
</div>
