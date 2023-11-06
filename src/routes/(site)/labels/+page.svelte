<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";
	import { tooltip } from "svooltip";
	import Button from "$lib/style/Button.svelte";
	import type { Snapshot } from "./$types.js";

	let width: number,
		height: number,
		margin: number,
		size: number = 4,
		spacing: number = 0,
		wide: string = "semi-condensed",
		cardNos: string,
		form: HTMLFormElement;

	export const snapshot: Snapshot = {
		capture: () => ({ width, height, margin, size, spacing, wide, cardNos }),
		restore: (value) => ({ width, height, margin, size, spacing, wide, cardNos } = value),
	};

	const setPreset: FormEventHandler<HTMLSelectElement> = (e) => {
		if (e.currentTarget.value) {
			[width, height, margin] = e.currentTarget.value.split("x").map((x) => parseInt(x));
			(<HTMLOptionElement>e.currentTarget.children[0]).selected = true;
		}
	};

	let blockedBySize: boolean,
		blockedByMargin: boolean,
		blockedByCards: boolean,
		submitIsBlocked: boolean,
		blockedByFontSize: boolean,
		blockedBySpacing: boolean;
	$: blockedBySize = !width || !height || !margin;
	$: blockedByMargin = width - margin * 2 < 63.5;
	$: blockedByCards = !cardNos;
	$: blockedByFontSize = !size || size <= 0;
	$: blockedBySpacing = (!spacing && spacing !== 0) || spacing < 0;
	$: submitIsBlocked = blockedBySize || blockedByMargin || blockedByCards || blockedByFontSize || blockedBySpacing;

	function submit() {
		form.submit();
	}
</script>

<svelte:head>
	<title>Label Printer &bull; SIC</title>
</svelte:head>

<div class="content">
	<h3>Label Printer</h3>
	<div class="panel">
		<div class="panel-inner">
			<form action="/labels/print" method="POST" target="_blank" bind:this={form}>
				<div class="row items-start">
					<div class="col-half grid grid-cols-[1fr,2fr] items-center gap-2 md:grid-cols-[1fr,3fr] lg:pr-4">
						<h6 class="col-span-2 m-0">Page Settings</h6>
						<select on:change={setPreset} class="col-span-full flex-grow" class:text-input-placeholder={!blockedBySize}>
							<option disabled selected>Select a Size Preset</option>
							<option value="210x297x9">DIN A4</option>
							<option value="216x279x10">US Letter</option>
						</select>
						<b>Sheet Size</b>
						<div>
							<input type="number" name="width" bind:value={width} min="63" class:invalid={!width && !!height} /> x
							<input type="number" name="height" bind:value={height} min="15" class:invalid={!!width && !height} /> mm
						</div>
						<b>Printer Margins</b>
						<div>
							<input
								type="number"
								name="margin"
								bind:value={margin}
								min="0"
								class:invalid={!margin && !!width && !!height}
							/> mm
						</div>
						<div class="col-span-full" />
						<b>Font Size</b>
						<div>
							<input type="number" name="size" bind:value={size} min="1" class:invalid={blockedByFontSize} /> mm
						</div>
						<b>Line Spacing</b>
						<div>
							<input type="number" name="spacing" bind:value={spacing} min="0" class:invalid={blockedBySpacing} /> mm
						</div>
						<b>Font Width</b>
						<select class="flex-grow" name="wide" bind:value={wide}>
							<option value="condensed">Condensed</option>
							<option value="semi-condensed" selected>Default</option>
							<option value="normal">Wide</option>
						</select>
					</div>
					<div class="col-half lg:pl-4">
						<h6 class="m-0">Card Numbers</h6>
						<div class="mb-2">
							Enter the card numbers (starting with "LL", "EX" or "PR") of the cards that you want to print labels for.
							Seperate them with commas, spaces or line breaks.<br />
							To make it easier to enter the numbers for lots of cards, you can leave out the "-", and capitalization does
							not matter.
						</div>
						<textarea name="cardNos" bind:value={cardNos} placeholder={"LL01-001,LL01-002,LL01-003,..."} />
					</div>
				</div>
			</form>
			<div class="flex w-full items-center justify-end">
				<div
					use:tooltip={{
						content: blockedBySize
							? "You must set page size and margins."
							: blockedByMargin
							? "With the given margin, the page would not fit any labels."
							: blockedByFontSize
							? "Font size must be higher than 0."
							: blockedBySpacing
							? "Line spacing must be 0 or higher."
							: "You must enter at least one card number.",
						placement: "top",
						offset: -5,
						visibility: submitIsBlocked,
					}}
				>
					<Button label="Print" accent on:click={submit} disabled={submitIsBlocked}>Print</Button>
				</div>
			</div>
		</div>
	</div>
	<div class="panel">
		<div class="panel-inner">
			<h4>How to Use</h4>
			<div class="mb-2 flex w-full justify-center lg:float-right lg:ml-4 lg:w-[unset]">
				<img class="max-w-md" src="/images/photos/labels_example.jpg" alt="Example for the Label Printer" />
			</div>
			If you own SIC cards, the&nbsp;<b>Label Printer</b> allows you to create small tags for your collection. With
			these, you can add translations for Skills and Live Costumes to their sleeving, and play without having to
			memorize all the card info!<br /><br />
			Enter the card numbers of your deck above, and select the paper size your printer uses. The site will generate a document
			with all the labels you need. Once you've printed it, all you need is scissors to cut everything out.<br /><br />
			If you don't own a printer, you can also bring the labels to a public printer or print shop. Most desktop operating
			systems allow you to save any printable page as PDF - just look for something like "Save as PDF" in the printer list
			after pressing the "Print" button.<br /><br />
			(Note that it is not guaranteed that cards with these labels are tournament legal, since they cover up the original
			card info and text. The labels are mainly meant for casual play. Please ask the organizers about whether you can use
			the labeled cards before playing with them!)
		</div>
	</div>
</div>

<style lang="postcss">
	input[type="number"] {
		@apply w-20;
	}

	.col-half {
		& > * {
			@apply flex items-center gap-x-2;

			& + * {
				@apply mt-1;
			}
		}
	}
</style>
