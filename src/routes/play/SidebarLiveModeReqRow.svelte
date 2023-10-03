<script context="module" lang="ts">
    import AttributeEnum from "$l/enums/attribute.js";
    import Piece from "$l/format/Piece.svelte";
    import PlusMinusButtons from "./PlusMinusButtons.svelte";
</script>

<script lang="ts">
    export let requirement: { base: number; extra: number };
    export let totalPieces: [number, number, number, number];
    export let countedPieces: [boolean, boolean, boolean, boolean];
    export let attr: AttributeEnum | "none";
    export let isAllAltRow: boolean = false;
    export let canCheck: boolean = false;
    export let updateExtraFunc: ((d: number) => void) | undefined = undefined;

    let cumulativePieceCounts: [number, number, number, number], totalReq: number, left: number;
    $: cumulativePieceCounts = totalPieces.map((_, i, arr) =>
        arr.reduce((a, x, ii) => (countedPieces[ii] && ii <= i ? a + x : a), 0)
    ) as [number, number, number, number];
    $: totalReq = requirement.base + requirement.extra;
    $: left = totalReq - cumulativePieceCounts[3];
</script>

<div class="reqrow {attr === 'none' ? 'text-white' : attr.toCssClassName()}">
    {#if attr !== "none"}
        <div class="icon">
            {#if !isAllAltRow}
                <Piece {attr} />
            {/if}
        </div>
    {/if}
    <div class="buttons">
        {#if !isAllAltRow && updateExtraFunc}
            <b class="req">
                {requirement.base}
                {#if requirement.extra < 0}
                    - {-requirement.extra}
                {/if}
            </b>
            <PlusMinusButtons value={requirement.extra} limit={requirement.base} update={updateExtraFunc} swapped />
        {/if}
    </div>
    <div class="pieces">
        {#each { length: totalReq } as _, i}
            {#if i < cumulativePieceCounts[0]}
                <Piece attr={AttributeEnum.ALL} />
            {:else if i < cumulativePieceCounts[1]}
                <Piece attr={AttributeEnum.SMILE} />
            {:else if i < cumulativePieceCounts[2]}
                <Piece attr={AttributeEnum.PURE} />
            {:else if i < cumulativePieceCounts[3]}
                <Piece attr={AttributeEnum.COOL} />
            {:else}
                <span class="empty-piece" />
            {/if}
        {/each}
        <div class="opacity-40">
            {#each { length: -left } as _, i}
                {#if i + totalReq < cumulativePieceCounts[0]}
                    <Piece attr={AttributeEnum.ALL} />
                {:else if i + totalReq < cumulativePieceCounts[1]}
                    <Piece attr={AttributeEnum.SMILE} />
                {:else if i + totalReq < cumulativePieceCounts[2]}
                    <Piece attr={AttributeEnum.PURE} />
                {:else if i + totalReq < cumulativePieceCounts[3]}
                    <Piece attr={AttributeEnum.COOL} />
                {/if}
            {/each}
        </div>
    </div>
    <div class="status">
        {#if left > 0}
            {#if isAllAltRow}
                <div class="small">or</div>
                <div class="big">{left}</div>
                <div class="small"><Piece attr={AttributeEnum.ALL} /></div>
            {:else}
                <div class="big">{left}</div>
                <div class="small">left</div>
            {/if}
        {/if}
        {#if left <= 0}
            <div class="small"><b>{-left}</b> {left === 0 ? "left" : "over"}</div>
        {/if}
        <div class="check">
            {#if canCheck && left <= 0}✔{/if}
        </div>
    </div>
</div>

<style lang="postcss">
    .reqrow {
        @apply flex items-center;

        &.all {
            @apply text-attribute-all;
        }

        &.smile {
            @apply text-attribute-smile;
        }

        &.pure {
            @apply text-attribute-pure;
        }

        &.cool {
            @apply text-attribute-cool;
        }

        & :global(.skill-icon) {
            @apply w-4 h-4 bg-center;
        }
    }
    .icon {
        @apply w-4 h-4;
    }
    .buttons {
        @apply w-12 mx-1 flex items-center text-sm gap-x-1;
        & .req {
            @apply flex-grow text-center;
        }
    }
    .pieces {
        @apply flex-grow flex flex-wrap;

        & :global(span) {
            @apply flex-shrink-0 !h-6 !w-6 -mr-2;
        }

        & .empty-piece {
            @apply rounded-full bg-primary-500 border border-white;
        }
    }
    .status {
        @apply ml-2 w-14 font-bold flex items-center justify-center;

        & .big {
            @apply mr-1 text-lg leading-6;

            &:not(:first-child) {
                @apply ml-1;
            }
        }

        & .small {
            @apply text-xs leading-4;
        }

        & .check {
            @apply w-4 text-right;
        }
    }
</style>
