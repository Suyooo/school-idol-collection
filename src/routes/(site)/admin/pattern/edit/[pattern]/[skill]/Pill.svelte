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
        @apply inline-block bg-background py-1 px-2 rounded-full select-none cursor-pointer mb-1;
    }
</style>
