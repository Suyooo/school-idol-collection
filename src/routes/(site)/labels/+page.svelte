<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import Button from "$lib/style/Button.svelte";
    import type { Snapshot } from "./$types.js";

    let width: number,
        height: number,
        padding: number,
        cardNos: string,
        error: string | undefined,
        form: HTMLFormElement;

    export const snapshot: Snapshot = {
        capture: () => ({ width, height, padding, cardNos }),
        restore: (value) => ({ width, height, padding, cardNos } = value),
    };

    const setPreset: FormEventHandler<HTMLSelectElement> = (e) => {
        if (e.currentTarget.value) {
            [width, height, padding] = e.currentTarget.value.split("x").map((x) => parseInt(x));
            (<HTMLOptionElement>e.currentTarget.children[0]).selected = true;
        }
    };

    function submit() {
        if (!width || !height) {
            error = "You must set the page size (or select a preset)";
            return;
        }
        if (!padding) {
            error = "You must set the page margin size (or select a preset)";
            return;
        }
        if (width - padding * 2 < 63.5) {
            error = "The page (minus margins) is not wide enough to fit any labels";
            return;
        }
        if (!cardNos) {
            error = "You must enter at least one card number";
            return;
        }

        error = undefined;
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
                <div class="row">
                    <div class="col-half lg:pr-4">
                        <h6>Page Settings</h6>
                        <div>
                            <b>Presets:</b>
                            <select on:change={setPreset} class="flex-grow">
                                <option disabled selected>Select Size</option>
                                <option value="210x297x9">DIN A4</option>
                                <option value="216x279x10">US Letter</option>
                            </select>
                        </div>
                        <div class="mt-4">
                            <b>Custom Size:</b>
                            <input type="number" name="width" bind:value={width} /> x
                            <input type="number" name="height" bind:value={height} /> mm
                        </div>
                        <div class="mt-1">
                            <b>Custom Page Margins:</b>
                            <input type="number" name="padding" bind:value={padding} /> mm
                        </div>
                    </div>
                    <div class="col-half lg:pl-4">
                        <h6>Card Numbers</h6>
                        <div class="mb-2">
                            Enter the card numbers (starting with "LL", "EX" or "PR") of the cards that you want to
                            print labels for. Seperate them with commas, spaces or line breaks.<br />
                            For faster entry, you can leave out the "-", and case does not matter.
                        </div>
                        <textarea
                            name="cardNos"
                            bind:value={cardNos}
                            placeholder={"LL01-001\nLL01-002\nLL01-003\n..."}
                        />
                    </div>
                </div>
            </form>
            <div class="flex items-center justify-end w-full">
                {#if error}
                    <b class="text-highlight-red mr-4">Error: {error}</b>
                {/if}
                <Button label="Print" accent on:click={submit}>Print</Button>
            </div>
        </div>
    </div>
    <div class="panel">
        <div class="panel-inner">
            <h4>How to Use</h4>
            <div class="lg:float-right lg:ml-4 mb-2 flex w-full lg:w-[unset] justify-center">
                <img class="max-w-md" src="/images/photos/labels_example.jpg" alt="Example for the Label Printer" />
            </div>
            If you own SIC cards, the&nbsp;<b>Label Printer</b> allows you to create small tags for your collection.
            With these, you can add translations for Skills and Live Costumes to their sleeving, and play without having
            to learn all the card info!<br /><br />
            Enter the card numbers of your deck above, and select the paper size your printer uses. The site will generate
            a document with all the labels you need. Once you've printed it, all you need is scissors to cut everything out.<br
            /><br />
            If you don't own a printer, you can also bring the labels to a public printer or print shop. Most desktop operating
            systems allow you to save any printable page as PDF - just look for something like "Save as PDF" in the printer
            list after pressing the "Print" button.<br /><br />
            (Note that it is not guaranteed that cards with these labels are tournament legal, since they cover up the original
            card info and text. The labels are mainly meant for casual play. Please ask the organizers about whether you
            can use the labeled cards before playing with them!)
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
