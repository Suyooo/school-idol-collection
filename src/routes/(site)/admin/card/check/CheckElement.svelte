<script lang="ts" context="module">
    import type { Writable } from "svelte/store";
    import type { CheckAnnotation, CheckResult } from "./+server.js";
    import type { CheckResultWithUi } from "./+page.svelte";
</script>

<script lang="ts">
    import Collapse from "$lib/style/icons/Collapse.svelte";
    import Expand from "$lib/style/icons/Expand.svelte";

    export let annotation: CheckAnnotation;
    export let result: Writable<Promise<CheckResultWithUi> | null>;

    let failed: boolean = false;
    $: $result?.then(
        (res) => (failed = res.onlyInJpn.length > 0 || res.onlyInEng.length > 0 || res.common.length === 0)
    );
</script>

<div class="w-full bg-primary-800 px-2 py-1 rounded" class:!bg-red-700={failed}>
    <div class="flex">
        <div class="flex-grow">
            {annotation.annotationJpn} / {annotation.annotationEng}
        </div>
        {#if $result === null}
            (waiting)
        {:else}
            {#await $result}
                (checking...)
            {:then res}
                <button class="flex" on:click={() => (res.expand = !res.expand)}>
                    {#if failed}
                        ❕
                    {:else}
                        ✅
                    {/if}
                    {#if res.expand}
                        <Collapse />
                    {:else}
                        <Expand />
                    {/if}
                </button>
            {:catch e}
                (error: e)
            {/await}
        {/if}
    </div>

    {#await $result then res}
        {#if res && res.expand}
            <div>
                <div class="font-bold">
                    {#if res.onlyInJpn.length === 0 && res.onlyInEng.length === 0}
                        {#if res.common.length === 0}
                            No results for either annotation
                        {/if}
                    {:else}
                        Differences in annotations
                    {/if}
                </div>
                <div class="text-sm">
                    {#if res.common.length > 0}
                        <div><b>Common:</b> {res.common.join(", ")}</div>
                    {/if}
                    {#if res.onlyInJpn.length > 0}
                        <div><b>JPN only:</b> {res.onlyInJpn.join(", ")}</div>
                    {/if}
                    {#if res.onlyInEng.length > 0}
                        <div><b>ENG only:</b> {res.onlyInEng.join(", ")}</div>
                    {/if}
                </div>
            </div>
        {/if}
    {/await}
</div>
