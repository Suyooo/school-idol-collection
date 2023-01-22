<script lang="ts">
    import type CardType from "$lib/enums/cardType.js";
    import Language from "$lib/enums/language.js";

    export let rush: boolean = false;
    export let live: boolean = false;

    export let lang: Language = Language.ENG;
    export let cardType: CardType | undefined = undefined; cardType;

    let lbr: string, rbr: string;
    $: lbr = lang.leftSquareBracket;
    $: rbr = lang.rightSquareBracket;
</script>

{#if rush}
    {#if live}
        <span class="skill-icon rush" title="{lbr}RUSH{rbr}/{lbr}LIVE{rbr}">{lbr}RUSH{rbr}</span>
        <span class="skill-icon or" title="{lbr}RUSH{rbr}/{lbr}LIVE{rbr}">/</span>
        <span class="skill-icon live" title="{lbr}RUSH{rbr}/{lbr}LIVE{rbr}">{lbr}LIVE{rbr}</span>
    {:else}
        <span class="skill-icon rush" title="{lbr}RUSH{rbr}">{lbr}RUSH{rbr}</span>
    {/if}
{:else if live}
    <span class="skill-icon live" title="{lbr}LIVE{rbr}">{lbr}LIVE{rbr}</span>
{:else}
    —
{/if}

<style lang="postcss">
    .skill-icon {
        @apply w-[2.88em];

        &.rush {
            background-image: url("/images/card/ability_rush.png");
        }

        &.live {
            background-image: url("/images/card/ability_live.png");
        }

        &.or {
            @apply absolute ml-[-.63em];
            background-image: url("/images/card/ability_or.png");

            & + .live {
                @apply ml-[-.25em];
            }
        }
    }
</style>