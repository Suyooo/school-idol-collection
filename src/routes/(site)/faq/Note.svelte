<script lang="ts">
	import { makeNodesRenderable } from "$lib/format/format.js";
	import type { ParseNodePrepared } from "$lib/format/format.js";
	import SkillNodeRenderer from "$lib/format/SkillNodeRenderer.svelte";

	export let note: ParseNodePrepared[];
</script>

<div class="note"><SkillNodeRenderer nodes={makeNodesRenderable(note)} /></div>

<style lang="postcss">
	.note {
		@apply relative mb-4 pl-12;

		&:before {
			@apply absolute left-4 top-0 w-4 text-center font-bold text-faq-question;
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
