<script lang="ts">
	export let form;
</script>

<main>
	<h1>Register</h1>

	{#if form?.error}
		<div class="error">{form.error}</div>
	{/if}

	<form method="POST" action="/login?/register">
		<div class="form-group">
			<label for="username">Username</label>
			<input id="username" name="username" type="text" required />
		</div>
		<div class="form-group">
			<label for="email">Email</label>
			<input id="email" name="email" type="email" />
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input id="password" name="password" type="password" required />
		</div>
		<button type="submit">Register</button>

		<p>Already have an account? <a href="/login">Login</a></p>
	</form>
</main>


<style>
	main {
		width: 100vw;
		height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: top;
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
