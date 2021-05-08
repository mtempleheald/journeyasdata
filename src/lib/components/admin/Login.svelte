<script lang="ts">
import { goto, invalidate } from "$app/navigation";


    let processing: Promise<any>
    let user: string
    let pass: string
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
            if (authenticated) {
                goto('/admin',{replaceState: true})
            }
        })
        .finally(() => setTimeout(() => {
            processing = null
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
            {#if authenticated}
                <button type="submit" disabled>Login successful, click to continue</button>
            {:else}
                <button type="submit" disabled>Login failed, try again in 5 seconds</button>
            {/if}
        {/await}
    {:else}
            <button type="submit" {disabled}>Login</button>
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