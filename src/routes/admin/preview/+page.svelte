<script lang="ts">
	import type { ComponentType } from '$lib/types/journey';
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

	let theme: string;
	let component: ComponentType = {
		type: 'Unknown',
		id: 'default-id',
		values: [
			{ value: 'one', display: 'one' },
			{ value: 'two', display: 'two' },
			{ value: 'three', display: 'three' }
		]
	};
</script>

<svelte:head>
	{#key theme}
		<link rel="stylesheet" href={`../${theme}/theme.css`} />
	{/key}
</svelte:head>

<section>
	<h2>Component Builder</h2>

	<form on:submit|preventDefault>
		<OptionButtons
			on:valueChange={(event) => {
				theme = event.detail.value;
			}}
			component={{
				type: 'OptionButtons',
				id: 'theme',
				label: 'Theme',
				values: [
					{ value: 'technicaldemo', display: 'Technical Demo' },
					{ value: 'dangertentinsurance', display: 'Danger Tent Insurance' }
				]
			}}
		/>
		<InputTextbox
			on:valueChange={(event) => {
				component.id = event.detail.value;
			}}
			component={{
				type: 'Text',
				id: 'id',
				label: 'Id',
				value: component.id,
				required: true,
				help: 'id is required to render most components'
			}}
		/>
		<OptionButtons
			on:valueChange={(event) => {
				component.type = event.detail.value;
			}}
			component={{
				type: 'OptionButtons',
				id: 'component-type',
				label: 'Component Type',
				values: [
					{ value: 'Text', display: 'Text' },
					{ value: 'Colour', display: 'Colour' },
					{ value: 'Date', display: 'Date' },
					{ value: 'Datetime', display: 'Datetime' },
					{ value: 'Email', display: 'Email' },
					{ value: 'Month', display: 'Month' },
					{ value: 'Number', display: 'Number' },
					{ value: 'Range', display: 'Range' },
					{ value: 'Search', display: 'Search' },
					{ value: 'Telephone', display: 'Telephone' },
					{ value: 'Time', display: 'Time' },
					{ value: 'Upper', display: 'Upper' },
					{ value: 'Url', display: 'Url' },
					{ value: 'Week', display: 'Week' },
					{ value: 'Year', display: 'Year' },
					{ value: 'OptionButtons', display: 'OptionButtons' },
					{ value: 'OptionDropdown', display: 'OptionDropdown' },
					{ value: 'YesNo', display: 'YesNo' },
					{ value: 'Displayblock', display: 'Displayblock' },
					{ value: 'Displaymodal', display: 'Displaymodal' },
					{ value: 'Displayselections', display: 'Displayselections' },
					{ value: 'Address', display: 'Address' },
					{ value: 'Vehicle', display: 'Vehicle' },
					{ value: 'Triboxdate', display: 'Triboxdate' }
				]
			}}
		/>
		<InputTextbox
			on:valueChange={(event) => {
				component.label = event.detail.value;
			}}
			component={{
				type: 'Text',
				id: 'label',
				label: 'Label'
			}}
		/>
		<InputTextbox
			on:valueChange={(event) => {
				component.placeholder = event.detail.value;
			}}
			component={{
				type: 'Text',
				id: 'placeholder',
				label: 'Placeholder'
			}}
		/>
		<InputTextbox
			on:valueChange={(event) => {
				component.value = event.detail.value;
			}}
			component={{
				type: 'Text',
				id: 'value',
				label: 'Default value'
			}}
		/>
		<InputTextbox
			on:valueChange={(event) => {
				component.error = event.detail.value;
			}}
			component={{
				type: 'Text',
				id: 'errorMessage',
				label: 'Error messages'
			}}
		/>
		<InputTextbox
			on:valueChange={(event) => {
				component.help = event.detail.value;
			}}
			component={{
				type: 'Text',
				id: 'help',
				label: 'Help text'
			}}
		/>
		<OptionButtons
			on:valueChange={(event) => {
				component.required = event.detail.value == 'true';
			}}
			component={{
				type: 'OptionButtons',
				id: 'required',
				label: 'Required?',
				values: [
					{ value: 'true', display: 'True' },
					{ value: 'false', display: 'False' }
				]
			}}
		/>
		<InputTextbox
			on:valueChange={(event) => {
				component.values = event.detail.value.split(',').map((val) => {
					const obj = {};
					obj['value'] = val;
					obj['display'] = val;
					return obj;
				});
			}}
			component={{
				type: 'Text',
				id: 'values',
				label: 'Values',
				value: 'one,two,three'
			}}
		/>
		<InputTextbox
			on:valueChange={(event) => {
				component.pre = event.detail.value;
			}}
			component={{
				type: 'Text',
				id: 'pre',
				label: 'Pre-text'
			}}
		/>
		<InputTextbox
			on:valueChange={(event) => {
				component.post = event.detail.value;
			}}
			component={{
				type: 'Text',
				id: 'post',
				label: 'Post-text'
			}}
		/>
	</form>
</section>

<section>
	<h2>Preview</h2>

	{#key component}
		{#if ['Colour', 'Date', 'Datetime', 'Email', 'Month', 'Number', 'Range', 'Search', 'Telephone', 'Text', 'Time', 'Upper', 'Url', 'Week', 'Year'].includes(component.type)}
			<svelte:component this={InputTextbox} {component}>
				<svelte:fragment slot="pre">
					{@html markdown(component.pre)}
				</svelte:fragment>
				<svelte:fragment slot="post">
					{@html markdown(component.post)}
				</svelte:fragment>
			</svelte:component>
		{:else if ['OptionButtons', 'OptionDropdown', 'YesNo'].includes(component.type)}
			<svelte:component
				this={{
					OptionButtons: OptionButtons,
					OptionDropdown: OptionDropdown,
					YesNo: OptionButtons
				}[component.type]}
				{component}
			>
				<svelte:fragment slot="pre">
					{@html markdown(component.pre)}
				</svelte:fragment>
				<svelte:fragment slot="post">
					{@html markdown(component.post)}
				</svelte:fragment>
			</svelte:component>
		{:else if component.type == 'Displayblock' || component.type == 'Displaymodal'}
			<svelte:component
				this={{
					Displayblock: DisplayBlock,
					Displaymodal: DisplayModal
				}[component.type]}
				component={{
					...component,
					content: Array.isArray(component.content)
						? component.content.map((c) => markdown(c))
						: markdown(component.content)
				}}
			>
				<svelte:fragment slot="pre">
					{@html markdown(component.pre)}
				</svelte:fragment>
				<svelte:fragment slot="post">
					{@html markdown(component.post)}
				</svelte:fragment>
			</svelte:component>
		{:else if component.type == 'Displayselections'}
			<DisplaySelections {component}>
				<svelte:fragment slot="pre">
					{@html markdown(component.pre)}
				</svelte:fragment>
				<svelte:fragment slot="main">
					{@html markdown(component.content)}
				</svelte:fragment>
				<svelte:fragment slot="post">
					{@html markdown(component.post)}
				</svelte:fragment>
			</DisplaySelections>
		{:else if component.type == 'Address'}
			<Address {component} />
		{:else if component.type == 'TriBoxDate'}
			<InputTriboxdate {component} />
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
