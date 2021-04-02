<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const url = `/questionsets/questionset.json`;
		const res = await fetch(url);
    
    if (res.ok) {
			return {
				props: {
					questionSetData: await res.json()
				}
			};
		}

    return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
    import { questionSet } from '$lib/stores';
    export let questionSetData;
    questionSet.set(questionSetData);
</script>
    

<p>Some introductory stuff goes here</p>
<p>Possibly marketing nonsense</p>
<p>Possibly compliance stuff about how we'll handle customer data</p>


<style>

</style>