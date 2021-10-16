<script lang="ts">
    import type { CookiePreferenceType } from '$lib/types/journey';
    import { actionStore } from '$lib/stores/actionstore';
    import { validationStore } from '$lib/stores/validationstore';
    import { valueStore } from '$lib/stores/valuestore';
    import ListButtonselect from '$lib/components/ListButtonselect.svelte';
    import Markdown from '$lib/components/Markdown.svelte';

    export let cookiepreferences: CookiePreferenceType;

    let selected: string = !!$valueStore["cookiestatus"] ? 'selected' : '';
    let active: string;
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }
    function componentUpdated(event) {
      console.log(`{key: "${event.detail.key}", value: "${event.detail.value}", valid: "${event.detail.valid}}"`)
      // update input store with latest value, regardless of validity
      valueStore.set(event.detail.key, event.detail.value);
      // update validation store for use by validators
      validationStore.set(event.detail.key, event.detail.valid);
      // execute action if applicable
      let f = $actionStore[event.detail.key];
      if (typeof f === 'function') f();
      selected = !!event.detail.value ? 'selected' : '';
    }
</script>


{#if cookiepreferences}
<section class="{active} {selected}" 
    on:mouseenter={enter} on:mouseleave={leave} >

    {#if cookiepreferences.values}
    <ListButtonselect
        component={{
            id: "cookiestatus",
            value: $valueStore["cookiestatus"] ?? '',
            values: cookiepreferences.values
        }}
        on:valueChange="{componentUpdated}">
        <svelte:fragment slot="pre">
        <Markdown source={cookiepreferences.pre}/>
        </svelte:fragment>
        <svelte:fragment slot="post">
        <Markdown source={cookiepreferences.post}/>
        </svelte:fragment>
    </ListButtonselect>
    {/if}

</section>
{/if}


<style>
    section {
        margin: 0;
        width: 100%;        
    }
    .selected {
        display: none;
    }
</style>
