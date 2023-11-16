<script>
	import PageHeader from "$lib/style/PageHeader.svelte";
	import LinkList from "./LinkList.svelte";
</script>

<svelte:head>
	<title>Cards Admin Panel &bull; SIC</title>
</svelte:head>

<PageHeader breadcrumbs={[["/admin", "Admin Panel"]]}>Cards</PageHeader>
<div class="panel">
	<div class="panel-inner">
		<LinkList />
	</div>
</div>
