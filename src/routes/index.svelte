<script lang="ts">
    import { getContext } from 'svelte';
	import Page from '$lib/components/Page.svelte';
	import type { QuestionSetType } from '$lib/types/questionset';

	const questionset: QuestionSetType = getContext("questionset");
</script>
    

<Page page={questionset.pages[0]}/>


<style>

</style>