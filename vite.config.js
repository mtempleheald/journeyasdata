import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		coverage: {
			provider: 'v8'
		},
		environment: 'jsdom',
		globals: true,
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	csp: {
		directives: {
			'script-src': ['self']
		},
		reportOnly: {
			'script-src': ['self']
		}
	}
};

export default config;
