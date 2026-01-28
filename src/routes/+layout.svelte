<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<nav>
	<div class="link_container">
		<li class="link"><a href="/">Home</a></li>
		<li class="link"><a href="/characters">Characters</a></li>
	</div>
	
</nav>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global body {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	nav{
		display: flex;
		flex-direction: row;
		height: 4vh;
		width: 100vw;
		margin: 0vw;
		border-bottom: 0.2vh #cecdcd solid;
		box-shadow: 0px 0px 3px 2px #5454548a;
		list-style: none;
	}
	.link_container{
		display: block;
		position: fixed;
		top: 7.5px;
		width: 100vw;
		align-content: center;
	}

	.link{
		float: inline-start;
	}

	.link a{
		padding-left: 1vh;
		padding-right: 1vh;
		padding-bottom: 0.3vh;
		text-decoration: none;
		color: #545454;
		border-right:2px #e3e2e2 solid;
	}

	
	

</style>
