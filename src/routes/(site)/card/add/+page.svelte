<script lang="ts">
    import Button from "$lib/style/Button.svelte";

    let cardNo: string = "", disabled: boolean = false;

    function submitCard() {
        if (disabled) return;
        disabled = true;

        fetch(`/card/add`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({cardNo})
        })
            .then(async (res) => {
                if (res.status !== 200) {
                    throw new Error(res.status + " " + res.statusText + " (" + (await res.json()).message + ")");
                }
                alert(`Downloaded card.`);
            })
            .catch((e) => {
                alert("Failed to download: " + e.message);
            })
            .finally(() => {
                disabled = false;
            });
    }
</script>

<svelte:head>
    <title>Card → Add &bull; SIC</title>
</svelte:head>

<div class="content">
    <div class="panel">
        <div class="panel-inner">
            Download Single Card: <input bind:value={cardNo}>
            <div class="flex items-center justify-end w-full">
                <Button accent on:click={submitCard} {disabled}>Download</Button>
            </div>
        </div>
    </div>
</div>