<script lang="ts">
    import Button from "$lib/style/Button.svelte";
    import {isCardSkillShortInfo} from "$lib/translation/skills.js";
    import type {ShortSkillInfo} from "$lib/translation/skills.js";
    import type {PageData} from './$types.js';

    export let data: PageData;
    let id: number, applicable: ShortSkillInfo[], checkboxes: HTMLInputElement[] = [], disabled: boolean = false;
    $: id = data.id;
    $: applicable = data.applicable;

    function toggleAll(e: Event) {
        checkboxes.forEach(c => c.checked = ((<HTMLInputElement>e.target).checked));
    }

    function submit() {
        if (disabled) return;
        disabled = true;
        const applyTo = checkboxes.map((c, i) => c.checked ? applicable[i].skillId : null).filter(v => v !== null);
        if (applyTo.length === 0) {
            disabled = false;
            return;
        }

        fetch(`/pattern/apply/${id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(applyTo)
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
    <title>Pattern → Apply &bull; SIC</title>
</svelte:head>

<div class="content">
    <div class="panel">
        <div class="panel-inner">
            <table>
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
                        {#if isCardSkillShortInfo(a)}
                            <th><a href="/card/{a.cardNo}/">{a.cardNo}</a></th>
                        {:else}
                            <th><a href="/card/{a.firstCardNo}/">Group #{a.groupId}</a></th>
                        {/if}
                        <td>{a.skillJpn}</td>
                        <td>{a.skillEng}</td>
                        <td><input type="checkbox" data-skill="{a.skillId}" bind:this={checkboxes[i]}></td>
                    </tr>
                {/each}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="whitespace-nowrap">
                        <input id="all" type="checkbox" on:change={toggleAll}>
                        <label for="all">All</label>
                    </td>
                </tr>
                </tbody>
            </table>

            <div class="flex items-center justify-between mt-2 w-full">
                <Button label="Edit" accent href="/pattern/edit/{id}/{applicable[0].skillId}/">Edit</Button>
                <Button label="Apply" accent on:click={submit} {disabled}>Apply</Button>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    td {
        @apply px-4 py-4;

        &:not(:first-child) {
            @apply border-l border-primary-300;
        }
    }
</style>