<script lang="ts">
    import type Set from "$models/set/set.js";

    export let set: Set;
</script>

<a href="/set/{set.id}" class="grid-item">
    <div class="imgcont">
        <img src="/images/cards/{set.id}/set.jpg" alt={set.id} />
    </div>
    <div class="namecont">
        <span>⏵</span><span>{set.eng}</span>
    </div>
</a>

<style lang="postcss">
    .grid-item {
        @apply no-underline flex flex-col bg-primary-500 p-1 rounded-2xl;

        & > * {
            @apply flex-grow-0 flex-shrink-0 basis-0;
        }

        & > .imgcont {
            @apply flex content-center items-center justify-center basis-36 w-full rounded-xl px-2 mb-1 overflow-hidden bg-white gap-2;

            & > :global(img) {
                @apply max-h-32 object-contain max-w-full basis-0;
            }
        }

        & > .namecont {
            @apply flex-grow leading-[1.1rem] my-1;
        }

        & > .namecont {
            @apply flex font-bold pr-2 no-underline;
        }

        & > .namecont > span {
            @apply pl-2 flex-grow-0 flex-shrink-0 basis-0;
        }

        & > .namecont > span:last-child {
            @apply underline;
        }

        & > .namecont > span:first-child {
            @apply text-primary-300 no-underline;
        }

        & > .namecont > span:last-child {
            @apply flex-grow;
        }
    }
</style>
