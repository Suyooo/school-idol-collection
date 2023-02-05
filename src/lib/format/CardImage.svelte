<script lang="ts">
    import {cardIsMember} from "$lib/card/types.js";
    import {CardOrientation} from "$lib/enums/cardOrientation.js";
    import {CardMemberRarity} from "$lib/enums/cardRarity.js";
    import type Card from "$models/card/card.js";

    export let card: Card;
    export let back: boolean = false;

    let set: string, secret: boolean, isLandscape: boolean, url: string;

    $: {
        set = card.cardNo.split("-")[0];
        secret = cardIsMember(card) && card.member.rarity === CardMemberRarity.Secret;
        isLandscape = (back ? card.backOrientation : card.frontOrientation) === CardOrientation.LANDSCAPE;
        if (secret) url = `/images/cards/secret.jpg`;
        else url = `/images/cards/${set}/${card.cardNo}-${back ? 'back' : 'front'}.jpg`;
    }
</script>

{#key card}
    <img src={url} alt="{card.cardNo} {back ? 'Back' : 'Front'} Illustration"
         class:card-v={!isLandscape} class:card-h={isLandscape}>
{/key}

<style lang="postcss">
    img {
        @apply bg-primary-500 rounded-card-fallback;

        &.card-v {
            @apply rounded-card-v;
        }

        &.card-h {
            @apply rounded-card-h;
        }
    }
</style>