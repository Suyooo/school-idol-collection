<script lang="ts">
    import SkillNodeRenderer from "$lib/format/SkillNodeRenderer.svelte";
    import {makeNodesRenderable} from "$lib/format/format.js";
    import type {ParseNodePrepared} from "$lib/format/format.js";

    export let key: string;
    export let question: ParseNodePrepared[] | string;
    export let answer: ParseNodePrepared[] | string;

    function copyLink() {
        navigator.clipboard.writeText(window.location.origin + window.location.pathname + "#" + key);
    }
</script>

<div class="w-full group relative">
    <button class="absolute left-0 top-0 text-xs leading-5 opacity-50 hidden group-hover:block z-50" on:click={copyLink}>🔗</button>
    <div class="anchor absolute left-0 top-[-15vh]" id="{key}"></div>
    <div class="question">
        {#if typeof question === "string"}
            {@html question}
        {:else}
            <SkillNodeRenderer nodes={makeNodesRenderable(question)}/>
        {/if}
    </div>
    <div class="answer">
        {#if typeof answer === "string"}
            {@html answer}
        {:else}
            <SkillNodeRenderer nodes={makeNodesRenderable(answer)}/>
        {/if}
    </div>
</div>

<style lang="postcss">
    .group {
        @apply mb-4;

        &:last-child {
            @apply mb-0;
        }
    }

    .question, .answer {
        @apply relative pl-12;

        &:after {
            @apply absolute left-4 top-[0.2rem] w-4 h-4 leading-[0.875rem] text-center text-xs font-bold rounded-full text-black;
        }
    }

    .question {
        @apply font-bold;

        &:after {
            @apply bg-accent-200;
            content: "Q";
        }
    }

    .answer {
        &:after {
            @apply bg-primary-200;
            content: "A";
        }
    }

    div.anchor:target + .question, div.anchor:target + .question + .answer {
        animation: highlight-faq .25s ease-in-out 2;
    }
</style>