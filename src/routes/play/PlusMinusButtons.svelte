<script context="module" lang="ts">
    import Button from "$lib/style/Button.svelte";
    import Minus from "$lib/style/icons/Minus.svelte";
    import Plus from "$lib/style/icons/Plus.svelte";
</script>

<script lang="ts">
    export let value: number;
    export let update: (d: number) => void;
    export let swapped: boolean = false;
    export let limit: number = 9;
    export let accent: boolean = false;
    export let size: string = "0.75rem";
    export let horizontal: boolean = false;
    export let labelPlus = "Add Piece";
    export let labelMinus = "Remove Piece";
</script>

<div class="extra-buttons" style:--size={size} class:flex-col={!horizontal}>
    <Button label={labelPlus} on:click={() => update(1)} disabled={value >= (swapped ? 0 : limit)} {accent}>
        <Plus />
    </Button>
    <Button label={labelMinus} on:click={() => update(-1)} disabled={value <= (swapped ? -limit : 0)} {accent}>
        <Minus />
    </Button>
</div>

<style lang="postcss">
    .extra-buttons {
        @apply flex gap-y-0 overflow-hidden;
        border-radius: calc(var(--size) / 3);

        & :global(button) {
            @apply !p-0 rounded-none;

            &:not(.accent) {
                &:hover {
                    @apply bg-primary-600;
                }
                &:active {
                    @apply bg-primary-400;
                }
            }

            & :global(svg) {
                width: var(--size);
                height: var(--size);
            }
        }
    }
</style>
