<script lang="ts">
    import type { LoginResponseType } from '$lib/types/auth'
    let processing: Promise<LoginResponseType>
    let user: string
    let pass: string

    function login() {
        processing = fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ user: user, pass: pass }),
            headers: { 'content-type': 'application/json' },
        })
        .then((resp) => resp.json())
        .finally(() => setTimeout(() => (processing = null), 5000))
    }

</script>

<header>
    <h1>Login</h1>
</header>
<form on:submit|preventDefault={login} method="post">
    <div class="row">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" bind:value="{user}" />
    </div>
    <div class="row">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" bind:value="{pass}" />
    </div>
    <div class="row">
    {#if processing}
        {#await processing}
            <button type="submit" disabled>Authenticating...</button>
        {:then resp}
            {#if resp.result == "success"}
                <button type="submit" class="success" disabled>Logged in successfully</button>
            {:else}
                <button type="submit" class="fail">Try logging in again</button>
            {/if}
        {/await}
    {:else}
        <button type="submit">Login</button>
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
    label, input {
        flex-shrink: 100%;
        min-width: 50%;
        margin-bottom: 0.5rem;
    }
    button {
        width: 65%;
        margin: auto;
    }
    button.fail {
        background-color: salmon;
    }
    button.success {
        background-color: palegreen;

    }
</style>