<script lang="ts">
    import "../../app.css";
    import {goto} from "$app/navigation";
    import Search from "$lib/style/icons/Search.svelte";
    import Spinner from "$lib/style/icons/Spinner.svelte";
    import {couldBeEntryCardNo, entryCardNoToCanonical} from "$lib/utils/entry.js";
    import {stringIsInteger} from "$lib/utils/string.js";

    let quicksearch: string = "", searching: boolean = false;

    function doQuicksearch() {
        if (quicksearch === "" || searching) return;
        searching = true;
        if (couldBeEntryCardNo(quicksearch, false)) {
            // Card number - go directly to page
            goto(`/card/${entryCardNoToCanonical(quicksearch)}`).finally(() => searching = false);
        } else if (quicksearch.length <= 4 && stringIsInteger(quicksearch)) {
            // Only digits - probably a card ID, search for that
            fetch(`/json/search/id:${quicksearch}`).then(async (res) => {
                const cards = (await res.json()).cards;
                if (cards.length > 0) {
                    goto(`/card/${cards[0].cardNo}`).finally(() => searching = false);
                } else {
                    // No cards with that ID, go to search page to show "no results" text
                    goto(`/search/id:${quicksearch}`).finally(() => searching = false);
                }
            });
        } else {
            // Name search
            goto(`/search/name:${quicksearch}`).finally(() => searching = false);
        }
    }
</script>

<div class="header">
    <div class="cont">
        <div class="buttons">
            <div class="logo">SIC</div>
            <a href="/list">Card List</a>
            <a href="/search">Search</a>
            <a href="/labels">Label Printer</a>
        </div>
        <form class="quicksearch" on:submit|preventDefault={doQuicksearch}>
            <input placeholder="Quick Search (Card No., ID or Name)" bind:value={quicksearch}
                aria-label="Quick Search. Enter a card number, ID or name">
            <button class:text-primary-400={quicksearch === ""} disabled={quicksearch === "" || searching}
                    aria-label="Submit Quick Search">
                {#if searching}
                    <Spinner/>
                {:else}
                    <Search/>
                {/if}
            </button>
        </form>
    </div>
</div>

<div class="cont">
    <slot />
</div>

<style lang="postcss">
    .header {
        @apply w-full bg-primary-700 ;

        & .cont {
            @apply flex items-center justify-between;

            & .buttons {
                @apply flex items-center gap-x-4 text-accent-400 font-bold tracking-widest uppercase;

                & .logo {
                    @apply text-3xl;
                }

                & a {
                    @apply px-6 py-2 bg-primary-500 rounded-full no-underline;
                }
            }

            & .quicksearch {
                @apply flex-grow max-w-sm ml-16 relative flex items-center;

                & input {
                    @apply w-full pr-9;
                }

                & button {
                    @apply absolute right-2;
                }
            }
        }
    }
</style>