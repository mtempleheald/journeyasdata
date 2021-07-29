<script context="module">
    import { BRAND } from '$lib/env/Env.svelte'
    /** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, session, context }) {        
        // dynamically load content, making use of HMR for quick feedback
        async function loadContent() {
            let content = await import(`./../../static/${BRAND}/journey.json`);
            return content
        }
		return {
            props: {
                questionset: await loadContent(),
                brand: BRAND.toString()
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
    <link rel='stylesheet' href="/{brand}/theme.css">
</svelte:head>

<slot></slot>