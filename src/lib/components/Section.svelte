<script lang="ts">
	import type { SectionType } from '$lib/types/journey';
	import Component from '$lib/components/Component.svelte';
	import Navbuttons from '$lib/components/Navbuttons.svelte';

	export let section: SectionType;

	let collapsed = false;

	// TODO: Consider mobile when reintroducing this
	// function collapse() {
	// 	if (section.collapsible) {
	// 		collapsed = !collapsed;
	// 	}
	// }
</script>

<section>
	{#if section.logo || section.title}
		<header>
			{#if section.logo}
				<img
					src={section.logo.url}
					alt="{section.logo.alt} section logo"
					width={section.logo.width}
					height={section.logo.height}
				/>
			{/if}
			{#if section.title}
				<h1>{section.title}</h1>
			{/if}
			{#if section.instanceid}
				<input type="hidden" id="instanceid" value={section.instanceid} />
			{/if}
		</header>
	{/if}

	<div class={collapsed ? 'collapsed' : ''}>
		{#each section.components as component}
			<Component {component} />
		{/each}
	</div>

	<slot />

	<Navbuttons nav={section.navigation} pageurl="" sectionid={section.id ?? section.title} />
</section>

<style>
	section {
		padding: var(--section-padding);
		border: var(--section-border);
	}
	header {
		display: flex;
		flex-wrap: wrap;
		color: var(--section-hdr-txt);
		background-color: var(--section-hdr-bg);
		border-bottom: var(--section-hdr-border);
		max-height: var(--section-hdr-height);
	}
	header h1 {
		margin: 0;
		padding: var(--section-hdr-padding);
		height: var(--section-hdr-height);
		line-height: var(--section-hdr-height);
		font-size: calc(
			var(--section-hdr-height) / 2
		); /* Some healthy padding, could vary if really needed */
		vertical-align: middle;
	}
	.collapsed {
		display: none;
	}
</style>
