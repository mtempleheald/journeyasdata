<header>
	<h1>Journey Management</h1>
</header>

<nav>
	<ul>
		<li><a href="/admin/preview">Preview components</a></li>
		<li><a href="/admin/builder">Build a journey</a></li>
	</ul>
</nav>

<slot />

<style>
	:global(body) {
		margin: 0;
	}
	header {
		width: 100%;
		background-color: lightgrey;
		margin: 0;
		padding: 0;
		display: flex;
	}
	header > * {
		flex-grow: 1;
	}
	h1 {
		margin: 0;
		padding: 1rem;
	}
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
