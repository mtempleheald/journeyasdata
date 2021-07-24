<script lang="ts">
    import snarkdown from 'snarkdown';// https://github.com/developit/snarkdown/blob/master/test/index.js
    import Address from '$lib/components/Address.svelte';
    import ButtonSelect from '$lib/components/ButtonSelect.svelte';
    import Dropdown from '$lib/components/Dropdown.svelte';
    import Displayblock from '$lib/components/Displayblock.svelte';
    import Displaymodal from '$lib/components/Displaymodal.svelte';
    import Textbox from '$lib/components/Textbox.svelte';
    import Vehicle from '$lib/components/Vehicle.svelte';
    import TriBoxDate from '$lib/components/TriBoxDate.svelte';
    import { valueStore } from '$lib/stores/valuestore';
    import { validationStore } from '$lib/stores/validationstore';
    import { actionStore } from '$lib/stores/actionstore';
    import type { ComponentType } from '$lib/types/questionset';

    export let component: ComponentType;

    function componentUpdated(event) {
      console.log(`{key: "${event.detail.key}", value: "${event.detail.value}", valid: "${event.detail.valid}}"`)
      // update input store with latest value, regardless of validity
      valueStore.set(event.detail.key, event.detail.value);
      // update validation store for use by validators
      validationStore.set(event.detail.key, event.detail.valid);
      // execute action if applicable
      let f = $actionStore[event.detail.key];
      if (typeof f === 'function') f();
    }
</script>


{#if !component.dependsupon || ($valueStore[component.dependsupon.id] == component.dependsupon.value)}
{#if ["Colour","Date","Datetime","Email","Month","Number","Search","Slider","Text","Telephone","Time","Upper","Url","Week"].includes(component.type)}
<svelte:component this={Textbox} 
  component={{...component, value:$valueStore[component.id] ?? ''}}
  on:valueChange="{componentUpdated}">
    <svelte:fragment slot="pre">
      {#if component.pre}    
        {@html snarkdown(component.pre)}    
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="post">
      {#if component.post}
        {@html snarkdown(component.post)}
      {/if}
    </svelte:fragment>  
</svelte:component>
{:else if component.type == "YesNo"}
<ButtonSelect   
  component={{...component, 
    value:$valueStore[component.id] ?? '', 
    values:[{value:"Y",display:"Yes"},{value:"N",display:"No"}]}}
  on:valueChange="{componentUpdated}">
  <svelte:fragment slot="pre">
    {#if component.pre}    
      {@html snarkdown(component.pre)}    
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="post">
    {#if component.post}
      {@html snarkdown(component.post)}
    {/if}
  </svelte:fragment>
  </ButtonSelect>
{:else if component.type == "ButtonSelect"}
<ButtonSelect
  component={{...component, 
    value:$valueStore[component.id] ?? ''}}
  on:valueChange="{componentUpdated}">
    <svelte:fragment slot="pre">
      {#if component.pre}    
        {@html snarkdown(component.pre)}    
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="post">
      {#if component.post}
        {@html snarkdown(component.post)}
      {/if}
    </svelte:fragment>
</ButtonSelect>
{:else if component.type == "Dropdown"}
<Dropdown
  component={{...component, 
    value:$valueStore[component.id] ?? ''}}
  on:valueChange="{componentUpdated}">
    <svelte:fragment slot="pre">
      {#if component.pre}    
        {@html snarkdown(component.pre)}    
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="post">
      {#if component.post}
        {@html snarkdown(component.post)}
      {/if}
    </svelte:fragment>
</Dropdown>
{:else if component.type == "Displayblock"}
<Displayblock>
  <svelte:fragment slot="pre">
    {#if component.pre}    
      {@html snarkdown(component.pre)}    
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="main">
    {#if component.content}    
      {@html snarkdown(component.content)}    
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="post">
    {#if component.post}
      {@html snarkdown(component.post)}
    {/if}
  </svelte:fragment>
</Displayblock>
{:else if component.type == "Displaymodal"}
<Displaymodal>
  <svelte:fragment slot="pre">
    {#if component.pre}    
      {@html snarkdown(component.pre)}    
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="main">
    {#if component.content}    
      {@html snarkdown(component.content)}    
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="post">
    {#if component.post}
      {@html snarkdown(component.post)}
    {/if}
  </svelte:fragment>
</Displaymodal>
{:else if component.type == "Address"}
  <Address 
    component={component}
    on:addressChange="{componentUpdated}"
  />
{:else if component.type == "TriBoxDate"}
  <TriBoxDate 
    component={component}
    on:dateChange="{componentUpdated}"
  />
{:else if component.type == "Vehicle"}
  <Vehicle 
    component={component}
    on:vehicleChange="{componentUpdated}"
  />
{/if}
{/if}