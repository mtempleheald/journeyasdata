/// <reference types="@sveltejs/kit" />

// Sveltekit typeScript docs https://kit.svelte.dev/docs/typescript
// Importing types discussion https://github.com/sveltejs/kit/discussions/3772#discussioncomment-2131563

import * as _journey from '$lib/types/journey';

declare global {
	declare namespace App {
		interface Locals {
			userid: string;
		}

		//interface Platform {}

		//interface Session {}

		//interface Stuff {}
	}

	// State is expected to be used frequently across the application, remove the need for references
	type StateStoreType = _journey.StateStoreType;
}

// TODO: Add whatever is needed to facilitate authentication and authorisation
//       An admin user can login on /admin/login, this should set a secure cookie
//       Handle hook should verify every request to /admin/... to check that this session is still valid
