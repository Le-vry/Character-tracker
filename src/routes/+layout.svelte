<script lang="ts">
	interface LayoutData {
		user: {
			id: string;
			username: string;
		} | null;
	}

	export let data: LayoutData;
</script>

<svelte:head>
	<meta charset="utf-8" />
	<link rel="icon" href="%sveltekit.assets%/favicon.png" />
	<meta name="viewport" content="width=device-width" />
</svelte:head>

<div id="app">
	<header class="site-header">
		<nav class="nav">
			<a href="/" class="brand">Character Tracker</a>
			<div class="links">
				{#if data.user}
					<a href="/characters">Characters</a>
					<a href="/profile">Profile</a>
					<form action="/logout" method="POST">
						<button type="submit">Logout</button>
					</form>
				{:else}
					<a href="/login">Login</a>
					<a href="/register">Register</a>
				{/if}
			</div>
		</nav>
	</header>

	<main class="page-shell">
		<slot />
	</main>
</div>
<!-- Global styles, scripts, etc. -->

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html), :global(body) {
		margin: 0;
		padding: 0;
		min-height: 100%;
		font-family: system-ui, sans-serif;
		color: #1f2937;
		background: #f6f7f9;
	}

	#app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.site-header {
		border-bottom: 1px solid #d1d5db;
		background: #ffffff;
	}

	.nav {
		max-width: 960px;
		margin: 0 auto;
		padding: 0.75rem 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.brand {
		font-weight: 700;
		text-decoration: none;
		color: inherit;
	}

	.links {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.links a {
		text-decoration: none;
		color: inherit;
		padding: 0.35rem 0.6rem;
		border: 1px solid #d1d5db;
		border-radius: 0.35rem;
	}

	.links button {
		padding: 0.35rem 0.6rem;
		border: 1px solid #d1d5db;
		background: #fff;
		border-radius: 0.35rem;
		cursor: pointer;
	}

	.page-shell {
		width: 100%;
		flex: 1;
		display: flex;
	}

</style>
