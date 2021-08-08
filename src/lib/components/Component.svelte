<script lang="ts">
    import type { ComponentType } from '$lib/types/journey';
    import { actionStore } from '$lib/stores/actionstore';
    import { validationStore } from '$lib/stores/validationstore';
    import { valueStore } from '$lib/stores/valuestore';
    import Address from '$lib/components/Address.svelte';
    import Buttonselect from '$lib/components/Buttonselect.svelte';
    import Displayblock from '$lib/components/Displayblock.svelte';
    import Displaymodal from '$lib/components/Displaymodal.svelte';
    import Dropdown from '$lib/components/Dropdown.svelte';
    import Markdown from '$lib/components/Markdown.svelte';
    import Textbox from '$lib/components/Textbox.svelte';
    import Triboxdate from '$lib/components/Triboxdate.svelte';
    import Vehicle from '$lib/components/Vehicle.svelte';

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
        <Markdown source={component.pre}/>
      </svelte:fragment>
      <svelte:fragment slot="post">
        <Markdown source={component.post}/>
      </svelte:fragment>  
  </svelte:component>
{:else if component.type == "YesNo"}
  <Buttonselect   
    component={{...component, 
      value:$valueStore[component.id] ?? '', 
      values:[{value:"Y",display:"Yes"},{value:"N",display:"No"}]}}
      on:valueChange="{componentUpdated}">
    <svelte:fragment slot="pre">
      <Markdown source={component.pre}/>
    </svelte:fragment>
    <svelte:fragment slot="post">
      <Markdown source={component.post}/>
    </svelte:fragment>
  </Buttonselect>
{:else if component.type == "ButtonSelect"}
  <Buttonselect
    component={{...component, 
      value:$valueStore[component.id] ?? ''}}
      on:valueChange="{componentUpdated}">
    <svelte:fragment slot="pre">
      <Markdown source={component.pre}/>
    </svelte:fragment>
    <svelte:fragment slot="post">
      <Markdown source={component.post}/>
    </svelte:fragment>
  </Buttonselect>
{:else if component.type == "Dropdown"}
  <Dropdown
    component={{...component, 
      value:$valueStore[component.id] ?? ''}}
    on:valueChange="{componentUpdated}">
      <svelte:fragment slot="pre">
        <Markdown source={component.pre}/>
      </svelte:fragment>
      <svelte:fragment slot="post">
        <Markdown source={component.post}/>
      </svelte:fragment>
  </Dropdown>
{:else if component.type == "Displayblock"}
  <Displayblock>
    <svelte:fragment slot="pre">
        <Markdown source={component.pre}/>
    </svelte:fragment>
    <svelte:fragment slot="main"> 
      <Markdown source={component.content}/>
    </svelte:fragment>
    <svelte:fragment slot="post">
      <Markdown source={component.post}/>
    </svelte:fragment>
  </Displayblock>
{:else if component.type == "Displaymodal"}
  <Displaymodal>
    <svelte:fragment slot="pre">
      <Markdown source={component.pre}/>
    </svelte:fragment>
    <svelte:fragment slot="main">
      <Markdown source={component.content}/>
    </svelte:fragment>
    <svelte:fragment slot="post">
      <Markdown source={component.post}/>
    </svelte:fragment>
  </Displaymodal>
{:else if component.type == "Address"}
  <Address 
    component={component}
    on:addressChange="{componentUpdated}"
  />
{:else if component.type == "TriBoxDate"}
  <Triboxdate 
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
