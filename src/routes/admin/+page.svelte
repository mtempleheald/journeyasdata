<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	let user;
	$: ({ user } = data);
</script>

<h2>Admin portal</h2>
<p>Congratulations on your privileged access {user.username}, what would you like to do now?</p>

<ul>
	<li><a href="/admin/preview">Preview components</a></li>
	<li><a href="/admin/builder">Build a journey</a></li>
</ul>

<style>
	li {
		list-style: none;
		padding: 0.25rem;
	}
	li::before {
		content: '\27A0';
	}
	a {
		text-decoration: none;
		color: inherit;
	}
	a:hover {
		text-decoration: underline;
	}
</style>
