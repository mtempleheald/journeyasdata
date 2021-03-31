<script>
    import QuestionSet from "$lib/QuestionSet.svelte";
</script>
    
<svelte:head>
	<title>Question Set Demo</title>
</svelte:head>

<header>
    <h1>Question Set demo</h1>
    <p>This question set data came from a json file, including markdown for pre and post question</p>
</header>

<span>This could be a nice wizard progress bar</span>
<ul>
<li><a href="/page1">Page 1</a></li>
<li><a href="/page2">Page 2</a></li>
<li><a href="/page3">Page 3</a></li>
</ul>

<span>These questions need to be loaded by page, from a master question set</span>
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