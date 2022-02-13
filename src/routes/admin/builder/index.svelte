<script lang="ts">
    import Section from '$lib/components/Section.svelte';
import type { JourneyType } from '$lib/types/journey';
	
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
        journey.pages.find((p) => p.url == pageUrl)
            .sections = [...journey.pages.find((p) => p.url == pageUrl).sections, {
                type: "section",
                id: "sample",
                components: [],
                sections: [] // only relevant for repeatinggroup section type but we don't know the type yet
            }];
        journey = journey; // reassign to trigger reactivity
    }
    function section_remove(sectionId) {
        console.debug("section_remove", sectionId);
    }
    function section_move_up(sectionId) {
        console.debug("section_move_up", sectionId);
    }
    function section_move_down(sectionId) {
        console.debug("section_move_down", sectionId);
    }
    function section_add_component(sectionId) {
        console.debug("section_add_component", sectionId);
        journey = {
            ...journey, 
            pages: journey.pages.map ((p) => { return {
                ...p, 
                sections: p.sections.map((s) => {
                    if (s.id != sectionId) {                        
                        return s
                    }
                    else {
                        return {
                            ...s, 
                            pages: [...s.components, {
                                type: "Unknown",
                                id: "sample"
                            }]
                        }
                    }
                })
            }})
        }
    }
    function section_add_section(sectionId) {
        console.debug("section_add_section", sectionId);
        journey = {
            ...journey, 
            pages: journey.pages.map ((p) => { return {
                ...p, 
                sections: p.sections.map((s) => {
                    if (s.id != sectionId) {                        
                        return s
                    }
                    else {
                        return {
                            ...s, 
                            sections: [...s.sections, {
                                type: "section",
                                id: "sample",
                                components: []
                            }]
                        }
                    }
                })
            }})
        }
    }
    function component_remove(component_id) {
        console.debug("component_remove", component_id);
    }
    function component_move_up(component_id) {
        console.debug("component_move_up", component_id);
    }
    function component_move_down(component_id) {
        console.debug("component_move_down", component_id);
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
            <button type="button" on:click="{() => {page_remove(page.url)}}">&#10007;</button>
            <button type="button" on:click="{() => {page_move_up(page.url)}}">&#8593;</button>
            <button type="button" on:click="{() => {page_move_down(page.url)}}">&#8595;</button>
            <br/>

            <label for="page_url">Url</label>
            <input id="page_url" type="text" bind:value="{page.url}">
            <label for="page_title">Title</label>
            <input id="page_title" type="text" bind:value="{page.title}">
            <label for="page_id">Id</label>
            <input id="page_id" type="text" bind:value="{page.id}">

            <div class="navigation">
                <h3>Navigation</h3>
                <br/>
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
                <button type="button" on:click="{() => {section_remove(section.id)}}">&#10007;</button>
                <button type="button" on:click="{() => {section_move_up(section.id)}}">&#8593;</button>
                <button type="button" on:click="{() => {section_move_down(section.id)}}">&#8595;</button>                
                <br/>

                <label for="section_type">Section Type</label>
                <select id="section_type" bind:value="{section.type}">
                    <option value="section" selected>Normal</option>
                    <option value="repeatinggroup">Repeating</option>
                </select>
                <label for="section_id">Id</label>
                <input id="section_id" type="text" bind:value="{section.id}">
                
                {#if section.type == "repeatinggroup"}

                {#each section.sections as subsection}
                <div class="subsection">
                    <h3>Section</h3>
                    <label for="section_id">Id</label>
                    <input id="section_id" type="text" bind:value="{subsection.id}">

                    <br/>
                    <button type="button" on:click="{() => {section_add_component(subsection.id)}}">Add component</button>                        
                </div>                    
                {/each}
                <br/>
                <button type="button" on:click="{() => {section_add_section(section.id)}}">Add subsection</button>
                
                {:else}

                {#each section.components as component}
                <div class="component">
                    <h2>Component</h2>
                    <button type="button" on:click="{() => component_remove(component.id)}">{#each section.components as component}
                <div class="component">
                    <h2>Component</h2>
                    <button type="button" on:click="{() => component_remove(component.id)}">{#each section.components as component}
                <div class="component">
                    <h2>Component</h2>
                    <button type="button" on:click="{() => component_remove(component.id)}">&#10007;</button>
                    <button type="button" on:click="{() => component_move_up(component.id)}">&#8593;</button>
                    <button type="button" on:click="{() => component_move_down(component.id)}">&#8595;</button>
                    <br/>

                    <label for="component_id">Id</label>
                    <input id="component_id" type="text" bind:value="{component.id}">
                   
                </div>
                {/each}</button>
                    <button type="button" on:click="{() => component_move_up(component.id)}">&#8593;</button>
                    <button type="button" on:click="{() => component_move_down(component.id)}">&#8595;</button>
                    <br/>

                    <label for="component_id">Id</label>
                    <input id="component_id" type="text" bind:value="{component.id}">
                   
                </div>
                {/each}</button>
                    <button type="button" on:click="{() => component_move_up(component.id)}">&#8593;</button>
                    <button type="button" on:click="{() => component_move_down(component.id)}">&#8595;</button>
                    <br/>

                    <label for="component_id">Id</label>
                    <input id="component_id" type="text" bind:value="{component.id}">
                
                </div>                
                {/each}

                <br/>
                <button type="button" on:click="{() => {section_add_component(section.id)}}">Add component</button>

                {/if}
            </div>
            {/each}

            <br/>
            <button type="button" on:click="{() => {page_add_section(page.url)}}">Add section</button>
        </div>
        
        {/each}
        <br/>
        <button id="journey_add_page" type="button" on:click="{journey_add_page}">Add page</button>

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