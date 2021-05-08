<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
        console.log ('load()', session);
		return {
			props: {
				authenticated: !!session?.authenticatedUser
			}
		};
	}
</script>

<script lang="ts">    
    let authenticated: boolean;
</script>

{#if authenticated}
<header>
    <h1>Congratulations on your privileged access</h1>
</header>
{:else}
<header>
    <h1>Unauthorised</h1>
</header>
<a href="/admin/login">Log in here</a>
{/if}
