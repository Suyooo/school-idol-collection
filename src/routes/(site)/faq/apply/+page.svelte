<script lang="ts">
    import Button from "$lib/style/Button.svelte";

    let faqName: string = "", disabled: boolean = false;

    function submit() {
        if (disabled) return;
        disabled = true;

        fetch(`/faq/apply`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({faqName})
        })
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error(res.status + " " + res.statusText);
                }
                alert(`Applied FAQ to database links.`);
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
    <title>FAQ → Apply &bull; SIC</title>
</svelte:head>

<div class="content">
    <div class="panel">
        <div class="panel-inner">
            Enter name of the FAQ page: <input bind:value={faqName}>
            <div class="flex items-center justify-end w-full">
                <Button accent on:click={submit} {disabled}>Apply</Button>
            </div>
        </div>
    </div>
</div>