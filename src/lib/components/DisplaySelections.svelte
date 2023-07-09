<script lang="ts">
	import type { DisplaySelections } from '$lib/types/journey';
	export let component: DisplaySelections;

	let active = '';
	function enter() {
		active = 'active';
	}
	function leave() {
		active = '';
	}
</script>

<div class="display {active}" on:mouseenter={enter} on:mouseleave={leave} role="presentation">
	<p><slot name="pre" /></p>
	<p><slot name="main" /></p>
	<div class="container">
		<div class="selected">
			<h4>{component.selectedtitle}</h4>
			<ul>
				{#each component.items.filter((item) => item.selected) as i}
					<li>
						<span>{i.title}</span>
						{#if i.detail}
							<span>{i.detail}</span>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
		<div class="unselected">
			<h4>{component.unselectedtitle}</h4>
			<ul>
				{#each component.items.filter((item) => item.selected == false) as i}
					<li>
						<span>{i.title}</span>
						{#if i.detail}
							<span>{i.detail}</span>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<p><slot name="post" /></p>
</div>

<style>
	.display {
		margin: 0;
		padding: var(--display-padding);
		background-color: var(--display-bg);
		color: var(--display-txt);
		border: var(--display-border);
	}
	.display.active {
		background-color: var(--display-active-bg);
		color: var(--display-active-txt);
	}

	.container {
		display: flex;
		flex-flow: wrap;
	}
	.container > * {
		flex-shrink: 1;
		flex-grow: 1;
		flex-basis: calc(var(--page-width) / 4);
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	.selected ul li::before {
		content: '\2713';
		padding-right: 0.5rem;
	}
	.unselected ul li::before {
		content: '\2717';
		padding-right: 0.5rem;
	}
</style>
