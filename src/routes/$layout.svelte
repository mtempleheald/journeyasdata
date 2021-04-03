<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
        // console.log('Loading questionset'); // proves that this isn't loaded on each subsequent page request
        const url = '/questionsets/questionset.json';
        let qs;
        await fetch(url)
                .then(resp => resp.json())
                .then(data => qs = data);
        questionSet.set(qs);
        
		return {};
	}
</script>

<script>
    import Wizard from '$lib/display/Wizard.svelte';
    import { questionSet } from '$lib/stores/questionset';
</script>

<svelte:head>
	<title>Question Set Demo</title>
</svelte:head>


<header>
    <img src="https://fakeimg.pl/250x100/?text=Logo" alt="logo">
    <h1>Question Set demo</h1>    
</header>
<Wizard/>

<slot></slot>


<style>
    /* alternative approach at https://github.com/josefaidt/svelte-themer */
    :root {
        --question-colour-bg: lightblue;
        --question-colour-bg-highlight: khaki;
        --question-colour-text: black;
        --question-colour-text-highlight: black;
        --border-style: solid;
        --address-colour-bg: lightblue;
        --address-colour-bg-highlight: lightblue;
        --address-colour-text: black;
        --address-colour-text-highlight: black;
    }
    :global(body) {
        margin: 0;
    }
    header {
        border-bottom: 1px solid black;
        display: flex;
        flex-direction: row;
    }
    img {
        height: 100px;
        width: 250px;
    }
    h1 {
        height: 100px;
        line-height: 100px;
        padding: 0 1rem;
        margin: 0;
        width: calc(100vw - 250px);
    }
</style>