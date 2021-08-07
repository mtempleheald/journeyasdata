<script lang="ts">
    export let source : string
    import snarkdown from 'snarkdown';
</script>

{#if source}
  <!-- TODO: reinstate markdown using a compatible library (snarkdown is not) -->
  <!-- {@html snarkdown(source)} -->
  {source}
{/if}