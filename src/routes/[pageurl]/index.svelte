<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		return {
      props: {
        pageurl: await `${page.params.pageurl}`
      }
		};
	}
</script>

<script>
    import Address from '$lib/capture/Address.svelte';
    import Vehicle from '$lib/capture/Vehicle.svelte';
    import Displayblock from '$lib/display/Displayblock.svelte';
    import Dropdown from '$lib/capture/Dropdown.svelte';
    import Textbox from '$lib/capture/Textbox.svelte';
    import Section from '$lib/display/Section.svelte';
    import { questionSet } from '$lib/stores/questionset';
    import snarkdown from 'snarkdown';// https://github.com/developit/snarkdown/blob/master/test/index.js
    export let pageurl;

    import { setContext } from 'svelte'
    import { writable } from 'svelte/store'

    function writeToStore(key, value) {
      const w = writable(value);
      setContext(key, w); 
    }
    
    function childUpdated(event) {
      console.log(`dispatched event - {key: ${event.detail.key}, value: ${event.detail.value}}`)
      //writeToStore(event.detail.key, event.detail.value) // can only setContext on component initialisation
    }
    function addressUpdated(event) {
      console.log(`dispatched event - ${event.detail.key}`)
    }

</script>


{#each $questionSet.pages as p} 
  {#if p.page.url == pageurl}
    <h2>{p.page.title}</h2>
    {#each p.sections as s}
      <Section
        title={s.section.title}
        logo={s.section.logo}>
      {#each s.components as q}
        <!-- {writeToStore(q.id, '')}  -  moving this into input components I think -->
        {#if ["Colour","Date","Datetime","Email","Month","Number","Search","Slider","Text","Telephone","Time","Url","Week"].includes(q.type)}
        <svelte:component 
          this={Textbox} 
          type="{q.type ?? 'text'}"
          on:valueChange="{childUpdated}"
          id="{q.id}"
          label="{q.label}"
          placeholder="{q.placeholder ?? ''}"
          help="{q.help ?? ''}"
          required="{q.required ?? false}"
          errorMessage="{q.errorMessage ?? ''}"
        >
          <div slot="pre">
            {#if q.pre}
              {@html snarkdown(q.pre)}
            {/if}
          </div>
          <div slot="post">
            {#if q.post}
              {@html snarkdown(q.post)}
            {/if} 
          </div>
        </svelte:component>
        {:else if q.type == "Dropdown"}
          <Dropdown
            on:valueChange="{childUpdated}"
            id="{q.id}"
            label="{q.label}"
            refdata="{q.refdata}"
            placeholder="{q.placeholder ?? ''}"
            help="{q.help ?? ''}"
            required="{q.required ?? false}"
            errorMessage="{q.errorMessage ?? ''}"
          >
            <div slot="pre">
              {#if q.pre}
                {@html snarkdown(q.pre)}
              {/if}
            </div>
            <div slot="post">
              {#if q.post}
                {@html snarkdown(q.post)}
              {/if} 
            </div>
          </Dropdown>
        {:else if q.type == "Displayblock"}
          <Displayblock>
            <div slot="pre">
              {#if q.pre}
                {@html snarkdown(q.pre)}
              {/if}
            </div>
            <div slot="main">
              {@html snarkdown(q.content)}
            </div>
            <div slot="post">
              {#if q.post}
                {@html snarkdown(q.post)}
              {/if} 
            </div>
          </Displayblock>
        {:else if q.type == "Address"}
          <Address 
            on:addressChange="{addressUpdated}"
            postcodePlaceholder={q.postcodePlaceholder} 
            postcodeLabel={q.postcodeLabel} 
            buttonLabel={q.buttonLabel}
            houseLabel={q.houseLabel}/>
        {:else if q.type == "Vehicle"}
          <Vehicle 
            regnumPlaceholder={q.regnumPlaceholder} 
            regnumLabel={q.regnumLabel} 
            buttonLabel={q.buttonLabel}
            errorMessage={q.errorMessage}/>
        {/if}
      {/each}
      </Section>
    {/each}
  {/if}
{/each}


<style>
  h2 {
    margin: 0;
    padding: 1rem;
    height: 1rem;
    line-height: 1rem;
  }
</style>