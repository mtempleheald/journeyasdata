<script lang="ts">
	import type { BaseInputComponent, ComponentType, OptionComponent } from '$lib/types/journey';
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

	let theme = 'technicaldemo';
	let component: ComponentType = {
		type: 'unknown',
		id: 'default-id',
		values: [
			{ value: 'one', display: 'one' },
			{ value: 'two', display: 'two' },
			{ value: 'three', display: 'three' }
		]
	};

	function update_label(value: string | undefined) {
		(component as BaseInputComponent).label = value;
	}
	function update_placeholder(value: string | undefined) {
		(component as BaseInputComponent).placeholder = value;
	}
	function update_value(value: string | undefined) {
		(component as BaseInputComponent).value = value;
	}
	function update_error(value: string | undefined) {
		(component as BaseInputComponent).error = value;
	}
	function update_help(value: string | undefined) {
		(component as BaseInputComponent).help = value;
	}
	function update_required(value: boolean) {
		(component as BaseInputComponent).required = value;
	}
	function update_values(value_csv: string) {
		(component as OptionComponent).values = value_csv.split(',').map((val) => {
			return {
				value: val,
				display: val
			};
		});
	}
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
				update_label(event.detail.value);
			}}
			component={{
				type: 'Text',
				id: 'label',
				label: 'Label'
			}}
		/>
		<InputTextbox
			on:valueChange={(event) => {
				update_placeholder(event.detail.value);
			}}
			component={{
				type: 'Text',
				id: 'placeholder',
				label: 'Placeholder'
			}}
		/>
		<InputTextbox
			on:valueChange={(event) => {
				update_value(event.detail.value);
			}}
			component={{
				type: 'Text',
				id: 'value',
				label: 'Default value'
			}}
		/>
		<InputTextbox
			on:valueChange={(event) => {
				update_error(event.detail.value);
			}}
			component={{
				type: 'Text',
				id: 'error',
				label: 'Error messages'
			}}
		/>
		<InputTextbox
			on:valueChange={(event) => {
				update_help(event.detail.value);
			}}
			component={{
				type: 'Text',
				id: 'help',
				label: 'Help text'
			}}
		/>
		<OptionButtons
			on:valueChange={(event) => {
				update_required(event.detail.value == 'true');
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
				update_values(event.detail.value);
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
		<!-- {#if ['Colour', 'Date', 'Datetime', 'Email', 'Month', 'Number', 'Range', 'Search', 'Telephone', 'Text', 'Time', 'Upper', 'Url', 'Week', 'Year'].includes(component.type)} -->
		{#if component.type == 'Colour' || component.type == 'Date' || component.type == 'Datetime' || component.type == 'Email' || component.type == 'Month' || component.type == 'Number' || component.type == 'Range' || component.type == 'Search' || component.type == 'Telephone' || component.type == 'Text' || component.type == 'Time' || component.type == 'Upper' || component.type == 'Url' || component.type == 'Week' || component.type == 'Year'}
			<svelte:component this={InputTextbox} {component}>
				<svelte:fragment slot="pre">
					{#if component.pre}
						{@html markdown(component.pre)}
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="post">
					{#if component.post}
						{@html markdown(component.post)}
					{/if}
				</svelte:fragment>
			</svelte:component>
			<!-- {:else if ['OptionButtons', 'OptionDropdown', 'YesNo'].includes(component.type)} -->
		{:else if component.type == 'OptionButtons' || component.type == 'OptionDropdown' || component.type == 'YesNo'}
			<svelte:component
				this={{
					OptionButtons: OptionButtons,
					OptionDropdown: OptionDropdown,
					YesNo: OptionButtons
				}[component.type]}
				{component}
			>
				<svelte:fragment slot="pre">
					{#if component.pre}
						{@html markdown(component.pre)}
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="post">
					{#if component.post}
						{@html markdown(component.post)}
					{/if}
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
					{#if component.pre}
						{@html markdown(component.pre)}
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="post">
					{#if component.post}
						{@html markdown(component.post)}
					{/if}
				</svelte:fragment>
			</svelte:component>
		{:else if component.type == 'Displayselections'}
			<DisplaySelections {component}>
				<svelte:fragment slot="pre">
					{#if component.pre}
						{@html markdown(component.pre)}
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="main">
					{#if component.content}
						{@html markdown(component.content)}
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="post">
					{#if component.post}
						{@html markdown(component.post)}
					{/if}
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
