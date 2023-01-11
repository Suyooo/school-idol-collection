<script lang="ts">
    export let repl: string;
</script>

<span title={repl}>{repl}</span>

<style lang="postcss">
    span {
        @apply w-5 h-5 bg-contain bg-no-repeat inline-block overflow-hidden align-top text-center text-none;
        background-image: url("/images/card/star.png");
    }
</style>