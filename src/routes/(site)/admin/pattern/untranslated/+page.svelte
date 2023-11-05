<script lang="ts">
	import { isCardSkillShortInfo } from "$lib/translation/skills.js";
	import type { ShortSkillInfo } from "$lib/translation/skills.js";
	import type { PageData } from "./$types.js";

	export let data: PageData;
	let untranslated: ShortSkillInfo[];
	$: untranslated = data.untranslated;
</script>

<svelte:head>
	<title>Admin → Pattern → Untranslated List &bull; SIC</title>
</svelte:head>

<div class="content">
	<div class="panel">
		<div class="panel-inner">
			<table>
				<thead>
					<tr>
						<th>Card</th>
						<th>JPN</th>
						<th>Create</th>
					</tr>
				</thead>
				<tbody>
					{#if untranslated.length === 0}
						<tr>
							<td colspan="3">No untranslated Skills left :)</td>
						</tr>
					{/if}
					{#each untranslated as a}
						<tr>
							{#if isCardSkillShortInfo(a)}
								<th><a href="/card/{a.cardNo}/">{a.cardNo}</a></th>
							{:else}
								<th><a href="/card/{a.firstCardNo}/">Group #{a.groupId}</a></th>
							{/if}
							<td>{a.skillJpn}</td>
							<td><a href="/admin/pattern/edit/new/{a.skillId}">Create</a></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style lang="postcss">
	td {
		@apply px-4 py-4;

		&:not(:first-child) {
			@apply border-l border-table-border;
		}
	}
</style>
