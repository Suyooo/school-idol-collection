<script lang="ts">
    import {onMount} from "svelte";
    import type {PageData} from "./$types.js";
    import Label from "./Label.svelte";
    import "../../../../app.css";

    export let data: PageData;

    onMount(() => document.getElementsByTagName("body")[0].classList.add("A4"));
</script>

<svelte:head>
    <link rel="stylesheet" href="/vendor/paper-css/paper.min.css">
    <title>Sleeve Labels</title>
</svelte:head>

<section class="sheet p-[9mm]">
    {#key data}
        {#each data.cardNos as cardNo}
            <Label {cardNo} byCardNo={data.byCardNo} byCardId={data.byCardId}/>
        {/each}
    {/key}
</section>

<style lang="postcss">
    @font-face {
        font-family: "Open Sans";
        src: url("/vendor/OpenSans-VariableFont_wdth,wght.ttf") format("truetype");
    }

    @page {
        size: A4;
    }

    :global(body) {
        @apply text-black;
    }

    :global(.skill-icon) {
        margin-top: -0.06rem;
        margin-bottom: -0.19rem;
    }

    :global(.text-highlight-red) {
        color: red;
    }

    :global(a) {
        color: red !important;
        text-decoration-line: none;
    }

    .sheet {
        @apply flex flex-wrap items-start content-start;
    }
</style>