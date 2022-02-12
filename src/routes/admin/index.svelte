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
</script>


<h2>Admin portal</h2>
<p>Congratulations on your privileged access {user.username}, what would you like to do now?</p>

<ul>
	<li><a href="/admin/preview">Preview components</a></li>
	<li><a href="/admin/builder">Build a journey</a></li>
</ul>

<style>
	ul {
		list-style: none;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
	a:hover {
		text-decoration: underline;
	}
</style>