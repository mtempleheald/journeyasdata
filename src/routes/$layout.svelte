<script>
    import WizardBar from '$lib/WizardBar.svelte';
</script>

<svelte:head>
	<title>Question Set Demo</title>
</svelte:head>


<header>
    <img src="https://fakeimg.pl/250x100/?text=Logo" alt="logo">
    <h1>Question Set demo</h1>    
</header>
<WizardBar/>

<slot></slot>


<style>
    /* alternative approach at https://github.com/josefaidt/svelte-themer */
    :root {
        --question-colour-bg: lightblue;
        --question-colour-bg-highlight: khaki;
        --question-colour-text: black;
        --question-colour-text-highlight: black;
        --border-style: solid;
        --address-colour-bg: lightblue;
        --address-colour-bg-highlight: lightblue;
        --address-colour-text: black;
        --address-colour-text-highlight: black;
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