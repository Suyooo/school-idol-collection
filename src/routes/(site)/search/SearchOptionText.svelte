<script lang="ts">
	import { uiOptionIsSet } from "$lib/search/ui.js";

	export let value: string | undefined;

	$: {
		if (value !== undefined && !uiOptionIsSet(value)) value = undefined;
	}
</script>

<b class="whitespace-nowrap"><slot /></b>
<input bind:value placeholder="—" />
