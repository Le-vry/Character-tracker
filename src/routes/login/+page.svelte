<script lang="ts">
	export let form;
</script>

<main>
	<h1>Login</h1>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<form method="POST" action="?/login">
		<div class="form-group">
			<label for="username">Username</label>
			<input 
				id="username" 
				name="username" 
				type="text" 
				required />
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input 
				id="password" 
				name="password" 
				type="password" 
				required />
		</div>
		<button type="submit">Login</button>
		<div>Don't have an account? <a href="/register">Register</a></div>
	</form>
</main>

<style>
	main {
		width: 100%;
		height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow-x: hidden;
		overflow-y: hidden;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		width: 20%;
		margin: 0 auto;
	}

	h1 { 
		text-align: center; 
	}

	button { 
		margin-top: 0.2rem;
		width: 60%;
	}

	.error { 
		color: red; 
		text-align: center; 
	}

	.form-group { 
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.2rem;
	}
</style>
