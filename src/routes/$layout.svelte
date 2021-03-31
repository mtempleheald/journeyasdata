<header>
    <img src="https://fakeimg.pl/250x100/?text=Logo" alt="logo">
    <h1>Question Set demo</h1>    
</header>

<slot></slot>

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
    img {
        height: 100px;
        float: left;
    }
    h1 {
        height: 100px;
        line-height: 100px;
        margin: 0 2rem;
        float: none;
    }
</style>