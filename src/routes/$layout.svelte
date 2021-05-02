<script context="module">
    import { BRAND } from '$lib/env/Env.svelte'
    /**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {        
        // console.log('Loading questionset'); // proves that this isn't loaded on each subsequent page request

        const qsurl = `/questionsets/${BRAND}.json`;
        let qs;
        await fetch(qsurl)
                .then(resp => resp.json())
                .then(data => qs = data);
        
		return {
            props: {
                questionset: qs,
                brand: BRAND
            }
        };
	}
</script>

<script lang="ts">
    import { setContext } from 'svelte';
    import { browser } from '$app/env';
    import type { QuestionSetType } from '$lib/types/questionset';
    import { actionStore } from '$lib/stores/actionstore';
    import { getActions } from '$lib/actions/actionprovider';
    
    export let brand: string;
    export let questionset: QuestionSetType;

    // load questionset once, reference throughout user journey
    setContext("questionset", questionset); 
    // load bespoke actions once, call throughout user journey
    if (browser) {
        actionStore.load(getActions(brand));
        console.log(`${Object.keys($actionStore).length} actions loaded for ${brand}`);
    }
</script>


<svelte:head>
    <title>{questionset.title}</title>
    <link rel='stylesheet' href="/themes/{brand}.css">
</svelte:head>

<header>
    <img src="https://fakeimg.pl/250x100/?text={brand}" alt="logo">
    <h1>{questionset.title}</h1>
</header>

<slot></slot>


<style>
    header {
        background-color: var(--header-bg, white);
        color: var(--header-txt, black);
        border-bottom: var(--header-border, 1px solid black);
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