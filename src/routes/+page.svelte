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
	<div class="hero">
		<div class="hero-content">
			<h1>Welcome to Character Tracker</h1>
			<p>Manage and organize your creative characters all in one place</p>
			
			{#if data.user}
				<div class="auth-section">
					<p>Welcome back, <strong>{data.user.username}</strong>!</p>
					<div class="button-group">
						<a href="/characters" class="btn btn-primary">View Your Characters</a>
						<a href="/logout" class="btn btn-secondary">Logout</a>
					</div>
				</div>
			{:else}
				<div class="auth-section">
					<p>Get started by creating an account or logging in</p>
					<div class="button-group">
						<a href="/login" class="btn btn-primary">Login</a>
						<a href="/register" class="btn btn-secondary">Register</a>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<section class="features">
		<h2>Features</h2>
		<div class="features-grid">
			<div class="feature-card">
				<h3>📝 Create Characters</h3>
				<p>Build detailed character profiles with all the information you need</p>
			</div>
			<div class="feature-card">
				<h3>🎨 Customize</h3>
				<p>Organize your characters with custom attributes and descriptions</p>
			</div>
			<div class="feature-card">
				<h3>📚 Organize</h3>
				<p>Keep all your creative work in one organized, searchable place</p>
			</div>
		</div>
	</section>
</main>

<style>
	main {
		width: 100%;
		min-height: calc(100vh - 4vh);
		display: flex;
		flex-direction: column;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
	}

	.hero {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		text-align: center;
	}

	.hero-content {
		max-width: 600px;
	}

	h1 {
		font-size: 3rem;
		margin: 0 0 1rem 0;
		color: #2c3e50;
		font-weight: 700;
	}

	.hero > div > p {
		font-size: 1.25rem;
		color: #555;
		margin: 0 0 2rem 0;
	}

	.auth-section {
		margin-top: 2rem;
	}

	.auth-section p {
		font-size: 1.1rem;
		color: #666;
		margin-bottom: 1.5rem;
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
		background: white;
		color: #667eea;
		border: 2px solid #667eea;
	}

	.btn-secondary:hover {
		background: #667eea;
		color: white;
		transform: translateY(-2px);
	}

	.features {
		padding: 4rem 2rem;
		background: white;
	}

	.features h2 {
		text-align: center;
		font-size: 2rem;
		color: #2c3e50;
		margin-bottom: 3rem;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.feature-card {
		padding: 2rem;
		border-radius: 0.75rem;
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		transition: all 0.3s ease;
	}

	.feature-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		border-color: #667eea;
	}

	.feature-card h3 {
		color: #2c3e50;
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
	}

	.feature-card p {
		color: #666;
		margin: 0;
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 2rem;
		}

		.hero > div > p {
			font-size: 1rem;
		}

		.button-group {
			flex-direction: column;
		}

		.btn {
			width: 100%;
		}

		.features-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

