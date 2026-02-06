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
		<div>
			<p>Welcome back, {data.user.username}!</p>
			<a href="/characters">View Characters</a>
			<form method="POST" action="/logout">
				<button type="submit">Logout</button>
			</form>
		</div>
	{:else}
		<div>
			<p>Get started by logging in or registering</p>
			<a href="/login">Login</a>
			<a href="/register">Register</a>
		</div>
	{/if}
</main>

<style>
	main {
		width: 100%;
		height: calc(100vh - 4vh);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		overflow: hidden;
	}

	h1 {
		font-size: 2rem;
		margin: 0;
		flex-shrink: 0;
	}

	p {
		margin: 0 0 1rem 0;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 300px;
	}

	a {
		padding: 0.5rem 1rem;
		text-decoration: none;
		color: #545454;
		border: 1px solid #545454;
		display: inline-block;
		width: fit-content;
	}

	a:hover {
		background: #545454;
		color: white;
	}

	button {
		padding: 0.5rem 1rem;
		background: #545454;
		color: white;
		border: none;
		cursor: pointer;
		width: fit-content;
	}

	button:hover {
		background: #333;
	}

	form {
		display: flex;
		gap: 1rem;
	}
</style>

