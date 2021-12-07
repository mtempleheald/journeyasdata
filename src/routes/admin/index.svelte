<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ session }) {
		const { user } = session;

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

<script>
	export let user;
</script>

<p>
	Congratulations on your privileged access {user?.username}
</p>
