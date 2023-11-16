<script lang="ts">
	import Button from "$lib/style/Button.svelte";
	import Go from "$lib/style/icons/Go.svelte";

	let faqName: string = "",
		disabled: boolean = false;

	function submit() {
		if (disabled) return;
		disabled = true;

		fetch(`/admin/card/faq`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ faqName }),
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
	<title>FAQ Links (Cards Admin Panel) &bull; SIC</title>
</svelte:head>

<h1>
	<div>
		<a class="button" href="/admin">Admin Panel</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
		<a class="button" href="/admin/card">Cards</a>
		<span class="text-text-header-breadcrumb"><Go /></span>
	</div>
	FAQ Links
</h1>
<div class="panel">
	<div class="panel-inner">
		<div class="flex items-center gap-4">
			<label for="name" class="font-bold">FAQ Page Name</label>
			<input id="name" bind:value={faqName} />
			<Button label="Update FAQ Links on Card Pages" accent on:click={submit} {disabled}>Go</Button>
		</div>
	</div>
</div>
