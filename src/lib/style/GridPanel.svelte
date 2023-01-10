<script lang="ts">
    type T = $$Generic;
    export let items: T[];
    export let key: keyof T | null = null;
</script>

<div class="panel">
    {#each items as item, i (key ? item[key] : i)}
        <slot {item}></slot>
    {/each}
</div>

<style lang="postcss">
    .panel {
        @apply p-0 overflow-hidden bg-none grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4;

        & > :global(.grid-item) {
            @apply no-underline flex flex-col bg-primary-500 p-1 rounded-2xl;

            & > :global(*) {
                @apply flex-grow-0 flex-shrink-0 basis-0;
            }

            & > :global(.imgcont) {
                @apply flex content-center items-center justify-center basis-36 w-full rounded-xl px-2 mb-1 overflow-hidden bg-primary-700 gap-2;

                & > :global(img) {
                    @apply max-h-32 object-contain max-w-[50%] basis-0;
                }
            }

            & > :global(.namecont) {
                @apply flex-grow leading-[1.1rem] my-1;
            }

            & > :global(.namecont), & > :global(.linecont) {
                @apply flex font-bold pr-2;
            }

            & > :global(.namecont > span), & > :global(.linecont > span) {
                @apply pl-2 flex-grow-0 flex-shrink-0 basis-0;
            }

            & > :global(.namecont > span:last-child) {
                @apply underline;
            }

            & > :global(.namecont > span:first-child) {
                @apply text-primary-300;
            }

            & > :global(.linecont > span) {
                @apply text-white;
            }

            & > :global(.namecont > span:last-child), & > :global(.linecont > span) {
                @apply flex-grow;
            }

            & > :global(.linecont > span) {
                @apply text-center text-xs uppercase tracking-widest;
            }
        }
    }
</style>