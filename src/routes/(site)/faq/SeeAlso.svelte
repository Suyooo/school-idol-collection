<script lang="ts">
    import { makeNodesRenderable } from "$l/format/format.js";
    import type { ParseNodePrepared } from "$l/format/format.js";
    import SkillNodeRenderer from "$l/format/SkillNodeRenderer.svelte";

    export let link: string;
    export let label: ParseNodePrepared[];
</script>

<div class="seealso"><b>See also:</b> <a href={link}><SkillNodeRenderer nodes={makeNodesRenderable(label)} /></a></div>

<style lang="postcss">
    .seealso {
        @apply mb-4 pl-12 relative;

        &:before {
            @apply absolute left-4 top-0 w-4 text-center text-accent-500 font-bold;
            content: "⏵";
        }

        & + :global(.seealso) {
            @apply -mt-4;
        }

        &:last-child {
            @apply mb-0;
        }
    }
</style>
