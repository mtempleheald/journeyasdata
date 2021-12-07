<script lang="ts">
	import type { DisplayComponent } from '$lib/types/journey';

	export let component: DisplayComponent;

	let active;
	function enter() {
		active = 'active';
	}
	function leave() {
		active = '';
	}
</script>

<div class="display {active}" on:mouseenter={enter} on:mouseleave={leave}>
	<p><slot name="pre" /></p>
	{#if component.content}
		<div class="content">
			{#if Array.isArray(component.content)}
				{#each component.content as content}
					<p>{@html content}</p>
				{/each}
			{:else}
				<p>{@html component.content}</p>
			{/if}
		</div>
	{/if}
	<p><slot name="main" /></p>
	<p><slot name="post" /></p>
</div>

<style>
	.display {
		margin: 0;
		padding: var(--display-padding, 0);
		background-color: var(--display-bg);
		color: var(--display-txt);
		border: var(--display-border);
	}
	.display.active {
		background-color: var(--display-active-bg);
		color: var(--display-active-txt);
	}
	.content {
		display: flex;
		flex-flow: wrap;
	}
	p {
		flex: auto;
	}
</style>
