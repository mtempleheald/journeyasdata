<!-- 
Workaround to avoid referencing dynamic import variables directly, which results in error:
    [rollup-plugin-dynamic-import-variables] Unexpected token in layout.svelte
Open issue: https://github.com/sveltejs/kit/issues/720 
-->
<script context="module">
	export const BRAND = import.meta.env.VITE_BRAND
    export const BASEURL = import.meta.env.VITE_BASEURL
</script>