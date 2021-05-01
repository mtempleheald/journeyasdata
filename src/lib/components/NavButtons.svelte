<script lang="ts">
    import { goto } from '$app/navigation';
    import type { QuestionSetType } from '$lib/types/questionset';
    import { inputStore } from '$lib/stores/inputstore'
    import { validationStore } from '$lib/stores/validationstore';
    import { pageValidator } from '$lib/validators/pagevalidator';

    export let questionset: QuestionSetType;
    export let pageurl: string;
    export let backText: string = 'Back';
    export let nextText: string = 'Next';    

    let pageUrls: string[] = questionset.pages.map(p => p.url);
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
        if (pageValidator.valid(questionset, pageurl, $inputStore, $validationStore)) {
            console.log ("Page valid, redirecting to " + nextPage());
            goto(nextPage());
        }
        else {
            console.log("Page invalid, correct before trying again");
        }
    }
</script>


<section class="button-navigation">
    {#if backText}
        <button type="button" class="back" on:click={back}>{backText}</button>
    {/if}
    <span class="spacer"></span>
    {#if nextText}
        <button type="button" class="next" on:click={next}>{nextText}</button>
    {/if}
</section>


<style>

.button-navigation {
    width: calc(100vw - 100px);
    padding: 0 1rem;
    margin: auto;
    display: flex;
    align-content: stretch;
}
.spacer {
    flex-grow: 10;
}
button {
    flex-grow: 1;
    color: var(--section-navbtn-txt, black);
    background-color: var(--section-navbtn-bg, white);
}

</style>