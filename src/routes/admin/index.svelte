<script lang="ts">
    let submit: Promise<{}>
    let user: string
    let pass: string

    function login() {
        submit = fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ user: user, pass: pass }),
        headers: { 'content-type': 'application/json' },
    })
        .then((resp) => resp.json())
        .finally(() => setTimeout(() => (submit = null), 5000))
    }

</script>


<h2>This page will be locked down to authenticated users</h2>

<form on:submit|preventDefault={login} method="post">
    <label>
        Username:
        <input type="text" name="username" bind:value="{user}" />
    </label>
    <br/>
    <label>
        Password:
        <input type="password" name="password" bind:value="{pass}" />
    </label>
    <br/>
    {#if submit}
        {#await submit}
        <p>Authenticating...</p>
        {:then resp}
        <pre>RESPONSE: {JSON.stringify(resp, null, 2)}</pre>
        {/await}
    {:else}
        <button type="submit">Login</button>
    {/if}
</form>