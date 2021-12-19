<script lang="ts">
	let hidden = true;

	function toggle(_event: any) {
		hidden = !hidden;
	}
</script>

<button type="button" on:click={toggle}>
	<slot name="button">help</slot>
</button>
<div class="help {hidden ? 'hidden' : ''}">
	<slot />
</div>

<style>
	.help {
		background-color: var(--help-bg);
		color: var(--help-txt);
		border: var(--help-border);
	}
	.help.hidden {
		display: none;
	}
</style>
