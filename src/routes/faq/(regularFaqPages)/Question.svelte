<script lang="ts">
    import SkillNodeRenderer from "$lib/format/SkillNodeRenderer.svelte";
    import {makeNodesRenderable} from "$lib/format/format.js";
    import type {ParseNodePrepared} from "$lib/format/format.js";

    export let key: string;
    export let question: ParseNodePrepared[];
    export let answer: ParseNodePrepared[];
</script>

<div class="question" id="{key}">
    <SkillNodeRenderer nodes={makeNodesRenderable(question)}/>
</div>
<div class="answer">
    <SkillNodeRenderer nodes={makeNodesRenderable(answer)}/>
</div>

<style lang="postcss">
    .question, .answer {
        @apply relative pl-12;

        &:after {
            @apply absolute left-4 top-0.5 w-4 h-4 leading-[0.875rem] text-center text-xs font-bold rounded-full text-black;
        }
    }

    .question {
        @apply mt-2 font-bold;
    }

    .question:after {
        @apply bg-accent-200;
        content: "Q";
    }

    .answer {
        @apply mb-4;
    }

    .answer:after {
        @apply bg-primary-200;
        content: "A";
    }
</style>