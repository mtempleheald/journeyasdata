<script lang="typescript">
    import { inputStore } from '$lib/stores/inputstore'
    import { questionSet } from '$lib/stores/questionset';
    import { pageValidator } from '$lib/validators/pagevalidator';
    import { goto } from '$app/navigation';

    export let backText : string = 'Back';
    export let nextText : string = 'Next';
    export let pageurl : string;
    let pageUrls : string[];
    let pageUrlIndex : number;

    //function setup(){
        pageUrls = $questionSet.pages.map(p => p.page.url);
        pageUrlIndex = pageUrls.indexOf(pageurl);
    //}
    function back(event) {
        console.log ("Navigating back from " + pageurl);
    //    setup();
        if (pageUrlIndex > 0){
            goto(pageUrls[pageUrlIndex - 1]);
        }
    }
    function next(event) {
        console.log ("Navigating forward from " + pageurl);
    //    setup();
        if (pageValidator.valid($questionSet, pageurl, $inputStore)) {
            console.log ("Page valid, redirecting...");
            // page valid, go to next page
            if (pageUrlIndex < pageUrls.length){
                goto(pageUrls[pageUrlIndex + 1]);
            }
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