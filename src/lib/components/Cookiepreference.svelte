<script lang="ts">
    import { actionStore } from '$lib/stores/actionstore';
    import { validationStore } from '$lib/stores/validationstore';
    import { valueStore } from '$lib/stores/valuestore';
    import ButtonSelect from '$lib/components/ButtonSelect.svelte';
    import Markdown from '$lib/components/Markdown.svelte';
    import type { CookiePreferenceType } from '$lib/types/journey';

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


<section class="{active} {selected}" 
    on:mouseenter={enter} on:mouseleave={leave} >

<ButtonSelect
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
  </ButtonSelect>

</section>


<style>
    section {
        width: 100%;        
    }
    .selected {
        display: none;
    }
</style>