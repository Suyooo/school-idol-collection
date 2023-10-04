<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import { tooltip } from "svooltip";
    import Button from "$l/style/Button.svelte";
    import type { Snapshot } from "./$types.js";

    let width: number, height: number, margin: number, cardNos: string, form: HTMLFormElement;

    export const snapshot: Snapshot = {
        capture: () => ({ width, height, margin, cardNos }),
        restore: (value) => ({ width, height, margin, cardNos } = value),
    };

    const setPreset: FormEventHandler<HTMLSelectElement> = (e) => {
        if (e.currentTarget.value) {
            [width, height, margin] = e.currentTarget.value.split("x").map((x) => parseInt(x));
            (<HTMLOptionElement>e.currentTarget.children[0]).selected = true;
        }
    };

    let blockedBySize: boolean, blockedByMargin: boolean, blockedByCards: boolean, submitIsBlocked: boolean;
    $: blockedBySize = !width || !height || !margin;
    $: blockedByMargin = width - margin * 2 < 63.5;
    $: blockedByCards = !cardNos;
    $: submitIsBlocked = blockedBySize || blockedByMargin || blockedByCards;

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
                    <div class="col-half lg:pr-4 grid grid-cols-[1fr,2fr] md:grid-cols-[1fr,3fr] gap-2 items-center">
                        <h6 class="col-span-2 m-0">Page Settings</h6>
                        <b>Presets</b>
                        <select on:change={setPreset} class="flex-grow">
                            <option disabled selected>Select Size</option>
                            <option value="210x297x9">DIN A4</option>
                            <option value="216x279x10">US Letter</option>
                        </select>
                        <div class="h-4 col-span-full" />
                        <b>Sheet Size</b>
                        <div>
                            <input type="number" name="width" bind:value={width} /> x
                            <input type="number" name="height" bind:value={height} /> mm
                        </div>
                        <b>Printer Margins</b>
                        <div><input type="number" name="margin" bind:value={margin} /> mm</div>
                    </div>
                    <div class="col-half lg:pl-4">
                        <h6 class="m-0">Card Numbers</h6>
                        <div class="mb-2">
                            Enter the card numbers (starting with "LL", "EX" or "PR") of the cards that you want to
                            print labels for. Seperate them with commas, spaces or line breaks.<br />
                            To make it easier to enter the numbers for lots of cards, you can leave out the "-", and capitalization
                            does not matter.
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
                <div
                    use:tooltip={{
                        content: blockedBySize
                            ? "You must set page size and margins."
                            : blockedByMargin
                            ? "With the given margin, the page would not fit any labels."
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
            <div class="lg:float-right lg:ml-4 mb-2 flex w-full lg:w-[unset] justify-center">
                <img class="max-w-md" src="/images/photos/labels_example.jpg" alt="Example for the Label Printer" />
            </div>
            If you own SIC cards, the&nbsp;<b>Label Printer</b> allows you to create small tags for your collection.
            With these, you can add translations for Skills and Live Costumes to their sleeving, and play without having
            to memorize all the card info!<br /><br />
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
