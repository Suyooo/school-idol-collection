<script lang="ts">
    import type Set from "$models/set/set";

    export let set: Set;
</script>

<a href="/set/{set.setId}/" class="grid-item">
    <div class="imgcont">
        <img src="/images/{set.setId}/set.jpg" alt="{set.setId}">
    </div>
    <div class="namecont">
        <span>▶</span><span>{set.eng}</span>
    </div>
</a>

<style lang="postcss">
    .grid-item > .imgcont {
        display: flex;
        justify-content: center;
        flex-basis: 8em;
        width: 100%;
        border-radius: .75em;
        padding: .5em 0;
        margin-bottom: .2em;
        background-color: white;
        overflow: hidden;

        & > img {
            max-width: 100%;
            max-height: 8em;
            object-fit: contain;
        }
    }
</style>