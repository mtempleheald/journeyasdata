<script lang="ts">
import { goto } from "$app/navigation";


    let processing: Promise<any>
    let user: string
    let pass: string
    let label: string = 'Login'
    let disabled: boolean = false
    let authenticated: boolean

    function login() {
        processing = fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ user: user, pass: pass }),
            headers: { 'content-type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(data => {
            authenticated = (data.result == 'success')
            label = authenticated ? 'Logged in, redirecting...' : 'Login failed, try again in 5 seconds'
            if (authenticated) goto('/admin')
        })
        .finally(() => setTimeout(() => {
            processing = null
            label = 'Login'            
        }, 5000))
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
            <button type="submit" {disabled}>{label}</button>
        {/await}
    {:else}
            <button type="submit" {disabled}>{label}</button>
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
</style>