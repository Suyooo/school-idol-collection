<script lang="ts">
    export let accent: boolean = false;
    export let disabled: boolean = false;
    export let href: string | undefined = undefined;
    export let style: string = "";
    export let classes: string = "";
    export let label: string;
</script>

{#if disabled}
    <button disabled class={`!bg-primary-900 !text-primary-400 ${classes}`} {style} title={label} aria-label={label}>
        <slot></slot>
    </button>
{:else if href}
    <a {href} class:accent class={classes} {style} title={label} aria-label={label}>
        <slot></slot>
    </a>
{:else}
    <button class:accent class={classes} {style} title={label} aria-label={label} on:click>
        <slot></slot>
    </button>
{/if}

<style lang="postcss">
    a, button {
        @apply font-bold text-primary-100 bg-primary-700 rounded uppercase px-4 py-2 cursor-pointer text-sm text-center tracking-wide no-underline select-none;

        &:hover, &:focus {
            @apply bg-primary-500 text-white;
        }

        &.accent {
            @apply bg-accent-600 text-accent-100;

            &:hover, &:focus {
                @apply bg-accent-400 text-white;
            }
        }
    }
</style>