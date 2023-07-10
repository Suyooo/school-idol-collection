<script lang="ts">
    export let accent: boolean = false;
    export let disabled: boolean = false;
    export let href: string | undefined = undefined;
    export let style: string = "";
    export let classes: string = "";
    export let target: string | undefined = undefined;
    export let label: string;
</script>

{#if disabled}
    <button disabled class:accent class={`disabled ${classes}`} {style} title={label} aria-label={label}>
        <slot />
    </button>
{:else if href}
    <a {href} class:accent class={classes} {style} title={label} aria-label={label} {target}>
        <slot />
    </a>
{:else}
    <button class:accent class={classes} {style} title={label} aria-label={label} on:click>
        <slot />
    </button>
{/if}

<style lang="postcss">
    a,
    button {
        @apply font-bold text-primary-100 bg-primary-700 rounded uppercase px-4 py-2 cursor-pointer text-sm flex items-center justify-center tracking-wide no-underline select-none;

        &:hover {
            @apply bg-primary-500 text-white;
        }

        &:active {
            @apply bg-primary-300;
        }

        &.disabled {
            @apply bg-primary-950 text-primary-500;
        }

        &.accent {
            @apply bg-accent-600 text-accent-100;

            &:hover {
                @apply bg-accent-400 text-white;
            }

            &:active {
                @apply bg-accent-200;
            }

            &.disabled {
                @apply bg-accent-950 text-accent-500;
            }
        }
    }
</style>
