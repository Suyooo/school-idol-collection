<script lang="ts">
	import ThemeLight from "$lib/style/icons/ThemeLight.svelte";
	import ThemeDark from "$lib/style/icons/ThemeDark.svelte";
	export let changeTheme: () => void;
	export let theme: string;
	let extraClasses: string = "";
	export { extraClasses as class };
</script>

<button
	class="flex items-center gap-x-1 text-text-header {extraClasses}"
	on:click={changeTheme}
	title="Toggle Light/Dark Theme"
>
	<ThemeLight />
	<div class="relative box-content h-5 w-10 rounded-full border-2 border-text-header">
		<div
			class="absolute top-0.5 h-4 w-4 rounded-full bg-text-header"
			class:left-0.5={theme !== "dark"}
			class:right-0.5={theme === "dark"}
		></div>
	</div>
	<ThemeDark />
</button>
