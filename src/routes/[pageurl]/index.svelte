<script context="module">

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		return {
      props: {
        pageurl: await `${page.params.pageurl}`
      }
		};
	}
</script>

<script>
  import Page from '$lib/components/Page.svelte';
  export let pageurl;
</script>


<Page pageurl={pageurl}/>