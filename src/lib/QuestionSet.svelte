<script>
  import TextQuestion from '$lib/TextQuestion.svelte';
  import { questionSet } from '$lib/stores';
  import snarkdown from 'snarkdown';// https://github.com/developit/snarkdown/blob/master/test/index.js

  const qs = [
    {
      "id" : 1,
      "label": "Question Label",
      "type": "TextQuestion",
      "placeholder": "Placeholder...",
      "help": "Help text",
      "pre": "# Markdown before question 1",
      "post": "__Markdown after question 1__"
    },
    {
      "id" : 2,
      "label": "Lable & question only",
      "type": "TextQuestion"
    },
    {
      "id" : 3,
      "type" : "TextQuestion",
      "placeholder" : "label replacement?",
      "pre" : "This isn't a label, but _pre-text_"
    },
    {
      "type" : "TextQuestion",
      "pre" : "Perhaps we don't want a question, just some _italic_ text",
      "post" : "And some more __bold__ text"
    }
  ];
  // TODO - pull this from an external API (Back office tooling)
  questionSet.set(qs);
</script>


{#each $questionSet as q}
{#if q.type == "TextQuestion"}
  <TextQuestion
    id="{q.id}"
    label="{q.label}"
    placeholder="{q.placeholder ?? ''}"
    help="{q.help ?? ''}"
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
  </TextQuestion>
{/if}
{/each}


<style>

</style>