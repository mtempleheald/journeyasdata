<script lang="typescript">
    import { questionSet } from '$lib/stores/questionset';
    import { inputStore } from '$lib/stores/inputstore'
    import { validationStore } from '$lib/stores/validationstore';
    import { pageValidator } from '$lib/validators/pagevalidator';
    import { goto } from '$app/navigation';

    export let backText : string = 'Back';
    export let nextText : string = 'Next';
    export let pageurl : string;

    let pageUrls: string[] = $questionSet.pages.map(p => p.page.url);
    function nextPage() {
        return (pageUrls.indexOf(pageurl) < pageUrls.length - 1) 
            ? pageUrls[pageUrls.indexOf(pageurl) + 1] 
            : pageurl
    };
    function prevPage() {
        return (pageUrls.indexOf(pageurl) > 0) 
            ? pageUrls[pageUrls.indexOf(pageurl) - 1] 
            : pageurl
    };

    function back(event) {
        console.log ("Navigating back to " + prevPage());
        goto(prevPage())
    }
    function next(event) {
        if (pageValidator.valid($questionSet, pageurl, $inputStore, $validationStore)) {
            console.log ("Page valid, redirecting to " + nextPage());
            goto(nextPage());
        }
        else {
            console.log("Page invalid, correct before trying again");
        }
    }

</script>


<nav class="button-navigation">
    {#if backText}
        <button type="button" class="back" on:click={back}>{backText}</button>
    {/if}
    {#if nextText}
        <button type="button" class="next" on:click={next}>{nextText}</button>
    {/if}
</nav>


<style>

</style>