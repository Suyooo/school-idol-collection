<script lang="ts">
    export let cardNo: string;
    export let cardSet: string;
    export let front: boolean = false;

    let img: HTMLImageElement, isHorizontal: boolean = false, isVertical: boolean = false;

    $: {
        cardNo;
        isHorizontal = isVertical = false;
    }

    function checkOrientation() {
        if (img.width > img.height) isHorizontal = true;
        if (img.width < img.height) isVertical = true;
    }
</script>

{#key cardNo}
    <img bind:this={img} src="/images/{cardSet}/{cardNo}-{front ? 'front' : 'back'}.jpg"
         alt="{cardNo} {front ? 'Front' : 'Back'} Illustration" on:load={checkOrientation}
         class:card-h={isHorizontal} class:card-v={isVertical}>
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