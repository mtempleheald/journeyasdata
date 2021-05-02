<!-- 
Workaround to avoid referencing dynamic import variables directly, which results in error:
    [rollup-plugin-dynamic-import-variables] Unexpected token (11:417)
    file: /home/mth/workspace/github/journeyasdata/src/routes/$layout.svelte:11:417
Open issue: https://github.com/sveltejs/kit/issues/720 
-->
<script context="module">
	export const BRAND = import.meta.env.VITE_BRAND
</script>