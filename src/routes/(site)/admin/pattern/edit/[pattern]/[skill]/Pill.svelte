<script lang="ts">
	export let refocus: HTMLElement;
	let slot: HTMLSpanElement;

	function copy() {
		navigator.clipboard.writeText(slot.innerText);
		refocus.focus();
	}
</script>

<button bind:this={slot} on:click={copy}><slot /></button>

<style lang="postcss">
	button {
		@apply mb-1 inline-block cursor-pointer select-none rounded-full bg-background px-2 py-1;
	}
</style>
