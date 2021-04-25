<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {        
        // console.log('Loading questionset'); // proves that this isn't loaded on each subsequent page request

        let brand = 'technicaldemo'// ximport.meta.env.VITE_BRAND;
        const qsurl = `/questionsets/${brand}.json`;
        let qs;
        await fetch(qsurl)
                .then(resp => resp.json())
                .then(data => qs = data);
        
		return {
            props: {
                qs: qs,
                brand: brand
            }
        };
	}
</script>

<script lang="ts">
    import { setContext } from 'svelte';
    import type { QuestionSet } from '$lib/types/QuestionSet';
    
    export let brand: string;
    export let qs: QuestionSet;    
    setContext("questionset", qs); // load questionset once, referenced throughout user journey
</script>


<svelte:head>
    <title>{qs.questionset.title}</title>
    <link rel='stylesheet' href="/themes/{brand}.css">
</svelte:head>

<header>
    <img src="https://fakeimg.pl/250x100/?text={brand}" alt="logo">
    <h1>{qs.questionset.title}</h1>
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