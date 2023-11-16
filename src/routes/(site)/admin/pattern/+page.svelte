<script>
	import LinkList from "./LinkList.svelte";
	import PageHeader from "$lib/style/PageHeader.svelte";
</script>

<svelte:head>
	<title>Patterns Admin Panel &bull; SIC</title>
</svelte:head>

<PageHeader breadcrumbs={[["/admin", "Admin Panel"]]}>Patterns</PageHeader>
<div class="panel">
	<div class="panel-inner">
		<LinkList />
	</div>
</div>
