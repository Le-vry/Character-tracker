<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<main>
	<div class="error-container">
		<div class="error-content">
			<h1>Access Denied</h1>
			<p class="error-code">401 - Unauthorized</p>
			<p class="error-message">
				You need to be logged in to access this page.
			</p>
			<div class="button-group">
				<a href="/login" class="btn btn-primary">Go to Login</a>
				<a href="/" class="btn btn-secondary">Go Home</a>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		width: 100%;
		height: calc(100vh - 4vh);
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
	}

	.error-container {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 2rem;
	}

	.error-content {
		text-align: center;
		max-width: 500px;
		background: white;
		padding: 3rem 2rem;
		border-radius: 1rem;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
	}

	h1 {
		font-size: 2.5rem;
		color: #e74c3c;
		margin: 0 0 0.5rem 0;
		font-weight: 700;
	}

	.error-code {
		font-size: 1rem;
		color: #95a5a6;
		margin: 0 0 1.5rem 0;
		font-family: monospace;
		font-weight: 600;
	}

	.error-message {
		font-size: 1.1rem;
		color: #555;
		margin: 0 0 2rem 0;
		line-height: 1.6;
	}

	.button-group {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn {
		padding: 0.75rem 2rem;
		border-radius: 0.5rem;
		text-decoration: none;
		font-weight: 600;
		font-size: 1rem;
		transition: all 0.3s ease;
		display: inline-block;
	}

	.btn-primary {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
	}

	.btn-secondary {
		background: #ecf0f1;
		color: #2c3e50;
		border: 2px solid #bdc3c7;
	}

	.btn-secondary:hover {
		background: #2c3e50;
		color: white;
		border-color: #2c3e50;
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 1.75rem;
		}

		.error-content {
			padding: 2rem 1.5rem;
		}

		.button-group {
			flex-direction: column;
		}

		.btn {
			width: 100%;
		}
	}
</style>
