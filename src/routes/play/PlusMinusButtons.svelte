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
</script>

<div class="extra-buttons">
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
            @apply !p-0 w-3 h-3 !leading-3;
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
        }
    }
</style>
