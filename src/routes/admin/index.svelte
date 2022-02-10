<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ session }) {
		const { user } = session;

		// TODO: Move this to Handle hook for all /admin/... paths
		if (!user) {
			return {
				status: 302,
				redirect: '/admin/login'
			};
		}

		return {
			props: { user }
		};
	}
</script>

<script lang="ts">
	export let user;
	
	import type { ComponentType, OptionComponent } from '$lib/types/journey';
	import { valueStore } from '$lib/stores/valuestore';
	import Address from '$lib/components/Address.svelte';
	import DisplayBlock from '$lib/components/DisplayBlock.svelte';
	import DisplayModal from '$lib/components/DisplayModal.svelte';
	import DisplaySelections from '$lib/components/DisplaySelections.svelte';
	import InputTextbox from '$lib/components/InputTextbox.svelte';
	import markdown from '$lib/utils/markdown';
	import OptionButtons from '$lib/components/OptionButtons.svelte';
	import OptionDropdown from '$lib/components/OptionDropdown.svelte';
	import InputTriboxdate from '$lib/components/InputTriboxdate.svelte';
	import Vehicle from '$lib/components/Vehicle.svelte';

	let component: ComponentType = {
		type: "Unknown",
		id: ""
	};
	async function toListComponent(component: ComponentType): Promise<OptionComponent> {
		return {
			...component,
			values: [
				{ value: 'Y', display: 'Yes' },
				{ value: 'N', display: 'No' },
				{ value: 'Other', display: 'Other' }
			]
		};
	}
</script>

<form on:submit|preventDefault>
	<OptionButtons on:valueChange={(event) => {component.type = event.detail.value}}
		component={{
			type: "OptionButtons", 
			id: "component-type", 
			label: "Type",
			values: [
				{value: 'Colour',  display: 'Colour'}, 
				{value: 'Date', display: 'Date'},
				{value: 'Datetime', display: 'Datetime'},
				{value: 'Email', display: 'Email'},
				{value: 'Month', display: 'Month'},
				{value: 'Number', display: 'Number'},
				{value: 'Range', display: 'Range'},
				{value: 'Search', display: 'Search'},
				{value: 'Telephone', display: 'Telephone'},
				{value: 'Text', display: 'Text'},
				{value: 'Time', display: 'Time'},
				{value: 'Upper', display: 'Upper'},
				{value: 'Url', display: 'Url'},
				{value: 'Week', display: 'Week'},
				{value: 'Year', display: 'Year'},
				{value: 'OptionButtons', display: 'OptionButtons'},
				{value: 'OptionDropdown', display: 'OptionDropdown'},
				{value: 'YesNo', display: 'YesNo'},
				{value: 'Displayblock', display: 'Displayblock'},
				{value: 'Displaymodal', display: 'Displaymodal'},
				{value: 'Displayselections', display: 'Displayselections'},
				{value: 'Address', display: 'Address'},
				{value: 'Vehicle', display: 'Vehicle'},
				{value: 'Triboxdate', display: 'Triboxdate'}
			] 
		}} />
	<InputTextbox on:valueChange={(event) => {component.id = event.detail.value}}
		component={{
			type: "Text",
			id: "id",
			label: "ID"
		}} />
	<InputTextbox on:valueChange={(event) => {component.label = event.detail.value}}
		component={{
			type: "Text",
			id: "label",
			label: "Label"
		}} />
	<InputTextbox on:valueChange={(event) => {component.placeholder = event.detail.value}}
		component={{
			type: "Text",
			id: "placeholder",
			label: "Placeholder"
		}} />
	<InputTextbox on:valueChange={(event) => {component.pre = event.detail.value}}
		component={{
			type: "Text",
			id: "pre",
			label: "Pre-text"
		}} />
	<InputTextbox on:valueChange={(event) => {component.post = event.detail.value}}
		component={{
			type: "Text",
			id: "post",
			label: "Post-text"
		}} />
</form>

<section>
	<h2>Preview</h2>

{#key component}
{#if ['Colour', 'Date', 'Datetime', 'Email', 'Month', 'Number', 'Range', 'Search', 'Telephone', 'Text', 'Time', 'Upper', 'Url', 'Week', 'Year'].includes(component.type)}
	<svelte:component
		this={InputTextbox}
		component={component}
	>
		<svelte:fragment slot="pre">
			{@html markdown(component.pre)}
		</svelte:fragment>
		<svelte:fragment slot="post">
			{@html markdown(component.post)}
		</svelte:fragment>
	</svelte:component>
{:else if ['OptionButtons', 'OptionDropdown', 'YesNo'].includes(component.type)}
	{#await toListComponent(component)}
		<!-- looking up refdata (maybe) -->
	{:then comp}
		<svelte:component
			this={{
				OptionButtons: OptionButtons,
				OptionDropdown: OptionDropdown,
				YesNo: OptionButtons
			}[component.type]}
			component={comp}
		>
			<svelte:fragment slot="pre">
				{@html markdown(comp.pre, )}
			</svelte:fragment>
			<svelte:fragment slot="post">
				{@html markdown(comp.post, )}
			</svelte:fragment>
		</svelte:component>
	{/await}
{:else if component.type == 'Displayblock' || component.type == 'Displaymodal'}
	<svelte:component
		this={{
			Displayblock: DisplayBlock,
			Displaymodal: DisplayModal
		}[component.type]}
		component={{
			...component,
			content: Array.isArray(component.content)
				? component.content.map((c) => markdown(c, ))
				: markdown(component.content, )
		}}
	>
		<svelte:fragment slot="pre">
			{@html markdown(component.pre, )}
		</svelte:fragment>
		<svelte:fragment slot="post">
			{@html markdown(component.post, )}
		</svelte:fragment>
	</svelte:component>
{:else if component.type == 'Displayselections'}
	<DisplaySelections {component}>
		<svelte:fragment slot="pre">
			{@html markdown(component.pre, )}
		</svelte:fragment>
		<svelte:fragment slot="main">
			{@html markdown(component.content, )}
		</svelte:fragment>
		<svelte:fragment slot="post">
			{@html markdown(component.post, )}
		</svelte:fragment>
	</DisplaySelections>
{:else if component.type == 'Address'}
	<Address {component} />
{:else if component.type == 'TriBoxDate'}
	<InputTriboxdate
		component={{ ...component, value: $valueStore[component.id] ?? '' }}
	/>
{:else if component.type == 'Vehicle'}
	<Vehicle {component} />
{/if}
{/key}
</section>

<style>
	section {
		padding: 2rem;
	}
	form {		
		padding: 2rem;
	}
</style>