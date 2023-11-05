<script lang="ts">
    import type Card from "$models/card/card.js";
    import { cardRarityShort, cardType } from "$lib/card/strings.js";
    import { cardIsMember, cardIsSong } from "$lib/card/types.js";
    import { CardSongRarity } from "$lib/enums/cardRarity.js";
    import CardImage from "$lib/format/CardImage.svelte";

    export let card: Card;
</script>

<a href="/card/{card.cardNo}" class="grid-item">
    <div class="imgcont">
        <CardImage {card} />
        <CardImage {card} back />
    </div>
    <div class="namecont">
        <span>⏵</span>
        <span>
            {#if cardIsMember(card) || (cardIsSong(card) && card.song.rarity === CardSongRarity.GR)}
                <span class="rarity">{cardRarityShort(card)}</span>
            {/if}
            {card.nameEng || card.nameJpn}
        </span>
    </div>
    <div class="linecont">
        <span>{card.cardNo}</span><span>{cardType(card)}</span>
    </div>
</a>

<style lang="postcss">
    .grid-item {
        @apply no-underline flex flex-col bg-background-grid p-1 rounded-2xl;

        & > * {
            @apply flex-grow-0 flex-shrink-0 basis-0;
        }

        & > .imgcont {
            @apply flex content-center items-center justify-center basis-36 w-full rounded-xl px-2 mb-1 overflow-hidden bg-background-panel gap-2;

            & > :global(img) {
                @apply max-h-32 object-contain max-w-[50%] basis-0;
            }
        }

        & > .namecont {
            @apply flex-grow leading-[1.1rem] my-1;
        }

        & > .namecont,
        & > .linecont {
            @apply flex font-bold pr-2 no-underline;
        }

        & > .namecont > span,
        & > .linecont > span {
            @apply pl-2 flex-grow-0 flex-shrink-0 basis-0;
        }

        & > .namecont > span:last-child {
            @apply underline;
        }

        & > .namecont > span:first-child {
            @apply text-text-subtle no-underline;
        }

        & > .linecont > span {
            @apply text-text text-center text-xs uppercase tracking-widest no-underline;
        }

        & > .namecont > span:last-child,
        & > .linecont > span {
            @apply flex-grow;
        }
    }
</style>
