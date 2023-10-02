<script lang="ts" context="module">
    import { createTransition } from "svelte-reduced-motion";

    function hSlide(
        _node: Element,
        { delay = 0, duration = 100, isOut = false }: { delay?: number; duration?: number; isOut?: boolean } = {
            delay: 0,
            duration: 100,
            isOut: false,
        }
    ) {
        return {
            delay,
            duration,
            css: (t: number) => `${isOut ? "font-size: 0; " : ""}max-width: ${t * 65}px;`,
        };
    }

    const slideOrInstant = createTransition(hSlide, [hSlide, { duration: 0 }]);
</script>

<script lang="ts">
    export let show: boolean;
    export let isLastItem: boolean;
    export let disableSidewaysAnimations: boolean;
</script>

{#if show}
    <div
        class="indicator"
        class:last={isLastItem}
        in:slideOrInstant={{ duration: disableSidewaysAnimations ? 0 : 100 }}
        out:slideOrInstant={{ duration: disableSidewaysAnimations ? 0 : 100, isOut: true }}
        style:--arrow-opacity={1}
    />
{/if}

<style lang="postcss">
    .indicator {
        @apply relative flex-grow cursor-grab select-none;
        width: 0px;
        height: 91px;
        max-width: 65px;

        &:before {
            @apply absolute text-accent-400;
            content: "🠯";
            font-size: 500%;
            left: 50%;
            top: -25%;
            transform: translateX(-50%);
            text-shadow: 0 0 6px black; /* equals shadow-card-hand */
        }
    }
</style>
