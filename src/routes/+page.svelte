<script lang="ts">
	interface PageData {
		user: {
			id: string;
			username: string;
		} | null;
	}

	export let data: PageData;
</script>

<main>
	<h1>Character Tracker</h1>

	{#if data.user}
		<div class="card">
			<p>Welcome back, {data.user.username}!</p>
			<a href="/characters">View Characters</a>
			<form method="POST" action="/logout">
				<button type="submit">Logout</button>
			</form>
		</div>
	{:else}
		<div class="card">
			<p>Get started by logging in or registering</p>
			<div class="row-actions">
				<a href="/login">Login</a>
				<a href="/register">Register</a>
            </div>
		</div>
	{/if}
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
	}

	h1 {
		font-size: 1.8rem;
		margin: 0;
	}

	p {
		margin: 0;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
		max-width: 360px;
		padding: 1rem;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		background: #fff;
	}

	.row-actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	a,
	button {
		font: inherit;
	}

	a {
		text-decoration: none;
		color: inherit;
		padding: 0.45rem 0.7rem;
		border: 1px solid #d1d5db;
		border-radius: 0.35rem;
		display: inline-block;
		width: fit-content;
	}

	form {
		display: flex;
	}

	button {
		padding: 0.45rem 0.7rem;
		border: 1px solid #d1d5db;
		background: #fff;
		border-radius: 0.35rem;
		cursor: pointer;
	}
</style>

