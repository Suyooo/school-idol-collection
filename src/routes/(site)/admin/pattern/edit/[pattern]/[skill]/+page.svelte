<script lang="ts">
	import { goto } from "$app/navigation";
	import TriggerEnum from "$lib/enums/trigger.js";
	import PatternGroupType from "$lib/translation/patternGroupType.js";
	import Button from "$lib/style/Button.svelte";
	import type { PatternGroupTypeID } from "../../../../../../../lib/translation/patternGroupType.js";
	import type { PageData } from "./$types.js";
	import Pill from "./Pill.svelte";
	import Go from "$lib/style/icons/Go.svelte";
	import TriggerComponent from "$lib/format/TriggerComponent.svelte";

	export let data: PageData;
	// Not reactive to stop inputs getting reset on every change. There should be no links from this route to itself
	let { isNew, patternId, triggers, groupTypeIds, example, regex, template } = data;

	let lastMatch: RegExpExecArray = <RegExpExecArray>[""],
		lastSuccessful: boolean = false,
		result: string = "",
		regexTextarea: HTMLTextAreaElement,
		templateTextarea: HTMLTextAreaElement,
		disabled: boolean,
		errorRegex: string | undefined,
		errorTemplate: string | undefined;

	$: {
		example;
		regex;
		template;
		groupTypeIds;
		update();
	}

	async function update() {
		errorRegex = errorTemplate = "";
		lastSuccessful = false;
		let match = null;
		try {
			match = new RegExp(regex).exec(example);
		} catch (e: any) {
			errorRegex = e.message;
		}

		if (match === null) {
			if (errorRegex === "") errorRegex = "Regex doesn't match example";
		} else {
			lastMatch = match;
			result = template;
			for (let i = 1; i < match.length; i++) {
				const previous = result;
				const groupType = PatternGroupType.get(<PatternGroupTypeID>groupTypeIds[i - 1]);
				const repl = await groupType.getReplacement(null, match[i]);
				result = result.replace(new RegExp(`<${i}>`, "g"), repl);
				const extraRepl = groupType.getExtraReplacements(match[i], i);
				if (extraRepl !== null) {
					for (const [from, to] of extraRepl) {
						result = result.replace(new RegExp(from, "g"), to);
					}
				}
				if (previous === result) {
					errorTemplate = `Group ${i} had no effect during replacements`;
				}
			}
			if (errorTemplate === "") lastSuccessful = true;
		}
	}

	function submit() {
		if (!lastSuccessful || disabled) return;
		disabled = true;
		const sendData = {
			triggers,
			regex,
			template,
			groupTypeIds: groupTypeIds.slice(0, lastMatch.length - 1),
		};

		fetch(`/admin/pattern/edit/${isNew ? "new" : patternId}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(sendData),
		})
			.then((res) => {
				if (res.status !== 200) {
					throw new Error(res.status + " " + res.statusText);
				}
				res.json().then((j) => goto(`/admin/pattern/apply/${j.patternId}`));
			})
			.catch((e) => {
				alert("Failed to edit: " + e.message);
			})
			.finally(() => {
				disabled = false;
			});
	}
</script>

<svelte:head>
	<title>Edit (Patterns Admin Panel) &bull; SIC</title>
</svelte:head>

<h1>
	<div>
		<a class="button" href="/admin">Admin Panel</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
		<a class="button" href="/admin/pattern">Patterns</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
	</div>
	Edit
</h1>
<div class="flex gap-4 max-lg:flex-col">
	<div class="flex-grow-[3] basis-0">
		<div class="panel">
			<div class="panel-inner">
				<h2>Pattern</h2>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<h3>Regex</h3>
						<div class="mb-2">
							{#key data}
								<textarea id="regex" bind:value={regex} bind:this={regexTextarea} />
							{/key}
							{#if errorRegex}
								<div class="error">{errorRegex}</div>
							{/if}
						</div>
						<Pill refocus={regexTextarea}>([０-９]+)</Pill>
						<Pill refocus={regexTextarea}>([０-９])([０-９])([０-９])</Pill>
						<Pill refocus={regexTextarea}>((?:【(?:オール|赤|緑|青)】)+)</Pill>
						<Pill refocus={regexTextarea}>(【(?:オール|赤|緑|青)】)</Pill>
						<Pill refocus={regexTextarea}>([^「」]+?)</Pill>
					</div>
					<div>
						<h3>Template</h3>
						<div class="mb-2">
							{#key data}
								<textarea id="template" bind:value={template} bind:this={templateTextarea} />
							{/key}
							{#if errorTemplate}
								<div class="error">{errorTemplate}</div>
							{/if}
						</div>
						<Pill refocus={templateTextarea}>⟪SCOUT⟫</Pill>
						<Pill refocus={templateTextarea}>⟪ENTER⟫</Pill>
						<Pill refocus={templateTextarea}>⟪LIVE⟫</Pill>
						<Pill refocus={templateTextarea}>[LIVE]</Pill>
						<Pill refocus={templateTextarea}>[RUSH]</Pill>
						<Pill refocus={templateTextarea}>[ALL]</Pill>
						<Pill refocus={templateTextarea}>[SMILE]</Pill>
						<Pill refocus={templateTextarea}>[PURE]</Pill>
						<Pill refocus={templateTextarea}>[COOL]</Pill>
						<Pill refocus={templateTextarea}>the Any Piece requirement is reduced by &lt;X&gt;</Pill>
						<Pill refocus={templateTextarea}
							>the Attribute Piece requirement changes to [&lt;X&gt;&lt;X&gt;&lt;X&gt;]</Pill
						>
						<Pill refocus={templateTextarea}>you have Members on Stand-By</Pill>
						<Pill refocus={templateTextarea}>on Stand-By on your Stage</Pill>
						<Pill refocus={templateTextarea}>If you do,</Pill>
						<Pill refocus={templateTextarea}>you may</Pill>
						<Pill refocus={templateTextarea}>gain +&lt;X&gt;</Pill>
						<Pill refocus={templateTextarea}>in your Hand</Pill>
						<Pill refocus={templateTextarea}>without Stars</Pill>
						<Pill refocus={templateTextarea}>1 Star or more</Pill>
						<Pill refocus={templateTextarea}>Flip/Look at the top card of your Deck</Pill>
						<Pill refocus={templateTextarea}>add/return a card to your Hand</Pill>
						<Pill refocus={templateTextarea}>Do either: ①②</Pill>
						<Pill refocus={templateTextarea}>face-down</Pill>
						<Pill refocus={templateTextarea}>face-up</Pill>
						<Pill refocus={templateTextarea}>base Live Points</Pill>
						<Pill refocus={templateTextarea}>bring from your Collection to your Stage</Pill>
						<Pill refocus={templateTextarea}>«LIVE» with this Member</Pill>
						<Pill refocus={templateTextarea}>returned Member</Pill>
						<Pill refocus={templateTextarea}>differently named (group) Members (with)</Pill>
						<Pill refocus={templateTextarea}>gain ♪Live Points +&lt;X&gt;♪</Pill>
						<div class="block text-xs italic leading-3">
							Capitalization: "Stage" "Stand-By" "Hand" "Deck" "Member" "Song" "card" "Live Outfit" "Live Points"
							"Attribute" "Collection" "Idolized"<br />
							In quotes: Names, Groups, Years, Song Names, Card Names/IDs
						</div>
					</div>
				</div>
				<div class="mt-2 flex w-full items-center justify-end">
					<Button label="Save Pattern and go to Apply Page" accent on:click={submit} disabled={!lastSuccessful}
						>Save and Apply</Button
					>
				</div>
			</div>
		</div>

		<div class="panel mt-4">
			<div class="panel-inner">
				<h2>Test</h2>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<h3>Example</h3>
						{#key data}
							<textarea id="example" bind:value={example} />
						{/key}
					</div>
					<div>
						<h3>Result</h3>
						<span class:text-text-subtle={!lastSuccessful}>{result}</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="flex-grow basis-0">
		<div class="panel">
			<div class="panel-inner">
				<h2>Triggers</h2>
				<div class="grid grid-cols-2">
					{#each TriggerEnum.all as t}
						<div>
							<input type="checkbox" id="trig{t.id}" bind:checked={triggers[t.id]} />
							<label for="trig{t.id}"><TriggerComponent trigger={t} /></label>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="panel mt-4">
			<div class="panel-inner" id="groupslist">
				<h2>Groups</h2>
				{#each { length: lastMatch.length - 1 } as _, g}
					<div class="mt-2 flex items-center gap-1">
						<h3 class="!m-0">G{g}</h3>
						<div class="rounded bg-background-highlight px-1 py-0.5 text-xs font-normal tracking-tighter text-text">
							{lastMatch[g + 1]}
						</div>
					</div>
					{#each PatternGroupType.all as t}
						<div class="col-quarter">
							<input type="radio" name="group{g}" id="group{g}_type{t.id}" bind:group={groupTypeIds[g]} value={t.id} />
							<label for="group{g}_type{t.id}">{t.name}</label>
						</div>
					{/each}
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.error {
		@apply mt-2 rounded border-4 border-error-border bg-error-background px-2 py-1;
	}
</style>
