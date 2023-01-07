<script lang="ts">
    import type Set from "$models/set/set";

    export let set: Set;
</script>

<a href="/set/{set.setId}/" class="grid-item">
    <div class="imgcont">
        <img src="/images/{set.setId}/set.jpg" alt="{set.setId}">
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