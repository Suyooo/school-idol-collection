<script lang="ts" context="module">
    import { type Writable, writable } from "svelte/store";
    import Button from "$lib/style/Button.svelte";
    import type { CheckResult, CheckSkillList } from "./+server.js";
    import CheckElement from "./CheckElement.svelte";

    type CheckSkillListWithResults = CheckSkillList & {
        results: Writable<Promise<CheckResultWithUi> | null>[];
    };

    export type CheckResultWithUi = CheckResult & {
        expand: boolean;
    };
</script>

<script lang="ts">
    let disabled: boolean = false,
        skillListPromise: Promise<CheckSkillListWithResults[]> | null = null;

    function start() {
        if (disabled) return;
        disabled = true;

        skillListPromise = new Promise((skillResolve, skillReject) => {
            fetch(`/admin/card/check`, {
                method: "POST",
            })
                .then(async (res) => {
                    if (res.status !== 200) {
                        skillReject(res.status + " " + res.statusText);
                    }

                    const skillList: CheckSkillListWithResults[] = ((await res.json()) as CheckSkillList[]).map(
                        (c) => ({
                            ...c,
                            results: c.annotations.map(() => writable(null)),
                        })
                    );
                    skillResolve(skillList);

                    for (const skill of skillList) {
                        for (const i in skill.annotations) {
                            const annotation = skill.annotations[i];
                            skill.results[i].set(
                                new Promise<CheckResultWithUi>((checkResolve, checkReject) => {
                                    fetch(`/admin/card/check/pair`, {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify(annotation),
                                    })
                                        .then(async (res) => {
                                            if (res.status !== 200) {
                                                checkReject(res.status + " " + res.statusText);
                                            }

                                            const pairRes: CheckResult = await res.json();
                                            const failed =
                                                pairRes.onlyInJpn.length > 0 ||
                                                pairRes.onlyInEng.length > 0 ||
                                                pairRes.common.length === 0;
                                            checkResolve({ ...pairRes, expand: failed });
                                        })
                                        .catch((e) => {
                                            checkReject("Failed to check annotation pair: " + e.message);
                                        });
                                })
                            );
                            await skill.results[i];
                        }
                    }
                })
                .catch((e) => {
                    skillReject("Failed to find annotated Skills: " + e.message);
                })
                .finally(() => {
                    disabled = false;
                });
        });
    }
</script>

<svelte:head>
    <title>Admin → Cards → Integrity Check &bull; SIC</title>
</svelte:head>

<div class="content">
    <div class="panel">
        <div class="panel-inner">
            <Button label="Start Check" accent on:click={start} {disabled}>Start Check</Button>
            {#if skillListPromise !== null}
                {#await skillListPromise}
                    Searching for Skills with Annotations...
                {:then skillList}
                    <table class="w-full">
                        {#each skillList as skill (skill.skillId)}
                            <tr>
                                <td class="font-bold pr-2 align-top leading-7">
                                    {#if skill.cardNo}
                                        <a href="/card/{skill.cardNo}">#{skill.skillId}</a>
                                    {:else}
                                        #{skill.skillId}
                                    {/if}
                                </td>
                                <td class="flex flex-col gap-y-2 mb-2">
                                    {#each skill.annotations as annotation, i (i)}
                                        <CheckElement {annotation} result={skill.results[i]} />
                                    {/each}
                                </td>
                            </tr>
                        {/each}
                    </table>
                {:catch e}
                    {e}
                {/await}
            {/if}
        </div>
    </div>
</div>
