<script lang="ts" context="module">
	import { type Writable, writable } from "svelte/store";
	import Button from "$lib/style/Button.svelte";
	import type { CheckResult, CheckSkillList } from "./+server.js";
	import CheckElement from "./CheckElement.svelte";
	import Go from "$lib/style/icons/Go.svelte";

	type CheckSkillListWithResults = CheckSkillList & {
		results: Writable<Promise<CheckResultWithUi> | null>[];
	};

	export type CheckResultWithUi = CheckResult & {
		expand: boolean;
	};
</script>

<script lang="ts">
	let disabled: boolean = false,
		checkSkillListPromise: Promise<CheckSkillListWithResults[]> | null = null;

	function start() {
		if (disabled) return;
		disabled = true;

		checkSkillListPromise = new Promise((checkSkillResolve, checkSkillReject) => {
			fetch(`/admin/card/check`, {
				method: "POST",
			})
				.then(async (res) => {
					if (res.status !== 200) {
						checkSkillReject(res.status + " " + res.statusText);
					}

					const checkSkillList: CheckSkillListWithResults[] = ((await res.json()) as CheckSkillList[]).map((c) => ({
						...c,
						results: c.annotations.map(() => writable(null)),
					}));
					checkSkillResolve(checkSkillList);

					for (const skill of checkSkillList) {
						for (const i in skill.annotations) {
							const annotation = skill.annotations[i];
							skill.results[i].set(
								new Promise<CheckResultWithUi>((checkPairResolve, checkPairReject) => {
									fetch(`/admin/card/check/pair`, {
										method: "POST",
										headers: { "Content-Type": "application/json" },
										body: JSON.stringify(annotation),
									})
										.then(async (res) => {
											if (res.status !== 200) {
												checkPairReject(res.status + " " + res.statusText);
											}

											const pairRes: CheckResult = await res.json();
											const failed =
												pairRes.onlyInJpn.length > 0 || pairRes.onlyInEng.length > 0 || pairRes.common.length === 0;
											checkPairResolve({ ...pairRes, expand: failed });
										})
										.catch((e) => {
											checkPairReject("Failed to check annotation pair: " + e.message);
										});
								})
							);
							await skill.results[i];
						}
					}
				})
				.catch((e) => {
					checkSkillReject("Failed to find Skills with Annotations: " + e.message);
				})
				.finally(() => {
					disabled = false;
				});
		});
	}
</script>

<svelte:head>
	<title>Integrity Check (Cards Admin Panel) &bull; SIC</title>
</svelte:head>

<h1>
	<div>
		<a class="button" href="/admin">Admin Panel</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
		<a class="button" href="/admin/card">Cards</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
	</div>
	Integrity Check
</h1>

<div class="panel">
	<div class="panel-inner">
		<Button label="Start Check" accent on:click={start} {disabled}>Start Check</Button>
		{#if checkSkillListPromise !== null}
			<div class="mt-4">
				{#await checkSkillListPromise}
					Searching for Skills with Annotations...
				{:then checkSkillList}
					<table>
						<tr>
							<th>ID</th>
							<th>Results</th>
							<th></th>
						</tr>
						{#each checkSkillList as check (check.skill.id)}
							{#each check.annotations as annotation, i (i)}
								<tr>
									<td class="align-text-top">
										{#if i === 0}
											{check.skill.id}
										{/if}
									</td>
									<td>
										<CheckElement {annotation} result={check.results[i]} />
									</td>
									<td class="flex gap-2">
										<Button small label="View Card with this Skill" href="/card/{check.cardNo}">View</Button>
										<Button
											small
											label="List Cards with this Skill's Pattern"
											href="/admin/pattern/apply/{check.skill.patternId}"
										>
											List
										</Button>
										<Button
											small
											label="Edit this Skill's Pattern"
											href="/admin/pattern/edit/{check.skill.patternId}/{check.skill.id}"
										>
											Edit
										</Button>
									</td>
								</tr>
							{/each}
						{/each}
					</table>
				{:catch e}
					{e}
				{/await}
			</div>
		{/if}
	</div>
</div>
