<script lang="ts">
    import snarkdown from 'snarkdown';

    export let source: string

    async function html(md) {
      // TODO: consider switching to remark
      return snarkdown(md)
    }
    
</script>


{#if source}
  {#await html(source)}
    loading...
  {:then content}
    {@html content}
  {:catch error}
    unable to parse markdown
  {/await}
{/if}
