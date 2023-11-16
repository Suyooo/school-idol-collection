<script lang="ts">
	import type TranslationPattern from "$models/translation/pattern.js";
	import TriggerEnum from "$lib/enums/trigger.js";
	import TriggerComponent from "$lib/format/TriggerComponent.svelte";
	import type { PageData } from "./$types.js";
	import Button from "$lib/style/Button.svelte";
	import Go from "$lib/style/icons/Go.svelte";

	export let data: PageData;
	let list: TranslationPattern[];
	$: list = data.list;
</script>

<svelte:head>
	<title>List (Patterns Admin Panel) &bull; SIC</title>
</svelte:head>

<h1>
	<div>
		<a class="button" href="/admin">Admin Panel</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
		<a class="button" href="/admin/pattern">Patterns</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
	</div>
	List
</h1>
<div class="panel">
	<div class="panel-inner">
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Triggers</th>
					<th>Regex</th>
					<th>Template</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#if list.length === 0}
					<tr>
						<td colspan="3">No Translation Patterns</td>
					</tr>
				{/if}
				{#each list as pattern}
					<tr>
						<td>{pattern.id}</td>
						<td>
							{#if pattern.triggers === 0}
								<i class="text-xs">Flavour</i>
							{:else}
								{#each TriggerEnum.bitmaskToTriggers(pattern.triggers) as trigger}
									<TriggerComponent {trigger} />
								{/each}
							{/if}
						</td>
						<td>{pattern.regex}</td>
						<td>{pattern.template}</td>
						<td>
							<Button small label="Search Skills for this Pattern" href="/admin/pattern/apply/{pattern.id}">
								Search Skills
							</Button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
