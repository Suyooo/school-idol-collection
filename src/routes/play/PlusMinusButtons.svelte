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
</script>

<div class="extra-buttons" style:--size={size}>
    <Button label="Add Piece" on:click={() => update(1)} disabled={value >= (swapped ? 0 : limit)} {accent}>
        <Plus />
    </Button>
    <Button label="Remove Piece" on:click={() => update(-1)} disabled={value <= (swapped ? -limit : 0)} {accent}>
        <Minus />
    </Button>
</div>

<style lang="postcss">
    .extra-buttons {
        @apply flex flex-col gap-y-0;

        & :global(button) {
            @apply !p-0;
            width: var(--size);
            height: var(--size);
            line-height: var(--size) !important;
            border-radius: calc(var(--size) / 3);

            &:not(.accent) {
                &:hover {
                    @apply bg-primary-600;
                }
                &:active {
                    @apply bg-primary-400;
                }
            }
            &:first-child {
                @apply rounded-b-none;
            }
            &:last-child {
                @apply rounded-t-none;
            }

            & :global(svg) {
                stroke-width: calc(4px * var(--zoom, 1));
            }
        }
    }
</style>
