<script lang="ts">
	import type { CookiePreferenceType } from '$lib/types/journey';
	import { actionStore } from '$lib/stores/actionstore';
	import { state } from '$lib/stores/statestore';
	import { replace_tokens } from '$lib/utils/replacetokens';
	import markdown from '$lib/utils/markdown';
	import OptionButtons from '$lib/components/OptionButtons.svelte';

	export let cookiepreferences: CookiePreferenceType;

	let selected: string = $state['cookiestatus'] ? 'selected' : '';
	let active: string;
	function enter() {
		active = 'active';
	}
	function leave() {
		active = '';
	}
	function execute_actions(event) {
		// execute action if applicable
		let f = $actionStore[event.detail.key];
		if (typeof f === 'function') f();
		selected = event.detail.value ? 'selected' : '';
	}
</script>

{#if cookiepreferences}
	<section class="{active} {selected}" on:mouseenter={enter} on:mouseleave={leave}>
		{#if cookiepreferences.values}
			<OptionButtons
				component={{
					type: 'OptionButtons',
					id: 'cookiestatus',
					value: $state['cookiestatus']?.value ?? '',
					values: cookiepreferences.values
				}}
				on:valueChange={execute_actions}
			>
				<svelte:fragment slot="pre">
					{@html markdown(replace_tokens(cookiepreferences.pre, $state))}
				</svelte:fragment>
				<svelte:fragment slot="post">
					{@html markdown(replace_tokens(cookiepreferences.post, $state))}
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
