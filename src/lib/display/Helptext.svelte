<script>
    export let title = '';
    export let content = '';
    export let iconimg = '';
    export let icontext = 'need help?';
    let hidden = true;

    function toggle(event) {
        hidden = !hidden;
    }
</script>


<button type="button" class="helpicon" on:click="{toggle}">
    {#if !!iconimg}
        <img src="iconimg" alt="help text icon">
    {:else if !!icontext}
        {icontext}
    {/if}
</button>
<div class="help {hidden?'hidden':''}">
    <h1>{title}</h1>
    <div>{content}</div>
    <slot></slot>
</div>


<style>
.helpicon {
    border: 1px solid black;
    padding: 0.5rem;
}
.help {
    background-color: var(--help-bg, inherit);
    color: var(--help-txt, inherit);
    border: var(--help-border, 1px dashed black);
}
.help.hidden {
    display: none;
}

</style>