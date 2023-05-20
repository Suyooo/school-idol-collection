<script lang="ts">
    import type Card from "$models/card/card.js";
    import { cardTitle } from "$lib/card/strings.js";
    import Language from "$lib/enums/language.js";
    import type CardPageExtraInfo from "$lib/types/cardPageExtraInfo.js";
    import CardImage from "$lib/format/CardImage.svelte";
    import type { PageData } from "./$types.js";
    import CardInfoRows from "./CardInfoRows.svelte";
    import CardPageButtons from "./CardPageButtons.svelte";

    export let data: PageData;
    let card: Card & Required<CardPageExtraInfo>;
    $: card = data.card;
</script>

<svelte:head>
    <title>{cardTitle(card, false)} &bull; SIC</title>
</svelte:head>

<div class="content">
    <div class="row lg:flex">
        <div class="col-quarter imgcont">
            <div>
                <CardImage {card} />
            </div>
            <div>
                <CardImage {card} back />
            </div>
        </div>
        <div class="col-threequarters">
            <div class="mb-4">
                <CardPageButtons
                    prevCardNo={card.prevCardNo}
                    nextCardNo={card.nextCardNo}
                    cardSet={card.cardSet}
                    listLinksOnLargeOnly
                />
            </div>

            <div class="panel">
                <div class="panel-inner">
                    <h4>{@html cardTitle(card, true, Language.ENG, true)}</h4>
                    <CardInfoRows {card} />
                </div>
            </div>
            <div class="cardcopyright">{card.copyright}</div>

            <div class="mt-4">
                <CardPageButtons prevCardNo={card.prevCardNo} nextCardNo={card.nextCardNo} cardSet={card.cardSet} />
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    h4 {
        @apply mb-0 tracking-normal;
    }

    .panel-inner {
        @apply pb-0;
    }

    .panel-inner :global(.row) {
        @apply -mx-4;
    }

    .cardcopyright {
        @apply text-right text-xs text-primary-500 mt-2 mb-1;
    }

    .imgcont {
        @apply flex gap-2 justify-center items-center lg:flex-col lg:justify-start mb-4 lg:mt-14 lg:mb-0;

        & > div {
            @apply mx-4;

            & > :global(img) {
                @apply max-w-full;
            }
        }
    }
</style>
