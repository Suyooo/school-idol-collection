<script lang="ts">
    import Language from "$lib/types/language.js";

    export let repl: string;
    export const lang: Language = Language.ENG;
</script>

<span title={repl}>{repl}</span>

<style lang="postcss">
    span {
        @apply w-[3.285rem] h-5 bg-contain bg-no-repeat inline-block overflow-hidden align-top text-center text-none;
        background-image: url("/images/card/idolized.png");
    }
</style>