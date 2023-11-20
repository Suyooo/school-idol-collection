<script lang="ts">
	export let options: { [k: number]: string };
	export let value: number | undefined;
	let input: string = value?.toString() ?? "";

	$: {
		value = input === "" ? undefined : parseInt(input);
	}
</script>

<b class="whitespace-nowrap"><slot /></b>
<select bind:value={input} class:text-input-placeholder={input === ""}>
	<option value="" selected>—</option>
	{#each Object.entries(options) as [option, label]}
		<option value={option}>{label}</option>
	{/each}
</select>
