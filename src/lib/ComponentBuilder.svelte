<script lang="ts">
    import snarkdown from 'snarkdown';// https://github.com/developit/snarkdown/blob/master/test/index.js
    import Address from '$lib/capture/Address.svelte';
    import ButtonSelect from '$lib/capture/ButtonSelect.svelte';
    import Dropdown from '$lib/capture/Dropdown.svelte';
    import Displayblock from '$lib/display/Displayblock.svelte';
    import Textbox from '$lib/capture/Textbox.svelte';
    import Vehicle from '$lib/capture/Vehicle.svelte';
    import { inputStore } from '$lib/stores/inputstore';
    import { validationStore } from '$lib/stores/validationstore';
    import type { Component } from '$lib/types/QuestionSet';

    export let component: Component;

    function componentUpdated(event) {
      console.log(`dispatched event - {key: ${event.detail.key}, value: ${event.detail.value}, valid: ${event.detail.valid}}`)
      // update input store with latest value, regardless of validity
      inputStore.input(event.detail.key, event.detail.value);
      // update validation store for use by validators
      validationStore.input(event.detail.key, event.detail.valid);
    }
    function addressUpdated(event) {
      console.log(`dispatched event - ${event.detail.key}`)
    }
</script>


{#if !component.dependsupon || ($inputStore[component.dependsupon.id] == component.dependsupon.value)}
{#if ["Colour","Date","Datetime","Email","Month","Number","Search","Slider","Text","Telephone","Time","Upper","Url","Week"].includes(component.type)}
<svelte:component 
  this={Textbox} 
  type="{component.type ?? 'text'}"
  on:valueChange="{componentUpdated}"
  id="{component.id}"
  label="{component.label}"
  placeholder="{component.placeholder ?? ''}"
  help="{component.help ?? ''}"
  required="{component.required ?? false}"
  errorMessage="{component.errorMessage ?? ''}"
>
  <div slot="pre">
    {#if component.pre}
      {@html snarkdown(component.pre)}
    {/if}
  </div>
  <div slot="post">
    {#if component.post}
      {@html snarkdown(component.post)}
    {/if} 
  </div>
</svelte:component>
{:else if component.type == "YesNo"}
  <ButtonSelect
    on:valueChange="{componentUpdated}"
    id="{component.id}"
    label="{component.label}"
    help="{component.help ?? ''}"
    required="{component.required ?? false}"
    errorMessage="{component.errorMessage ?? ''}"
    values={[{value:"Y",display:"Yes"},{value:"N",display:"No"}]}
  >
    <div slot="pre">
      {#if component.pre}
        {@html snarkdown(component.pre)}
      {/if}
    </div>
    <div slot="post">
      {#if component.post}
        {@html snarkdown(component.post)}
      {/if} 
    </div>
    </ButtonSelect>
{:else if component.type == "ButtonSelect"}
  <ButtonSelect
    on:valueChange="{componentUpdated}"
    id="{component.id}"
    label="{component.label}"
    help="{component.help ?? ''}"
    required="{component.required ?? false}"
    errorMessage="{component.errorMessage ?? ''}"
    values={component.values}
  >
    <div slot="pre">
      {#if component.pre}
        {@html snarkdown(component.pre)}
      {/if}
    </div>
    <div slot="post">
      {#if component.post}
        {@html snarkdown(component.post)}
      {/if} 
    </div>
    </ButtonSelect>
{:else if component.type == "Dropdown"}
  <Dropdown
    on:valueChange="{componentUpdated}"
    id="{component.id}"
    label="{component.label}"
    refdata="{component.refdata}"
    placeholder="{component.placeholder ?? ''}"
    help="{component.help ?? ''}"
    required="{component.required ?? false}"
    errorMessage="{component.errorMessage ?? ''}"
    values={component.values ?? []}
  >
    <div slot="pre">
      {#if component.pre}
        {@html snarkdown(component.pre)}
      {/if}
    </div>
    <div slot="post">
      {#if component.post}
        {@html snarkdown(component.post)}
      {/if} 
    </div>
  </Dropdown>
{:else if component.type == "Displayblock"}
  <Displayblock>
    <div slot="pre">
      {#if component.pre}
        {@html snarkdown(component.pre)}
      {/if}
    </div>
    <div slot="main">
      {@html snarkdown(component.content)}
    </div>
    <div slot="post">
      {#if component.post}
        {@html snarkdown(component.post)}
      {/if} 
    </div>
  </Displayblock>
{:else if component.type == "Address"}
  <Address 
    on:addressChange="{addressUpdated}"
    postcodePlaceholder={component.postcodePlaceholder} 
    postcodeLabel={component.postcodeLabel} 
    buttonLabel={component.buttonLabel}
    houseLabel={component.houseLabel}/>
{:else if component.type == "Vehicle"}
  <Vehicle 
    regnumPlaceholder={component.regnumPlaceholder} 
    regnumLabel={component.regnumLabel} 
    buttonLabel={component.buttonLabel}
    errorMessage={component.errorMessage}/>
{/if}
{/if}