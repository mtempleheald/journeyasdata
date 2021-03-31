<script>
    import QuestionSet from "$lib/QuestionSet.svelte";
</script>
    
<svelte:head>
	<title>Question Set Demo</title>
</svelte:head>

<header>
    <h1>Question Set demo</h1>    
</header>

<nav>
    <ul>
        <li><a href="/page1">Page 1</a></li>
        <li><a href="/page2">Page 2</a></li>
        <li><a href="/page3">Page 3</a></li>
    </ul>
</nav>

<br>
<br>
<br>
<p>This question set data came from a json file, including markdown for pre and post question</p>
<p>These questions need to be loaded by page, from a master question set</p>
<QuestionSet/>


<style>
    /* alternative approach at https://github.com/josefaidt/svelte-themer */
    :root {
    --colour-background: lightblue;
    --colour-highlight: khaki;
    --colour-text: black;
    --border-style: solid;
    }
    :global(body) {
        margin: 0;
    }
    header {
        border-bottom: 1px solid black;
    }
    nav {
        background-color: gainsboro;
        float:left;
        width: 100%;
    }
    ul {
        text-align: center;
    }
    li {
        display: inline;
    }
    a {
        text-decoration: none;
        padding: 1rem 2rem;
        background-color: gray;
    }
    a:hover {
        text-decoration: underline;
        background-color: goldenrod;
    }
</style>