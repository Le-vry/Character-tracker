<script>
	// @ts-ignore
	export let data;

	// @ts-ignore
	function calculateWinrate(character) {
		let winrate = character.gamesWon / character.gamesPlayed * 100;
		return winrate.toFixed(1).replace(".0", '');
	}
</script>

<div class="container">
	<header>
		<h1>Character Tracker</h1>
		<div class="user-controls">
			<span>Welcome, {data.user.username}</span>
			<form action="/logout" method="POST">
				<button>Logout</button>
			</form>
		</div>
	</header>
	
	<div class="characters-grid">
		{#each data.characters as character (character.id)}
			<div class="character-card">
				<div class="header-row">
					<h2>{character.user.username}</h2>
					{#if character.userId === data.user.id}
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
		padding: 2rem;
	}

	h1 {
		margin: 0;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.user-controls {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.characters-grid {
		display: grid;
		width: 50%;
		justify-self: center;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.character-card {
		border: 1px solid #ccc;
		border-radius: 8px;
		padding: 1.5rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.character-card h2 {
		margin-top: 0;
		color: #333;
	}

	.header-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.badge {
		background-color: #4CAF50;
		color: white;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.8rem;
		font-weight: bold;
	}



	.stats {
		margin-top: 1rem;
	}

	.stats p {
		margin: 0.5rem 0;
		color: #555;
	}
</style>