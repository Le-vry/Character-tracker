<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<main>
	<h1>Access Denied</h1>
	<p>401 - Unauthorized</p>
	<p>You need to be logged in to access this page.</p>
	<div>
		<a href="/login">Go to Login</a>
		<a href="/">Go Home</a>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	a {
		text-decoration: none;
		color: #545454;
		display: inline-block;
	}

	div {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}
</style>
