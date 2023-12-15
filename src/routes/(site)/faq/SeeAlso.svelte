<script lang="ts">
	import { makeNodesRenderable } from "$lib/format/format.js";
	import type { ParseNodePrepared } from "$lib/format/format.js";
	import SkillNodeRenderer from "$lib/format/SkillNodeRenderer.svelte";
	import Go from "$lib/style/icons/Go.svelte";

	export let link: string;
	export let label: ParseNodePrepared[];
</script>

<div class="seealso">
	<div class="icon"><Go /></div>
	<b>See also:</b> <a href={link}><SkillNodeRenderer nodes={makeNodesRenderable(label)} /></a>
</div>

<style lang="postcss">
	.seealso {
		@apply relative mb-4 pl-12;

		& .icon {
			@apply absolute left-3 top-0 w-4 text-center font-bold text-faq-question;
			margin-left: 0.175rem;
		}

		& + :global(.seealso) {
			@apply -mt-4;
		}

		&:last-child {
			@apply mb-0;
		}
	}
</style>
