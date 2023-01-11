<script lang="ts">
    import Language from "$lib/types/language.js";

    export let lang: Language = Language.ENG;
    export let rush: boolean = false;
    export let live: boolean = false;

    let lbr: string, rbr: string;
    $: lbr = lang.leftSquareBracket;
    $: rbr = lang.rightSquareBracket;
</script>

{#if rush}
    {#if live}
        <span class="rush" title="{lbr}RUSH{rbr}/{lbr}LIVE{rbr}">{lbr}RUSH{rbr}</span>
        <span class="or" title="{lbr}RUSH{rbr}/{lbr}LIVE{rbr}">/</span>
        <span class="live" title="{lbr}RUSH{rbr}/{lbr}LIVE{rbr}">{lbr}LIVE{rbr}</span>
    {:else}
        <span class="rush" title="{lbr}RUSH{rbr}">{lbr}RUSH{rbr}</span>
    {/if}
{:else if live}
    <span class="live" title="{lbr}LIVE{rbr}">{lbr}LIVE{rbr}</span>
{:else}
    —
{/if}

<style lang="postcss">
    span {
        @apply w-[2.88rem] h-5 bg-contain bg-no-repeat inline-block overflow-hidden align-top text-center text-none;

        &.rush {
            background-image: url("/images/card/ability_rush.png");
        }

        &.live {
            background-image: url("/images/card/ability_live.png");
        }

        &.or {
            @apply absolute ml-[-.63rem];
            background-image: url("/images/card/ability_or.png");

            & + .live {
                @apply ml-[-.25rem];
            }
        }
    }
</style>