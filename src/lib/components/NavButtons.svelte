<script lang="ts">
    import { goto } from '$app/navigation';
    import type { QuestionSetType } from '$lib/types/questionset';
    import { inputStore } from '$lib/stores/inputstore'
    import { validationStore } from '$lib/stores/validationstore';
    import { pageValidator } from '$lib/helpers/validators';
    import { nextPageUrl, prevPageUrl } from '$lib/helpers/navigation';

    export let questionset: QuestionSetType;
    export let pageurl: string;
    export let backText: string = 'Back';
    export let nextText: string = 'Next';    

    function back(event) {
        console.log ("Navigating to previous page");
        goto(prevPageUrl(questionset, pageurl))
    }
    function next(event) {
        if (pageValidator.valid(questionset, pageurl, $inputStore, $validationStore)) {
            console.log ("Page valid, redirecting to next page");
            goto(nextPageUrl(questionset, pageurl));
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