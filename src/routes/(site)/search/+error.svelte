<script lang="ts">
	import SearchTopPage from "./SearchTopPage.svelte";
	import { page } from "$app/stores";
</script>

<div class="panel error mb-4">
	<div class="panel-inner">
		<b>Error in Search Query:</b>
		{$page.error?.message}
	</div>
</div>

<SearchTopPage />
