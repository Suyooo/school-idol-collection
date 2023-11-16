<script lang="ts">
	import { onMount } from "svelte";
	import "../../../../app.css";
	import Button from "$lib/style/Button.svelte";
	import type { ActionData } from "./$types.js";
	import Shelving from "./shelf.js";
	import Label from "./Label.svelte";
	import Spinner from "$lib/style/icons/Spinner.svelte";

	export let form: ActionData;
	let width: number = form?.width ? parseInt(form?.width.toString()) : 0;
	let height: number = form?.height ? parseInt(form?.height.toString()) : 0;
	let margin: number = form?.margin ? parseInt(form?.margin.toString()) : 0;
	let size: number = form?.size ? parseInt(form?.size.toString()) : 0;
	let spacing: number = form?.spacing ? parseInt(form?.spacing.toString()) : 0;
	let wide: string = form?.wide?.toString() ?? "";
	let contentWidth: number,
		contentHeight: number,
		shelfCardNos: string[][],
		shelfElements: HTMLTableCellElement[] = [],
		pageSize: HTMLDivElement,
		pageStyle: HTMLStyleElement;

	$: contentWidth = width - margin * 2;
	$: contentHeight = height - margin * 2;
	let showSpinner = true;

	onMount(() => {
		showSpinner = false;
		if (form === null || form.cardNos.length === 0) return;

		// Sort all the labels into horizontal shelves
		const shelfHorz = new Shelving<string>(pageSize.clientWidth);
		for (const i in form.cardNos) {
			shelfHorz.add(
				form.cardNos[i],
				shelfElements[i].children[0].clientWidth,
				shelfElements[i].children[0].clientHeight
			);
		}
		shelfCardNos = shelfHorz.get();

		requestAnimationFrame(() => {
			// Sort those shelves into vertical shelves
			const shelfVert = new Shelving<string[]>(pageSize.clientHeight);
			for (const i in shelfCardNos) {
				// Reorder labels within shelf in height order (to reduce extra cuts needed on the left side due to holes)
				const sortedCardNos = shelfCardNos[i]
					.map((cardNo, ii) => ({ cardNo, height: shelfElements[i].children[ii].clientHeight }))
					.sort((a, b) => b.height - a.height)
					.map(({ cardNo }) => cardNo);
				shelfVert.add(sortedCardNos, 1, shelfElements[i].clientHeight);
			}
			shelfCardNos = shelfVert.get().flat();
			pageStyle.innerHTML = `@page { margin: ${margin}mm 0; size: ${width}mm ${height}mm`;
		});
	});
</script>

<svelte:head>
	<style bind:this={pageStyle}></style>
	<title>Label Printer → Print &bull; SIC</title>
</svelte:head>

{#if !form || form.cardNos.length + form.invalidCardNos.length + form.filteredCardNos.length === 0}
	You have added no cards to print labels for. <a href="/labels" class="underline">Go back</a>
{:else}
	<div class="info">
		{#if form.invalidCardNos.length > 0}
			<div class="error">
				<b>The following card numbers are invalid and were removed:</b>
				{form.invalidCardNos.join(", ")}
			</div>
		{/if}
		{#if form.filteredCardNos.length > 0}
			<div class="error">
				<b>The following cards had no Skills or Live Costumes and were removed:</b>
				{form.filteredCardNos.join(", ")}
			</div>
		{/if}
		{#if form.duplicateCardNos.length > 0}
			<div class="error">
				<b
					>The following cards appear multiple times - they were NOT removed, please make sure you actually want
					multiple labels for these:</b
				>
				{form.duplicateCardNos.join(", ")}
			</div>
		{/if}
		<div>
			{#if form.cardNos.length === 0}
				No cards were left to be labeled. Close the tab and change the card number list!
			{:else}
				<div class="my-4 flex h-9 w-full items-center justify-between">
					{#if showSpinner}
						<span>Building page layout... (Make sure you have JavaScript enabled in your browser!)</span>
						<Spinner />
					{:else}
						<b>{form.cardNos.length} label{form.cardNos.length === 1 ? "" : "s"} ready to print!</b>
						<Button label="Print" accent on:click={() => print()}>Print</Button>
					{/if}
				</div>
				<div class="mt-2">
					<div class="-indent-5">
						<b>①</b> Print this page one-sided, at the highest quality and at original (or 100%) scale. Check the print preview
						caregully - you may need to enable "Print Backgrounds" or similar options to make sure that all icons show up!
						You can also only print one page at first to test the quality first.
					</div>
					<div class="mt-2 -indent-5">
						<b>②</b> Double-check the size with a ruler after the print - the distance between the grey lines should be 63.5mm
						(2.5in) for cards in portrait orientation and 88mm (3.47in) for cards in landscape orientation. If the text is
						too hard to read, try increasing font size or width.
					</div>
					<div class="mt-2 -indent-5">
						<b>③</b> Cut out each label along the grey lines. Then, fold the labels on the black line below the card number
						and ID.
					</div>
					<div class="mt-2 -indent-5">
						<b>④</b> Wrap the labels around the cards, then put them into their sleeve or a folder to hold them in place.
					</div>
				</div>
			{/if}
		</div>
	</div>

	{#if showSpinner}
		<div class="mt-16"><Spinner /></div>
	{/if}
	<div
		bind:this={pageSize}
		class="absolute left-[1000vw] print:hidden"
		style:width={contentWidth + "mm"}
		style:height={contentHeight + "mm"}
	/>
	<table
		class="nostyle sheets"
		style:margin={"0 " + margin + "mm"}
		style:--page-margin={margin + "mm"}
		style:--skill-font-size={size + "mm"}
		style:--skill-font-spacing={spacing + "mm"}
		style:--skill-font-width={wide}
		class:opacity-0={showSpinner}
		data-theme="print"
	>
		{#each shelfCardNos ?? form.cardNos.map((c) => [c]) as shelf, i}
			<tr class="shelf">
				<td style:width={contentWidth + "mm"} bind:this={shelfElements[i]}>
					{#each shelf as cardNo}
						<Label {cardNo} byCardNo={form.byCardNo} byCardId={form.byCardId} />
					{/each}
				</td>
			</tr>
		{/each}
	</table>
{/if}

<style lang="postcss">
	@font-face {
		font-family: "Open Sans";
		src: url("/vendor/OpenSans-VariableFont_wdth,wght.ttf") format("truetype");
	}

	:global(body) {
		@apply flex flex-col items-center;
	}

	.info {
		@apply m-4 max-w-2xl;

		& .error b {
			@apply text-error-text;
		}
	}

	.sheets {
		@apply m-0 select-none bg-white text-black;
		border: var(--page-margin) solid white;

		& :global(.skill-icon) {
			margin-top: -0.133rem;
			vertical-align: middle;
		}

		& :global(a) {
			@apply !no-underline;
		}
	}

	@media print {
		:global(body) {
			@apply m-0 block bg-white text-black;
		}

		.info {
			@apply hidden;
		}

		.sheets {
			margin: 0;
			padding: 0;
			border: none;
		}
	}

	.shelf {
		& > td {
			@apply flex;
			margin-bottom: -0.5mm;
		}

		&:nth-child(odd) > td {
			@apply items-end;
		}

		&:nth-child(even) > td {
			@apply items-start;
		}
	}
</style>
