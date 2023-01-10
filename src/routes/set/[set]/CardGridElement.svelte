<script lang="ts">
    import {cardRarity} from "$lib/card/strings";
    import type Card from "$models/card/card.js";
    import {cardRarityShort, cardType} from "$lib/card/strings.js";
    import {cardIsMember, cardIsMemory} from "$lib/card/types.js";

    export let card: Card;
    let set: string;
    $: set = card.cardNo.split("-")[0];
</script>

<a href="/card/{card.cardNo}" class="grid-item">
    <div class="imgcont">
        <img src="/images/{set}/{card.cardNo}-front.jpg" alt="{card.cardNo} Front Illustration" class="rounded-card"
             class:card-h={!cardIsMember(card)}>
        <img src="/images/{set}/{card.cardNo}-back.jpg" alt="{card.cardNo} Back Illustration" class="rounded-card"
             class:card-h={cardIsMemory(card)}>
    </div>
    <div class="namecont">
        <span>⏵</span>
        <span>
            {#if cardIsMember(card)}
                <span class="rarity">{cardRarityShort(card)}</span>
            {/if}
            {card.nameEng || card.nameJpn}
        </span>
    </div>
    <div class="linecont">
        <span>{card.cardNo}</span><span>{cardType(card)}</span>
    </div>
</a>