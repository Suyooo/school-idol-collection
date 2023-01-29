<script lang="ts">
    export let cardNo: string;
    export let cardSet: string;
    export let secret: boolean = false;
    export let front: boolean = false;

    let img: HTMLImageElement, url: string, isHorizontal: boolean = false, isVertical: boolean = false;

    $: {
        if (secret) url = `/images/secret.jpg`;
        else url = `/images/${cardSet}/${cardNo}-${front ? 'front' : 'back'}.jpg`;
        isHorizontal = isVertical = false;
    }

    function checkOrientation() {
        if (img.width > img.height) isHorizontal = true;
        if (img.width < img.height) isVertical = true;
    }
</script>

{#key cardNo}
    <img bind:this={img} src={url} alt="{cardNo} {front ? 'Front' : 'Back'} Illustration" on:load={checkOrientation}
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