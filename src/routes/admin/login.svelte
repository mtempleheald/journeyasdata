<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ session }) {
		// An authorised user will have a user record in session
		// Redirect them to the admin home page
		if (session.user) {
			return {
				status: 302,
				redirect: '/admin'
			};
		}
		return {};
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { post } from '$lib/utils/api';
	import { session } from '$app/stores';

	let user: string;
	let pass: string;
	let errors: any;
	let disabled: boolean = false;

	async function login(event) {
		disabled = true;

		const response = await post('/api/auth/login', { username: user, password: pass });

		// TODO handle network errors
		errors = response.errors;

		if (response.user) {
			$session.user = response.user;
			goto('/admin');
		}
		disabled = false;
	}
</script>

<header>
	<h1>Login</h1>
</header>
<form on:submit|preventDefault={login} method="post">
	<div class="row">
		<label for="username">Username:</label>
		<input type="text" id="username" name="username" bind:value={user} />
	</div>
	<div class="row">
		<label for="password">Password:</label>
		<input type="password" id="password" name="password" bind:value={pass} />
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
