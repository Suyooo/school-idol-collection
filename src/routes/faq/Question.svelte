<script lang="ts">
    import SkillNodeRenderer from "$lib/format/SkillNodeRenderer.svelte";
    import {makeNodesRenderable} from "$lib/format/format.js";
    import type {ParseNodePrepared} from "$lib/format/format.js";

    export let key: string;
    export let question: ParseNodePrepared[] | string;
    export let answer: ParseNodePrepared[] | string;
</script>

<div class="question" id="{key}">
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

<style lang="postcss">
    .question, .answer {
        @apply relative pl-12;

        &:after {
            @apply absolute left-4 top-[0.2rem] w-4 h-4 leading-[0.875rem] text-center text-xs font-bold rounded-full text-black;
        }
    }

    .question {
        @apply mt-2 font-bold;

        &:after {
            @apply bg-accent-200;
            content: "Q";
        }
    }

    .answer {
        @apply mb-4;

        &:after {
            @apply bg-primary-200;
            content: "A";
        }
    }
</style>