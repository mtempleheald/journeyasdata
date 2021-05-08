<script context="module">
    import { BRAND } from '$lib/env/Env.svelte'
    /**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {        
        // fetch questionset from file on first page hit

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

<slot></slot>