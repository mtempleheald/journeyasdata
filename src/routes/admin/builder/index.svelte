<script lang="ts">
	import type { JourneyType } from '$lib/types/journey';

	export let journey: JourneyType = {
		title: 'sample',
		pages: [],
		footercontent: 'test'
	};
	function journey_add_page() {
		console.debug('journey_add_page');
		// note that .push() doesn't trigger reactivity, need to reassign the entire journey
		journey.pages = [
			...journey.pages,
			{
				url: '/sample',
				title: 'sample',
				sections: []
			}
		];
	}
	function page_remove(page_url: string) {
		console.debug('page_remove', page_url);
		journey.pages = journey.pages.filter((p) => p.url != page_url);
	}
	function page_move_up(page_url: string) {
		console.debug('page_move_up', page_url);
	}
	function page_move_down(page_url: string) {
		console.debug('page_move_down', page_url);
	}
	function page_add_section(page_url: string) {
		console.debug('page_add_section', page_url);
		journey.pages.find((p) => p.url == page_url).sections = [
			...journey.pages.find((p) => p.url == page_url).sections,
			{
				type: 'section',
				id: 'sample',
				components: []
			}
		];
		journey = journey; // reassign to trigger reactivity
	}
	function section_remove(section_id: string) {
		console.debug('section_remove', section_id);
		journey = {
			...journey,
			pages: journey.pages.map((p) => {
				return {
					...p,
					sections: p.sections.filter((s) => s.id != section_id)
				};
			})
		};
	}
	function section_move_up(section_id: string) {
		console.debug('section_move_up', section_id);
	}
	function section_move_down(section_id: string) {
		console.debug('section_move_down', section_id);
	}
	function section_add_component(section_id: string) {
		console.debug('section_add_component', section_id);
		journey = {
			...journey,
			pages: journey.pages.map((p) => {
				return {
					...p,
					sections: p.sections.map((s) => {
						if (s.id != section_id || s.type == 'repeatinggroup') {
							return s;
						} else {
							return {
								...s,
								components: [
									...s.components,
									{
										type: 'Unknown',
										id: 'sample'
									}
								]
							};
						}
					})
				};
			})
		};
	}
	function section_add_section(section_id: string) {
		console.debug('section_add_section', section_id);
		journey = {
			...journey,
			pages: journey.pages.map((p) => {
				return {
					...p,
					sections: p.sections.map((s) => {
						if (s.id != section_id || s.type != 'repeatinggroup') {
							return s;
						} else {
							return {
								...s,
								sections: [
									...(s.sections ?? []),
									{
										type: 'section',
										id: 'sample',
										components: []
									}
								]
							};
						}
					})
				};
			})
		};
	}
	function subsection_add_component(section_id: string) {
		console.debug('section_add_component', section_id);
		journey = {
			...journey,
			pages: journey.pages.map((p) => {
				return {
					...p,
					sections: p.sections.map((s) => {
						return s; // TODO
					})
				};
			})
		};
	}
	function component_remove(component_id: string) {
		console.debug('component_remove', component_id);
	}
	function component_move_up(component_id: string) {
		console.debug('component_move_up', component_id);
	}
	function component_move_down(component_id: string) {
		console.debug('component_move_down', component_id);
	}
</script>

<section id="builder">
	<h2>Journey Builder</h2>

	<div class="journey">
		<h3>Journey</h3>
		<label for="journey_title">Title</label>
		<input id="journey_title" type="text" bind:value={journey.title} />
		<label for="journey_logo">Logo</label>
		<input id="journey_logo" type="url" bind:value={journey.logo} />

		{#each journey.pages as page}
			<div class="page">
				<h3>Page</h3>
				<button
					type="button"
					on:click={() => {
						page_remove(page.url);
					}}>&#10007;</button
				>
				<button
					type="button"
					on:click={() => {
						page_move_up(page.url);
					}}>&#8593;</button
				>
				<button
					type="button"
					on:click={() => {
						page_move_down(page.url);
					}}>&#8595;</button
				>
				<br />

				<label for="page_url">Url</label>
				<input id="page_url" type="text" bind:value={page.url} />
				<label for="page_title">Title</label>
				<input id="page_title" type="text" bind:value={page.title} />
				<label for="page_id">Id</label>
				<input id="page_id" type="text" bind:value={page.id} />

				<div class="navigation">
					<h3>Navigation</h3>
					<br />
					<label for="page_include">Include in main journey</label>
					<select id="page_include">
						<option value="true" selected>Yes</option>
						<option value="false">No</option>
					</select>
					<label for="page_next_label">Next button label</label>
					<input id="page_next_label" type="text" />
				</div>

				{#each page.sections as section}
					<div class="section">
						<h3>Section</h3>
						<button
							type="button"
							on:click={() => {
								section_remove(section.id);
							}}>&#10007;</button
						>
						<button
							type="button"
							on:click={() => {
								section_move_up(section.id);
							}}>&#8593;</button
						>
						<button
							type="button"
							on:click={() => {
								section_move_down(section.id);
							}}>&#8595;</button
						>
						<br />

						<label for="section_type">Section Type</label>
						<select id="section_type" bind:value={section.type}>
							<option value="section" selected>Normal</option>
							<option value="repeatinggroup">Repeating</option>
						</select>
						<label for="section_id">Id</label>
						<input id="section_id" type="text" bind:value={section.id} />

						{#if section.type == 'repeatinggroup'}
							{#if section.sections}
								{#each section.sections as subsection}
									<div class="subsection">
										<h3>Section</h3>
										<label for="section_id">Id</label>
										<input id="section_id" type="text" bind:value={subsection.id} />

										<br />
										<button
											type="button"
											on:click={() => {
												subsection_add_component(subsection.id);
											}}>Add component</button
										>
									</div>
								{/each}<!-- section.sections as subsection -->
							{/if}

							<br />
							<button
								type="button"
								on:click={() => {
									section_add_section(section.id);
								}}>Add subsection</button
							>
						{:else}
							{#each section.components as component}
								<div class="component">
									<h2>Component</h2>
									<button
										type="button"
										on:click={() => {
											component_remove(component.id);
										}}>&#10007;</button
									>
									<button
										type="button"
										on:click={() => {
											component_move_up(component.id);
										}}>&#8593;</button
									>
									<button
										type="button"
										on:click={() => {
											component_move_down(component.id);
										}}>&#8595;</button
									>
									<br />

									<label for="component_id">Id</label>
									<input id="component_id" type="text" bind:value={component.id} />
								</div>
							{/each}<!-- section.components as component -->

							<br />
							<button type="button" on:click={() => section_add_component(section.id)}
								>Add component</button
							>
						{/if}
					</div>
				{/each}<!-- page.sections as section -->

				<br />
				<button
					type="button"
					on:click={() => {
						page_add_section(page.url);
					}}>Add section</button
				>
			</div>
		{/each}<!-- journey.pages as page -->
		<br />
		<button id="journey_add_page" type="button" on:click={journey_add_page}>Add page</button>
	</div>
</section>

<section id="preview">
	<h2>Generated Journey</h2>
	<pre>{JSON.stringify(journey)}</pre>
</section>

<style>
	h3 {
		display: inline-block;
	}
	div {
		border: 1px solid black;
		margin: 0.25rem;
		padding: 0.25rem;
	}
	.journey {
		background-color: azure;
	}
	.page {
		background-color: bisque;
	}
	.navigation {
		background-color: aliceblue;
	}
	.section {
		background-color: palegoldenrod;
	}
	.subsection {
		background-color: aquamarine;
	}
	.component {
		background-color: lightcyan;
	}
</style>
