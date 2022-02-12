<script lang="ts">
    import type { JourneyType } from '$lib/types/journey';
import { tick } from 'svelte';
	
    let journey: JourneyType = {
        title: "sample",
        pages: [],
        footercontent: "test"
    };
    function journey_add_page(event) {
        console.debug("journey_add_page", event.target);
        // note that .push() doesn't trigger reactivity, need to reassign the entire journey
        journey.pages = [...journey.pages, {
            url: "/sample",
            title: "sample",
            sections: []
        }];

    }
    function page_remove(pageUrl) {
        console.debug("page_remove", pageUrl);
        journey.pages = journey.pages.filter((p) => p.url != pageUrl);
    }
    function page_move_up(pageUrl) {
        console.debug("page_move_up", pageUrl);
    }
    function page_move_down(pageUrl) {
        console.debug("page_move_down", pageUrl);
    }
    function page_add_section(pageUrl) {
        console.debug("page_add_section", pageUrl);
        journey.pages.filter((p) => p != pageUrl)[0].sections = [...journey.pages.filter((p) => p != pageUrl)[0].sections, {
            type: "section",
            components: []
        }]
        // reassign to trigger reactivity
        journey = journey
    }
    function section_remove(event) {
        console.debug("section_remove", event);
    }
    function section_move_up(event) {
        console.debug("section_move_up", event);
    }
    function section_move_down(event) {
        console.debug("section_move_down", event);
    }
    function section_add_section(event) {
        console.debug("section_add_section", event);
    }
    function section_add_component(event) {
        console.debug("section_add_component", event);
    }
    function component_remove(event) {
        console.debug("component_remove", event);
    }
    function component_move_up(event) {
        console.debug("component_move_up", event);
    }
    function component_move_down(event) {
        console.debug("component_move_down", event);
    }

</script>


<section id="builder">

    <h2>Journey Builder</h2>

    <div class="journey">
        <h3>Journey</h3>
        <label for="journey_title">Title</label>
        <input id="journey_title" type="text" bind:value="{journey.title}">
        <label for="journey_logo">Logo</label>
        <input id="journey_logo" type="url" bind:value="{journey.logo}">

        {#each journey.pages as page}
        <div class="page">
            <h3>Page</h3>
            <label for="page_url">Url</label>
            <input id="page_url" type="text" bind:value="{page.url}">
            <label for="page_title">Title</label>
            <input id="page_title" type="text" bind:value="{page.title}">
            <label for="page_id">Id</label>
            <input id="page_id" type="text" bind:value="{page.id}">

            <div class="navigation">
                <h3>Navigation</h3>                
                <label for="page_include">Include in main journey</label>
                <select id="page_include">
                    <option value="true" selected>Yes</option>
                    <option value="false">No</option>
                </select>
                <label for="page_next_label">Next button label</label>
                <input id="page_next_label" type="text">
            </div>

            {#each page.sections as section}
            <div class="section">
                <h3>Section</h3>
                <label for="section_type">Section Type</label>
                <select id="section_type" bind:value="{section.type}">
                    <option value="section" selected>Normal</option>
                    <option value="repeatinggroup">Repeating</option>
                </select>

                <div class="component">
                    <h2>Component</h2>

                    <label for="component_id">Id</label>
                    <input id="component_id" type="text">

                    <button type="button" on:click="{component_remove}">Remove component</button>
                    <button type="button" on:click="{component_move_up}">Move component up</button>
                    <button type="button" on:click="{component_move_down}">Move component down</button>
                </div>

                <button type="button" on:click="{section_remove}">Remove Section</button>
                <button type="button" on:click="{section_move_up}">Move Section up</button>
                <button type="button" on:click="{section_move_down}">Move Section down</button>
                <button type="button" on:click="{section_add_section}">Add Section</button>
                <button type="button" on:click="{section_add_component}">Add Page</button>
            </div>
            {/each}

            <button type="button" on:click="{() => {page_remove(page.url)}}">Remove Page</button>
            <button type="button" on:click="{() => {page_move_up(page.url)}}">Move Page up</button>
            <button type="button" on:click="{() => {page_move_down(page.url)}}">Move Page down</button>
            <button type="button" on:click="{() => {page_add_section(page.url)}}">Add Section</button>
        </div>
        
        {/each}

        <button id="journey_add_page" type="button" on:click="{journey_add_page}">Add Page</button>

    </div>


</section>

<section id="preview">
    <h2>Generated Journey</h2>
    <pre>{JSON.stringify(journey)}</pre>
</section>


<style>
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
    .component {
        background-color: lightcyan;
    }

</style>