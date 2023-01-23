<script lang="ts">
    import type CardType from "$lib/enums/cardType.js";
    import Language from "$lib/enums/language.js";

    export let repl: string;
    export let lang: Language = Language.ENG; // TODO: JP Language
    export let cardType: CardType | undefined = undefined; cardType;
</script>

<span><span class="skill-icon" title={repl}>{repl}</span>{#if lang === Language.ENG}&nbsp;Pieces{/if}</span>

<style lang="postcss">
    .skill-icon {
        @apply w-[3.285em] mt-[0.03em];
        background-image: url("/images/card/idolized.png");
    }
</style>