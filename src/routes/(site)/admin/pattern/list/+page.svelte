<script lang="ts">
    import TriggerEnum from "$lib/enums/trigger";
    import TriggerComponent from "$lib/format/TriggerComponent.svelte";
    import type TranslationPattern from "$models/translation/pattern.js";
    import type {PageData} from './$types.js';

    export let data: PageData;
    let list: TranslationPattern[];
    $: list = data.list;
</script>

<svelte:head>
    <title>Admin → Pattern → List &bull; SIC</title>
</svelte:head>

<div class="content">
    <div class="panel">
        <div class="panel-inner">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Triggers</th>
                    <th>Regex</th>
                    <th>Template</th>
                    <th>Apply</th>
                </tr>
                </thead>
                <tbody>
                {#if list.length === 0}
                    <tr>
                        <td colspan="3">No Translation Patterns</td>
                    </tr>
                {/if}
                {#each list as pattern}
                    <tr>
                        <td>{pattern.id}</td>
                        <td>
                            {#each TriggerEnum.bitmaskToTriggers(pattern.triggers) as trigger}
                                <TriggerComponent {trigger}/>
                            {/each}
                        </td>
                        <td>{pattern.regex}</td>
                        <td>{pattern.template}</td>
                        <td><a href="/admin/pattern/apply/{pattern.id}">Apply</a></td>
                    </tr>
                {/each}
                </tbody>
            </table>
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