<script lang="ts">
	import type { CookiePreferenceType } from '$lib/types/journey';
	import { actionStore } from '$lib/stores/actionstore';
	import { displayValueStore } from '$lib/stores/displayvaluestore';
	import { parseMarkdown } from '$lib/utils/markdown';
	import { replaceTokens } from '$lib/utils/replacetokens';
	import { validationStore } from '$lib/stores/validationstore';
	import { valueStore } from '$lib/stores/valuestore';
	import OptionButtons from '$lib/components/OptionButtons.svelte';

	export let cookiepreferences: CookiePreferenceType;

	let selected: string = !!$valueStore['cookiestatus'] ? 'selected' : '';
	let active: string;
	function enter() {
		active = 'active';
	}
	function leave() {
		active = '';
	}
	function componentUpdated(event) {
		console.log(
			`{key: "${event.detail.key}", value: "${event.detail.value}", valid: "${event.detail.valid}}"`
		);
		// update input store with latest value, regardless of validity
		valueStore.set(event.detail.key, event.detail.value);
		// update validation store for use by validators
		validationStore.set(event.detail.key, event.detail.valid);
		// execute action if applicable
		let f = $actionStore[event.detail.key];
		if (typeof f === 'function') f();
		selected = !!event.detail.value ? 'selected' : '';
	}
</script>

{#if cookiepreferences}
	<section class="{active} {selected}" on:mouseenter={enter} on:mouseleave={leave}>
		{#if cookiepreferences.values}
			<OptionButtons
				component={{
					type: 'OptionButtons',
					id: 'cookiestatus',
					value: $valueStore['cookiestatus'] ?? '',
					values: cookiepreferences.values
				}}
				on:valueChange={componentUpdated}
			>
				<svelte:fragment slot="pre">
					{@html parseMarkdown(replaceTokens(cookiepreferences.pre, $displayValueStore))}
				</svelte:fragment>
				<svelte:fragment slot="post">
					{@html parseMarkdown(replaceTokens(cookiepreferences.post, $displayValueStore))}
				</svelte:fragment>
			</OptionButtons>
		{/if}
	</section>
{/if}

<style>
	section {
		margin: auto; /* centre content on larger screens */
		width: var(--page-hdr-width);
	}
	.selected {
		display: none;
	}
</style>
