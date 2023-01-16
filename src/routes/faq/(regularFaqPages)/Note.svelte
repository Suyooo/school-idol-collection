<script lang="ts">
    import {makeNodesRenderable} from "$lib/format/format.js";
    import type {ParseNodePrepared} from "$lib/format/format.js";
    import SkillNodeRenderer from "$lib/format/SkillNodeRenderer.svelte";

    export let note: ParseNodePrepared[];
</script>

<div><SkillNodeRenderer nodes={makeNodesRenderable(note)}/></div>

<style lang="postcss">
    div {
        @apply mt-2 pl-12 relative;

        &:before {
            @apply absolute left-4 top-0.5 w-4 text-center text-accent-500 font-bold;
            content: "※";
        }
    }
</style>