<script lang="ts">
    export let accent: boolean = false;
    export let disabled: boolean = false;
    export let href: string;
</script>

{#if disabled}
    <div class="!bg-primary-900">
        <slot></slot>
    </div>
{:else}
    <a {href} class:accent>
        <slot></slot>
    </a>
{/if}

<style lang="postcss">
    a, div {
        @apply text-white bg-primary-700 rounded uppercase px-4 py-2 cursor-pointer text-sm tracking-wide no-underline select-none;
    }

    a {
        &:hover, &:focus {
            @apply bg-primary-500;
        }

        &.accent {
            @apply bg-accent-600;

            &:hover, &:focus {
                @apply bg-accent-400;
            }
        }
    }
</style>