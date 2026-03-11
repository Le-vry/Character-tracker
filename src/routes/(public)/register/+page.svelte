<script lang="ts">
	export let form;
</script>

<main>
	<section class="card">
		<h1>Register</h1>

		{#if form?.error}
			<div class="error">{form.error}</div>
		{/if}

		<form method="POST" action="?/register">
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
	</section>
</main>


<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.card {
		width: 100%;
		max-width: 360px;
		padding: 1rem;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		background: #fff;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	h1 {
		margin-top: 0;
		font-size: 1.4rem;
	}

	button {
		padding: 0.45rem 0.7rem;
		border: 1px solid #d1d5db;
		background: #fff;
		border-radius: 0.35rem;
		cursor: pointer;
	}

	.error {
		color: #b91c1c;
		margin: 0;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.35rem;
	}

	input {
		width: 100%;
		padding: 0.45rem 0.6rem;
		border: 1px solid #d1d5db;
		border-radius: 0.35rem;
	}

	p {
		margin: 0;
	}
</style>
