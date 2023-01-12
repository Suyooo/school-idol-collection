<script lang="ts">
    import type CardType from "$lib/enums/cardType.js";
    import Language from "$lib/enums/language.js";

    export let repl: string;
    export let lang: Language = Language.ENG; lang;
    export let cardType: CardType | undefined = undefined; cardType;
</script>

<span title={repl}>{repl}</span>

<style lang="postcss">
    span {
        @apply w-5 h-5 bg-contain bg-no-repeat inline-block overflow-hidden align-top text-center text-none;
        background-image: url("/images/card/star.png");
    }
</style>