<script context="module">
    import { BRAND } from '$lib/env/Env.svelte'
    /** @type {import('@sveltejs/kit').Load} */
	export async function load() {        
        // dynamically load content, making use of HMR for quick feedback
        async function loadContent() {
            let content = await import(`./../../static/${BRAND}/journey.json`);
            return content
        }
		return {
            props: {
                journey: await loadContent(),
                brand: BRAND.toString()
            }
        };
	}
</script>

<script lang="ts">
    import type { JourneyType } from '$lib/types/journey';
    import { actionStore } from '$lib/stores/actionstore';
    import { browser } from '$app/env';
    import { getActions } from '$lib/actions/actionprovider';
    import { setContext } from 'svelte';
    
    export let brand: string;
    export let journey: JourneyType;

    // load journey once, reference throughout user journey
    setContext("journey", journey); 
    // load bespoke actions once, call throughout user journey
    if (browser) {
        actionStore.load(getActions(brand));
        console.log(`${Object.keys($actionStore).length} actions loaded for ${brand}`);
    }
</script>


<svelte:head>
    <title>{journey.title}</title>
    <link rel='stylesheet' href="/{brand}/theme.css">
</svelte:head>

<slot></slot>