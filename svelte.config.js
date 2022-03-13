import preprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// https://github.com/sveltejs/svelte-preprocess
	preprocess: preprocess(),
	kit: {
		adapter: node(),
		vite: {
			test: {
				environment: 'jsdom',
				globals: true
			}
		}
	}
};

export default config;
