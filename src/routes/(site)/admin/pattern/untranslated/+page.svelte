<script lang="ts">
	import { isCardSkillShortInfo } from "$lib/translation/skills.js";
	import type { ShortSkillInfo } from "$lib/translation/skills.js";
	import type { PageData } from "./$types.js";
	import Button from "$lib/style/Button.svelte";
	import PageHeader from "$lib/style/PageHeader.svelte";

	export let data: PageData;
	let untranslated: ShortSkillInfo[];
	$: untranslated = data.untranslated;
</script>

<svelte:head>
	<title>Untranslated (Patterns Admin Panel) &bull; SIC</title>
</svelte:head>

<PageHeader
	breadcrumbs={[
		["/admin", "Admin Panel"],
		["/admin/pattern", "Patterns"],
	]}
>
	Untranslated
</PageHeader>
<div class="panel">
	<div class="panel-inner">
		<table>
			<thead>
				<tr>
					<th>Card</th>
					<th>Skill</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#if untranslated.length === 0}
					<tr>
						<td colspan="3">No untranslated Skills left 👍</td>
					</tr>
				{/if}
				{#each untranslated as a}
					<tr>
						<td>
							{#if isCardSkillShortInfo(a)}
								<a href="/card/{a.cardNo}/">{a.cardNo}</a>
							{:else}
								<a href="/card/{a.firstCardNo}/">Group #{a.groupId}</a>
							{/if}
						</td>
						<td>{a.skillJpn}</td>
						<td>
							<Button small label="Create Pattern for this Skill" href="/admin/pattern/edit/new/{a.skillId}">
								Create Pattern
							</Button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
