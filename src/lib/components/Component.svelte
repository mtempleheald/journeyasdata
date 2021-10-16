<script lang="ts">
    import type { ComponentType, DisplayComponentType, InputComponentType, ListComponentType } from '$lib/types/journey';
    import { actionStore } from '$lib/stores/actionstore';
    import { browser } from '$app/env';
    import { displayValueStore } from '$lib/stores/displayvaluestore';
    import { replaceTokens } from '$lib/utils/replacetokens';
    import { validationStore } from '$lib/stores/validationstore';
    import { valueStore } from '$lib/stores/valuestore';
    import Address from '$lib/components/Address.svelte';    
    import Displayblock from '$lib/components/DisplayBlock.svelte';
    import Displaymodal from '$lib/components/DisplayModal.svelte';
    import Displayselections from './DisplaySelections.svelte';
    import InputTextbox from '$lib/components/InputTextbox.svelte';
    import ListButtonselect from '$lib/components/ListButtonselect.svelte';
    import ListDropdown from '$lib/components/ListDropdown.svelte';
    import Markdown from '$lib/components/Markdown.svelte';    
    import Triboxdate from '$lib/components/InputTriboxdate.svelte';
    import Vehicle from '$lib/components/Vehicle.svelte';


    export let component: ComponentType;

    function componentUpdated(event) {
      console.log(event.detail)
      // update value store with latest value, regardless of validity
      // ensure that the key is a string, even if the id entered as numeric, required for retrieval
      valueStore.set(event.detail.key.toString(), event.detail.value)
      // update display value in line with value store
      displayValueStore.set(event.detail.key, event.detail.display ?? event.detail.value)
      // update validation store for use by validators
      validationStore.set(event.detail.key, event.detail.valid)
      // execute action if applicable
      let f = $actionStore[event.detail.key]
      if (typeof f === 'function') f()
    }

    async function toListComponent(component: ComponentType): Promise<ListComponentType> {
      if (component.type == "YesNo") {
        return {...component, 
          value:$valueStore[component.id] ?? '',
          values: [{value:"Y",display:"Yes"},{value:"N",display:"No"}]
        }
      }
      else {
        const listComponent: ListComponentType = component as ListComponentType;
        let effectiveValues = listComponent.values;
        if (listComponent.refdata && browser) {
            const res = await fetch (`/api/refdata/${listComponent.refdata}?parent=${listComponent.refdataparent}`);
            effectiveValues = await res.json() ?? [];
        }
        return {...listComponent, 
          value:$valueStore[listComponent.id] ?? '', // TODO: Verify that this is a valid value in the list of values
          values: effectiveValues,
          refdataparent: $valueStore[listComponent.refdataparent] ?? ''
        }
      }
    }

    async function toDisplayComponent(component: ComponentType): Promise<DisplayComponentType> {
      return component as DisplayComponentType
    }
    async function toInputComponent(component: ComponentType): Promise<InputComponentType> {
      return component as InputComponentType
    }
</script>


{#if !component.dependsupon || ($valueStore[component.dependsupon.id] == component.dependsupon.value)}

{#if ["Colour","Date","Datetime","Email","Month","Number","Range","Search","Telephone","Text","Time","Upper","Url","Week","Year"].includes(component.type)}
  <svelte:component this={InputTextbox} 
    component={{...component, value:$valueStore[component.id] ?? ''}}
    on:valueChange="{componentUpdated}">
      <svelte:fragment slot="pre">
        <Markdown source={component.pre}/>
      </svelte:fragment>
      <svelte:fragment slot="post">
        <Markdown source={component.post}/>
      </svelte:fragment>  
  </svelte:component>

{:else if ["ButtonSelect","Dropdown","YesNo"].includes(component.type)}
  {#await toListComponent(component)}
  <!-- looking up refdata (maybe) -->
  {:then comp}
  <svelte:component this={({
      "ButtonSelect":ListButtonselect, 
      "Dropdown":ListDropdown, 
      "YesNo":ListButtonselect
    })[component.type]} 
    component={comp}
    on:valueChange="{componentUpdated}">
    <svelte:fragment slot="pre">
      <Markdown source={comp.pre}/>
    </svelte:fragment>
    <svelte:fragment slot="post">
      <Markdown source={comp.post}/>
    </svelte:fragment>
  </svelte:component>
  {/await}

{:else if ["Displayblock","Displaymodal","Displayselections"].includes(component.type)}
  {#await toDisplayComponent(component)}
  <!-- cast in function to avoid TS warnings, not really awaiting anything -->
  {:then comp}
  <svelte:component this={({
      "Displayblock":Displayblock, 
      "Displaymodal":Displaymodal, 
      "Displayselections":Displayselections
    })[component.type]} 
    component={comp}>
  <svelte:fragment slot="pre">
    <Markdown source={comp.pre}/>
  </svelte:fragment>
  <svelte:fragment slot="main"> 
    <Markdown source={replaceTokens(comp.content, $displayValueStore)}/>
  </svelte:fragment>
  <svelte:fragment slot="post">
    <Markdown source={comp.post}/>
  </svelte:fragment>
  </svelte:component>
  {/await}

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
