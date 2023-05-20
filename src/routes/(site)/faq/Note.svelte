<script lang="ts">
    import { makeNodesRenderable } from "$lib/format/format.js";
    import type { ParseNodePrepared } from "$lib/format/format.js";
    import SkillNodeRenderer from "$lib/format/SkillNodeRenderer.svelte";

    export let note: ParseNodePrepared[];
</script>

<div class="note"><SkillNodeRenderer nodes={makeNodesRenderable(note)} /></div>

<style lang="postcss">
    .note {
        @apply mb-4 pl-12 relative;

        &:before {
            @apply absolute left-4 top-0 w-4 text-center text-accent-500 font-bold;
            content: "※";
        }

        & + :global(.note) {
            @apply -mt-4;
        }

        &:last-child {
            @apply mb-0;
        }
    }
</style>
