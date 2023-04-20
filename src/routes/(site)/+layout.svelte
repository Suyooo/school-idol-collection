<script>
    import "../../app.css";
</script>

<div class="header">
    <div class="cont">
        <div class="logo">SIC</div>
        <a href="/list">Card List</a>
        <a href="/search">Search</a>
        <a href="/labels">Label Printer</a>
    </div>
</div>

<div class="cont">
    <slot />
</div>

<style lang="postcss">
    .header {
        @apply w-full bg-primary-800;

        & .cont {
            @apply flex items-center gap-x-4 text-accent-400 font-bold tracking-widest uppercase;

            & .logo {
                @apply text-3xl;
            }

            & a {
                @apply px-6 py-2 bg-primary-700 rounded-full no-underline;
            }
        }
    }
</style>