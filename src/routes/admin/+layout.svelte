<script>
	import { session } from '$app/stores';
</script>

<header>
	<h1>Journey Management</h1>
	{#if $session.user}
		<p>Logged in as {$session?.user?.username}</p>
		<form method="post" action="/api/auth/logout">
			<button type="submit">Logout</button>
		</form>
	{/if}
</header>

<slot />

<style>
	:global(body) {
		margin: 0;
	}
	header {
		width: 100%;
		background-color: lightgrey;
		margin: 0;
		padding: 0;
		display: flex;
	}
	header > * {
		flex-grow: 1;
	}
	h1,
	p {
		margin: 0;
		padding: 1rem;
	}
	button {
		margin: 1rem;
	}
</style>
