<script>
import QuestionSet from "./QuestionSet.svelte";
</script>


<header>
	<h1>Question Set demo</h1>
	<p>This question set data came from a json file, including markdown for pre and post question</p>
</header>
<QuestionSet/>



<style>
  /* alternative approach at https://github.com/josefaidt/svelte-themer */
  :root {
    --colour-background: lightblue;
	--colour-highlight: khaki;
    --colour-text: black;
	--border-style: solid;
  }
</style>