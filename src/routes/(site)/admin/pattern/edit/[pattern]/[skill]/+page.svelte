<script lang="ts">
    import { goto } from "$app/navigation";
    import TriggerEnum from "$l/enums/trigger.js";
    import PatternGroupType from "$l/translation/patternGroupType.js";
    import Button from "$l/style/Button.svelte";
    import type { PatternGroupTypeID } from "../../../../../../../lib/translation/patternGroupType.js";
    import type { PageData } from "./$types.js";
    import Pill from "./Pill.svelte";

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
    <title>Admin → Pattern → Edit &bull; SIC</title>
</svelte:head>

<div class="content">
    <h5>Triggers</h5>
    <div class="panel">
        <div class="panel-inner" id="trigDiv">
            <div class="row">
                {#each TriggerEnum.all as t}
                    <div class="col-quarter">
                        <input type="checkbox" id="trig{t.id}" bind:checked={triggers[t.id]} />
                        <label for="trig{t.id}">{t.toName()}</label>
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <h5>Pattern</h5>
    <div class="panel">
        <div class="panel-inner">
            <div class="row">
                <div class="col-half px-2">
                    <h6>Regex</h6>
                    {#key data}
                        <textarea id="regex" bind:value={regex} bind:this={regexTextarea} />
                    {/key}
                    {#if errorRegex}
                        <div class="error">{errorRegex}</div>
                    {/if}

                    <Pill refocus={regexTextarea}>([０-９]+)</Pill>
                    <Pill refocus={regexTextarea}>([０-９])([０-９])([０-９])</Pill>
                    <Pill refocus={regexTextarea}>((?:【(?:オール|赤|緑|青)】)+)</Pill>
                    <Pill refocus={regexTextarea}>(【(?:オール|赤|緑|青)】)</Pill>
                    <Pill refocus={regexTextarea}>([^「」]+?)</Pill>
                </div>
                <div class="col-half px-2">
                    <h6>Template</h6>
                    {#key data}
                        <textarea id="template" bind:value={template} bind:this={templateTextarea} />
                    {/key}
                    {#if errorTemplate}
                        <div class="error">{errorTemplate}</div>
                    {/if}

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
                    <i class="text-sm"
                        ><br />Capitalization: "Stage" "Stand-By" "Hand" "Deck" "Member" "Song" "card" "Live Outfit"
                        "Live Points" "Attribute" "Collection" "Idolized"<br />
                        In quotes: Names, Groups, Years, Song Names, Card Names/IDs</i
                    >
                </div>
            </div>
        </div>
    </div>
    <h5>Groups</h5>
    <div class="panel">
        <div class="panel-inner" id="groupslist">
            {#each { length: lastMatch.length - 1 } as _, g}
                <h6>Group {g} <span>{lastMatch[g + 1]}</span></h6>
                <div class="row">
                    {#each PatternGroupType.all as t}
                        <div class="col-quarter">
                            <input
                                type="radio"
                                name="group{g}"
                                id="group{g}_type{t.id}"
                                bind:group={groupTypeIds[g]}
                                value={t.id}
                            />
                            <label for="group{g}_type{t.id}">{t.name}</label>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
    <div class="flex items-center justify-end mt-2 w-full">
        <Button label="Submit" accent on:click={submit} disabled={!lastSuccessful}>Submit</Button>
    </div>
    <h5>Test</h5>
    <div class="panel">
        <div class="panel-inner">
            <div class="row">
                <div class="col-half px-2">
                    <h6>Example</h6>
                    {#key data}
                        <textarea id="example" bind:value={example} />
                    {/key}
                </div>
                <div class="col-half px-2">
                    <h6>Result</h6>
                    <span class:text-primary-500={!lastSuccessful}>{result}</span>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    h5 {
        @apply clear-both;
    }

    .panel h6 {
        @apply m-0 text-sm;

        & span {
            @apply bg-primary-900 font-normal px-1 normal-case tracking-normal text-white;
        }
    }

    .error {
        @apply bg-red-700 rounded mb-2 p-2;
    }
</style>
