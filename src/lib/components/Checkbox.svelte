<script lang="ts">
  import type { ComponentType, ValueType } from '$lib/types/journey';
  import { createEventDispatcher, onMount } from 'svelte';
  import Helptext from '$lib/components/Helptext.svelte';

  // load refdata on component creation
  onMount(async () => {
      effectiveValues = component.values;
      if (component.refdata) {
          await fetch ('/api/refdata/' + component.refdata)
          .then(resp => resp.json())
          .then(data => effectiveValues = data);
      }
  });
  

  // expose component properties
  export let component: ComponentType;

  // internal properties to support component logic
  const dispatch = createEventDispatcher();
  let fallbackError;
  let invalid = false;
  let active;
  let ackValue;
  let effectiveValues: ValueType[]; // overwriting component.values directly triggers an onMount loop
  
  // Override for Acknowledgement type component 
  if (component.type == "Acknowledgement") {
    component.required = true;
    if (component.errorMessage == null) {
      component.errorMessage = "Please acknowledge this to continue."
    }
    ackValue = component.values[0];

    console.info(component.required);
  }
 
  // component actions    
  function enter() {
      active = "active";
  }
  function leave() {
      active = "";
  }    
  function act(event) {
      // publish value changes up to parent too
      dispatch('valueChange', {key: component.id, value: event.target.value, valid: (!component.required || !!event.target.value)});
      invalid = (component.required && !event.target.value);
  }
</script>


<div class="question {active} {invalid?'invalid':''}" 
  on:mouseenter={enter} 
  on:mouseleave={leave} >

  <slot name="pre"></slot>

  <div class="container">
      {#if component.label}
      <label for="{component.id}">
          {component.label}
          {#if component.required}
              <span class="required">*</span>
          {/if}
      </label>
      {/if}
      {#if component.id}
        {#if effectiveValues}
          {#if component.type == "Acknowledgement" && ackValue != null}
            <input type="checkbox"
              id="{component.id}" 
              name="{component.id}" 
              value="{ackValue.value}"
              required
              on:blur={act}
            />{ackValue.display}
          {:else}
            {#each effectiveValues as val}
              <input type="checkbox"
                id="{component.id}-{val.value}" 
                name="{component.id}" 
                value="{val.value}"
                required
                on:blur={act}
                />{val.display}
            {/each}
          {/if}

        {/if}
      {/if}
      {#if component.help}
      <Helptext>{component.help}</Helptext>
      {/if}
  </div>

  {#if invalid}
    <span class="error">{component.errorMessage ?? fallbackError}</span>
  {/if}

  <slot name="post"></slot>
</div>


<style>
  .question {
      margin: 0.5rem 1rem;
      padding: 0.5rem 1rem;
      background-color: var(--input-bg, white);
      color: var(--input-txt, black);
      border: var(--input-border, 1px solid black);
  }
  .question.active {
      background-color: var(--input-active-bg, rgb(255, 255, 214));
      color: var(--input-active-txt, black);
  }
  .question.invalid {
      background-color: var(--input-error-bg, pink);
      color: var(--input-error-txt, red);
  }
  .required {
      color: var(--question-colour-text, black);
  }
  .container {
      width: 100%;
  }
  label {
      display: inline-block;
      padding: 0.5rem;
      width: max(250px, 40%);
  }
  select {
      margin: 0.5rem;
  }
  .error {
      padding: 0.5rem;
      background-color: var(--input-error-msg-bg, red);
      color: var(--input-error-msg-txt, pink);
  }
</style>
