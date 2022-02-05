/// <reference types="@sveltejs/kit" />

// https://kit.svelte.dev/docs#typescript
declare namespace App {
	interface Locals {
		userid: string;
	}

	interface Platform {}

	interface Session {}

	interface Stuff {}
}

// TODO: Add whatever is needed to facilitate authentication and authorisation
//       An admin user can login on /admin/login, this should set a secure cookie
//       Handle hook should verify every request to /admin/... to check that this session is still valid
