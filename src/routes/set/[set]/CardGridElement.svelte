<script lang="ts">
    import type Card from "$models/card/card";
    import CardType from "$types/cardType";

    export let card: Card;
    const set = card.cardNo.split("-")[0];
    const typeString = card.type === CardType.MEMBER ? "Member" : card.type === CardType.SONG ? "Song" : "Memory";
</script>

<a href="/card/{card.cardNo}/" class="grid-item">
    <div class="imgcont">
        <img src="/images/{set}/{card.cardNo}-front.jpg" alt="{card.cardNo} Front Illustration">
        <img src="/images/{set}/{card.cardNo}-back.jpg" alt="{card.cardNo} Back Illustration">
    </div>
    <div class="namecont">
        <span>⏵</span><span>{card.nameEng || card.nameJpn}</span>
    </div>
    <div class="linecont">
        <span>{card.cardNo}</span><span>{typeString}</span>
    </div>
</a>

<style lang="postcss">
    .grid-item {
        & > .imgcont {
            @apply bg-primary-700 gap-2;

            & > img {
                @apply max-w-[50%] rounded-[4px] basis-0;
            }
        }

        & > .namecont {
            @apply my-1;
        }
    }
</style>