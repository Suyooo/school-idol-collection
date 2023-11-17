<script lang="ts">
	import { uiOptionIsSet } from "$lib/search/ui.js";

	export let value: string | undefined;
	export let options: (string | [string, string])[];

	$: {
		if (value !== "" && !uiOptionIsSet(value)) value = "";
	}
</script>

<b class="whitespace-nowrap"><slot /></b>
<select bind:value class:text-input-placeholder={value === ""}>
	<option value="" selected>—</option>
	{#each options as opt}
		{#if typeof opt === "string"}
			<option value={opt}>{opt}</option>
		{:else}
			<option value={opt[0]}>{opt[1]}</option>
		{/if}
	{/each}
</select>
