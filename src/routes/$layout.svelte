<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
        // console.log('Loading questionset'); // proves that this isn't loaded on each subsequent page request
        const url = '/questionsets/technicaldemo.json'; // change this to try out different questionsets
        let qs;
        await fetch(url)
                .then(resp => resp.json())
                .then(data => qs = data);
        questionSet.set(qs);
        
		return {};
	}
</script>

<script>
    import { questionSet } from '$lib/stores/questionset';
</script>


<svelte:head>
	<title>{$questionSet.questionset.title}</title>
    <!-- <link rel='stylesheet' href='/themes/dangertent.css'> -->
    <link rel='stylesheet' href='/themes/narolecash.css'>
</svelte:head>

<header>
    <img src="https://fakeimg.pl/250x100/?text=Brand%20Logo" alt="logo">
    <h1>{$questionSet.questionset.title}</h1>    
</header>

<slot></slot>


<style>
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