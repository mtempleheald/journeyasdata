<script>

</script>
    
<svelte:head>
	<title>Question Set Demo</title>
</svelte:head>

<nav>
    <ul>
        <li><a href="/page1">Page 1</a></li>
        <li><a href="/page2">Page 2</a></li>
        <li><a href="/page3">Page 3</a></li>
    </ul>
</nav>

<p>Some introductory stuff goes here</p>
<p>Possibly marketing nonsense</p>
<p>Possibly compliance stuff about how we'll handle customer data</p>

<style>
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