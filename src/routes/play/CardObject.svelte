<script context="module" lang="ts">
    import { onMount } from "svelte";
    import { draggable } from "svelte-agnostic-draggable";
    import { CardOrientation } from "$lib/enums/cardOrientation.js";
    import Spinner from "$lib/style/icons/Spinner.svelte";
    import type Card from "$models/card/card.js";
    import { retryPromise } from "$lib/utils/promise.js";
    import { cardIsMember } from "$lib/card/types.js";
    import { CardMemberRarity } from "$lib/enums/cardRarity.js";
    import CardType from "$lib/enums/cardType.js";
    import type CardPageExtraInfo from "$lib/types/cardPageExtraInfo.js";
</script>

<script lang="ts">
    export let id: number;
    export let cardNo: string;
    export let cardType: CardType;
    export let position: { x: number; y: number; z: number };

    let element: HTMLDivElement,
        loadPromise: Promise<Card & { imageDataUrl: string }> = new Promise(
            () => null
        );
    $: if (element) element.dataset.id = id.toString();
    $: if (element) element.dataset.cardNo = cardNo;

    onMount(() => {
        loadPromise = retryPromise(
            fetch(`/json/card/${cardNo}/sameid/preparse`)
        )
            .then((res) => res.json())
            .then(
                async (
                    card: Card & CardPageExtraInfo & { imageDataUrl: string }
                ) => {
                    let usedCardNo = cardNo;
                    if (
                        cardIsMember(card) &&
                        card.member.rarity === CardMemberRarity.Secret
                    ) {
                        usedCardNo = card.sameId![0].cardNo;
                    }

                    card.imageDataUrl = await fetch(
                        `/images/cards/${
                            usedCardNo.split("-")[0]
                        }/${usedCardNo}-front.jpg`
                    )
                        .then((response) => response.blob())
                        .then(
                            (blob) =>
                                new Promise<string>((resolve, reject) => {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        resolve(<string>reader.result);
                                    };
                                    reader.onerror = reject;
                                    reader.readAsDataURL(blob);
                                })
                        );
                    return card;
                }
            );
    });
</script>

<div
    class="cardcontainer"
    style:left={`${position.x}px`}
    style:top={`${position.y}px`}
    style:z-index={position.z}
    bind:this={element}
    use:draggable={{
        cursor: "grabbing",
        zIndex: 1000000000,
        scope: cardType.toString(),
        containment: "parent",
    }}
>
    {#await loadPromise}
        <div
            class="card"
            class:card-v={cardType === CardType.MEMBER}
            class:card-h={cardType !== CardType.MEMBER}
        >
            <Spinner />
        </div>
    {:then card}
        <div
            class="card"
            class:card-v={card.frontOrientation === CardOrientation.PORTRAIT}
            class:card-h={card.frontOrientation === CardOrientation.LANDSCAPE}
        >
            <img src={card.imageDataUrl} alt={cardNo} />
        </div>
    {/await}
</div>

<style lang="postcss">
    .cardcontainer {
        @apply absolute w-min cursor-grab select-none;

        & .card {
            @apply flex items-center justify-center bg-primary-200 overflow-hidden;

            &.card-v {
                @apply rounded-card-v;
                width: 65px;
                height: 91px;
            }

            &.card-h {
                @apply rounded-card-h;
                width: 91px;
                height: 65px;
            }

            & img {
                @apply w-full;
            }
        }
    }
</style>
