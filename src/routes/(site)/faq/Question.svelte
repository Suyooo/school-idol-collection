<script lang="ts">
    import { onMount } from "svelte";
    import { makeNodesRenderable } from "$lib/format/format.js";
    import type { ParseNodePrepared } from "$lib/format/format.js";
    import SkillNodeRenderer from "$lib/format/SkillNodeRenderer.svelte";
    import Link from "$lib/style/icons/Link.svelte";

    export let key: string;
    export let question: ParseNodePrepared[] | string;
    export let answer: ParseNodePrepared[] | string;

    function copyLink() {
        navigator.clipboard.writeText(window.location.origin + window.location.pathname + "#" + key);
    }

    let target: boolean = false;
    onMount(() => {
        if (window.location.hash === `#${key}`) target = true;
    });
</script>

<div class="w-full group relative">
    <button
        class="absolute -left-2 top-0 justify-center hidden group-hover:block z-50"
        title="Copy Link to This Question"
        on:click={copyLink}
    >
        <Link />
    </button>
    <div class="anchor absolute left-0 top-[-15vh]" class:target id={key} />
    <div class="question">
        {#if typeof question === "string"}
            {@html question}
        {:else}
            <SkillNodeRenderer nodes={makeNodesRenderable(question)} />
        {/if}
    </div>
    <div class="answer">
        {#if typeof answer === "string"}
            {@html answer}
        {:else}
            <SkillNodeRenderer nodes={makeNodesRenderable(answer)} />
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

    .question,
    .answer {
        @apply relative pl-12;

        &:after {
            @apply absolute left-4 top-[0.2rem] w-4 h-4 leading-[0.875rem] text-center text-xs font-bold rounded-full text-background-panel;
        }
    }

    .question {
        @apply font-bold;

        &:after {
            @apply bg-faq-question;
            content: "Q";
        }
    }

    .answer {
        &:after {
            @apply bg-faq-answer;
            content: "A";
        }
    }

    div.anchor.target + .question,
    div.anchor.target + .question + .answer {
        animation: highlight-faq 0.25s ease-in-out 2;
    }
</style>
