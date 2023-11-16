<script lang="ts">
	import { isCardSkillShortInfo } from "$lib/translation/skills.js";
	import type { ShortSkillInfo } from "$lib/translation/skills.js";
	import Button from "$lib/style/Button.svelte";
	import type { PageData } from "./$types.js";
	import PageHeader from "$lib/style/PageHeader.svelte";

	export let data: PageData;
	let id: number,
		applicable: ShortSkillInfo[],
		checkboxes: HTMLInputElement[] = [],
		disabled: boolean = false;
	$: id = data.pattern.id;
	$: applicable = data.applicable;

	function toggleAll(e: Event) {
		checkboxes.forEach((c) => (c.checked = (<HTMLInputElement>e.target).checked));
	}

	function submit() {
		if (disabled) return;
		disabled = true;
		const applyTo = checkboxes.map((c, i) => (c.checked ? applicable[i].skillId : null)).filter((v) => v !== null);
		if (applyTo.length === 0) {
			disabled = false;
			return;
		}

		fetch(`/admin/pattern/apply/${id}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(applyTo),
		})
			.then((res) => {
				if (res.status !== 200) {
					throw new Error(res.status + " " + res.statusText);
				}
				alert(`Applied pattern to ${applyTo.length} skill(s).`);
			})
			.catch((e) => {
				alert("Failed to apply: " + e.message);
			})
			.finally(() => {
				disabled = false;
			});
	}
</script>

<svelte:head>
	<title>Apply (Patterns Admin Panel) &bull; SIC</title>
</svelte:head>

<PageHeader
	breadcrumbs={[
		["/admin", "Admin Panel"],
		["/admin/pattern", "Patterns"],
	]}
>
	Apply
</PageHeader>
<div class="panel">
	<div class="panel-inner">
		<table class="info">
			<tr>
				<td>Pattern ID</td>
				<td>
					{data.pattern.id}
					<Button label="Edit this Pattern" class="ml-2" small href="/admin/pattern/edit/{id}/{applicable[0].skillId}/">
						Edit Pattern
					</Button>
				</td>
			</tr>
			<tr><td>Regex</td><td>{data.pattern.regex}</td></tr>
			<tr><td>Template</td><td>{data.pattern.template}</td></tr>
		</table>
		<table class="mt-8">
			<thead>
				<tr>
					<th>Card</th>
					<th>JPN</th>
					<th>ENG</th>
					<th>Apply</th>
				</tr>
			</thead>
			<tbody>
				{#each applicable as a, i}
					<tr>
						<td>
							{#if isCardSkillShortInfo(a)}
								<a href="/card/{a.cardNo}/">{a.cardNo}</a>
							{:else}
								<a href="/card/{a.firstCardNo}/">Group #{a.groupId}</a>
							{/if}
						</td>
						<td>{a.skillJpn}</td>
						<td>{a.skillEng}</td>
						<td><input type="checkbox" data-skill={a.skillId} bind:this={checkboxes[i]} /></td>
					</tr>
				{/each}
			</tbody>
		</table>

		<div class="mt-2 flex w-full items-center justify-end">
			<label for="all" class="mr-2 font-bold">Select All</label>
			<input id="all" class="mr-4" type="checkbox" on:change={toggleAll} />

			<Button label="Apply and Update English Skills Texts" accent on:click={submit} {disabled}>Apply to Skills</Button>
		</div>
	</div>
</div>

<style lang="postcss">
	.info td {
		@apply !text-left;

		&:first-child {
			@apply w-0 whitespace-nowrap;
		}

		&:last-child {
			@apply flex;
		}
	}

	td:last-child {
		@apply text-center;
	}
</style>
