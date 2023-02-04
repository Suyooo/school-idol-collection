<script lang="ts">
    import type Set from "$models/set/set.js";

    export let set: Set;
</script>

<a href="/set/{set.id}" class="grid-item">
    <div class="imgcont">
        <img src="/images/cards/{set.id}/set.jpg" alt="{set.id}">
    </div>
    <div class="namecont">
        <span>⏵</span><span>{set.eng}</span>
    </div>
</a>

<style lang="postcss">
    .grid-item > .imgcont {
        @apply bg-white;

        & > img {
            @apply max-w-full;
        }
    }
</style>