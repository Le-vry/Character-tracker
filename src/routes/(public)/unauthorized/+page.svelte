<main>
	<section class="card">
		<h1>Access Denied</h1>
		<p>401 - Unauthorized</p>
		<p>You need to be logged in to access this page.</p>
		<div>
			<a href="/login">Go to Login</a>
			<a href="/">Go Home</a>
		</div>
	</section>
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: center;
	}

	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.5rem;
		width: 100%;
		max-width: 420px;
		padding: 1rem;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		background: #fff;
	}

	a {
		color: inherit;
		text-decoration: none;
		padding: 0.4rem 0.65rem;
		border: 1px solid #d1d5db;
		border-radius: 0.35rem;
		display: inline-block;
	}

	div {
		display: flex;
		gap: 0.6rem;
		margin-top: 0.35rem;
	}

	h1,
	p {
		margin: 0;
	}
</style>
