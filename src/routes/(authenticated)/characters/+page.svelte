<script lang="ts">
	export let data: any;

	function calculateWinrate(character: { gamesWon: number; gamesPlayed: number }) {
		if (character.gamesPlayed === 0) {
			return '0';
		}

		const winrate = (character.gamesWon / character.gamesPlayed) * 100;
		return winrate.toFixed(1).replace('.0', '');
	}
</script>

<div class="container">
	<h1>Characters</h1>
	<p class="subtitle">Welcome, {data.user?.username}</p>

	<div class="characters-grid">
		{#each data.characters as character (character.id)}
			<div class="character-card">
				<div class="header-row">
					<h2>{character.user.username}</h2>
					{#if character.userId === data.user?.id}
						<span class="badge">You</span>
					{/if}
				</div>
				<div class="stats">
					<p><strong>Wins:</strong> {character.gamesWon}</p>
					<p><strong>Games Played:</strong> {character.gamesPlayed}</p>
					<p><strong>Losses:</strong> {character.gamesPlayed - character.gamesWon}</p>
					<p><strong>Winrate:</strong> {calculateWinrate(character)}%</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h1 {
		margin: 0;
	}

	.subtitle {
		margin: 0;
		color: #4b5563;
	}

	.characters-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1rem;
	}

	.character-card {
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		padding: 1rem;
		background: #fff;
	}

	.character-card h2 {
		margin: 0;
	}

	.header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.6rem;
	}

	.badge {
		background: #f3f4f6;
		border: 1px solid #d1d5db;
		color: #374151;
		padding: 0.25rem 0.5rem;
		border-radius: 0.35rem;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.stats {
		margin-top: 0.75rem;
		display: grid;
		gap: 0.35rem;
	}

	.stats p {
		margin: 0;
	}
</style>