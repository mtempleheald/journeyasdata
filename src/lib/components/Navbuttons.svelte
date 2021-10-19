<script lang="ts">
    import type { JourneyType } from '$lib/types/journey';
    import { DISABLEVALIDATION } from '$lib/env';
    import { goto } from '$app/navigation';
    import { nextPageUrl, prevPageUrl } from '$lib/utils/navigation';
    import { pageValid } from '$lib/utils/validators';
    import { validationStore } from '$lib/stores/validationstore';
    import { valueStore } from '$lib/stores/valuestore'

    export let journey: JourneyType;
    export let pageurl: string;
    export let backText: string = 'Back';
    export let nextText: string = 'Next';    

    function back(event) {
        console.log ("Navigating to previous page");
        goto(prevPageUrl(journey, pageurl))
    }
    function next(event) {
        if (DISABLEVALIDATION == 'Y') {
            console.log('Validation disabled, redirecting to next page')
            goto(nextPageUrl(journey, pageurl));
        }
        else if (pageValid(journey.pages.find(p => p.url == pageurl), $valueStore, $validationStore)) {
            console.log ("Page valid, redirecting to next page");
            goto(nextPageUrl(journey, pageurl));
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
    width: 100%;
    padding: 0;
    margin: auto;
    display: flex;
    align-content: stretch;
}
.spacer {
    flex-grow: 10;
}
button {
    flex-grow: 1;
    color: var(--section-navbtn-txt);
    background-color: var(--section-navbtn-bg);
}

</style>
