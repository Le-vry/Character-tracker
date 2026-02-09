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
			<div style="flex-direction: row;">
                <a href="/login">Login</a><a href="/register">Register</a>
            </div>
		</div>
	{/if}
</main>

<style>
	main {
		width: 100%;
		height: 80%;
		display: flex;
		flex-direction: column;
        justify-content: top;
        align-items: center;
		overflow-x: hidden;
        overflow-y: hidden;
		background-size: cover;
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
        align-items: center;
		gap: 1rem;
		max-width: 300px;
	}

	form {
		display: flex;
		gap: 1rem;
	}
</style>

