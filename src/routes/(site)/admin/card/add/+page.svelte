<script lang="ts">
	import Button from "$lib/style/Button.svelte";
	import Go from "$lib/style/icons/Go.svelte";

	let cardNo: string = "",
		disabled: boolean = false;

	function submitCard() {
		if (disabled) return;
		disabled = true;

		fetch(`/admin/card/add`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ cardNo }),
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
	<title>Download (Cards Admin Panel) &bull; SIC</title>
</svelte:head>

<h1>
	<div>
		<a class="button" href="/admin">Admin Panel</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
		<a class="button" href="/admin/card">Cards</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
	</div>
	Download
</h1>
<div class="panel">
	<div class="panel-inner">
		<div class="flex items-center gap-4">
			<label for="dl_single" class="font-bold">Download Single Card</label>
			<input id="dl_single" bind:value={cardNo} />
			<Button label="Download Single Card" accent on:click={submitCard} {disabled}>Go</Button>
		</div>
	</div>
</div>
