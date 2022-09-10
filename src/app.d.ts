/// <reference types="@sveltejs/kit" />

// Sveltekit type docs https://kit.svelte.dev/docs/types#app
// Importing types discussion https://github.com/sveltejs/kit/discussions/3772#discussioncomment-2131563

import * as _stores from '$lib/types/stores';

declare global {
	namespace App {
		interface Locals {
			userid: string;
		}

		// interface PageData {}

		// interface PageError {}

		// interface Platform {}
	}

	// State is expected to be used frequently across the application, remove the need for references
	type StateStoreType = _stores.StateStoreType;
	type StateValueType = _stores.StateValueType;
}

// TODO: Add whatever is needed to facilitate authentication and authorisation
//       An admin user can login on /admin/login, this should set a secure cookie
//       Handle hook should verify every request to /admin/... to check that this session is still valid
