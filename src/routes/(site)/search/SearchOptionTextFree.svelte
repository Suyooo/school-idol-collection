<script lang="ts">
	import { normalizeInput } from "$lib/search/querymap.js";
	import type { KeysTextFree } from "$lib/search/types.js";

	export let key: KeysTextFree;
	export let value: string | undefined;
	let input: string = value ?? "";
	$: value = normalizeInput(input);
</script>

<b class="whitespace-nowrap"><slot /></b>
<input bind:value={input} placeholder="—" name={key} />
