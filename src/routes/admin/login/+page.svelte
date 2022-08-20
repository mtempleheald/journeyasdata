<script lang="ts">
	let errors: string;
	let disabled = false;
</script>

<header>
	<h1>Login</h1>
</header>
<form method="post" action="/api/auth/login">
	<div class="row">
		<label for="username">Username:</label>
		<input type="text" id="username" name="username" />
	</div>
	<div class="row">
		<label for="password">Password:</label>
		<input type="password" id="password" name="password" />
	</div>
	<div class="row">
		<button type="submit" {disabled}>Login</button>
	</div>
	<div class="row">
		{#if errors}
			<ul class="error-messages">
				{#each Object.keys(errors) as key}
					{#each errors[key] as e}
						<li>{key} {e}</li>
					{/each}
				{/each}
			</ul>
		{/if}
	</div>
</form>

<style>
	header {
		max-width: 400px;
		margin: auto;
	}
	form {
		max-width: 400px;
		margin: auto;
	}
	.row {
		width: 100%;
		display: flex;
	}
	label,
	input {
		flex-shrink: 100%;
		min-width: 30%;
		margin-bottom: 0.5rem;
	}
	button {
		width: 65%;
		margin: auto;
	}
	ul {
		list-style-type: square;
	}
</style>
