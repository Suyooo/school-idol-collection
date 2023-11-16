<script lang="ts">
	import { isCardSkillShortInfo } from "$lib/translation/skills.js";
	import type { ShortSkillInfo } from "$lib/translation/skills.js";
	import type { PageData } from "./$types.js";
	import Button from "$lib/style/Button.svelte";
	import Go from "$lib/style/icons/Go.svelte";

	export let data: PageData;
	let untranslated: ShortSkillInfo[];
	$: untranslated = data.untranslated;
</script>

<svelte:head>
	<title>Untranslated (Patterns Admin Panel) &bull; SIC</title>
</svelte:head>

<h1>
	<div>
		<a class="button" href="/admin">Admin Panel</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
		<a class="button" href="/admin/pattern">Patterns</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
	</div>
	Untranslated
</h1>

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
