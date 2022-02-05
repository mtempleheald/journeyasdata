// TODO: Revisit authentication using template app https://github.com/sveltejs/kit/blob/master/packages/create-svelte/templates/default/src/hooks.ts

import { parse } from 'cookie';
//import {verify} from 'jsonwebtoken'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const cookies = parse(event.request.headers.get('cookie') || '');
	// jwt cookie was set on login, verify this on every subsequent request
	try {
		// TODO: rework this properly, helpful info https://blog.satyam.life/blog/svelte-kit-jwt-auth & https://kit.svelte.dev/docs#hooks-handle
		// for now jwt = base64 encoded { username: <username>, password: <password> }
		const x = JSON.parse(cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8'));
		event.locals.user = { username: x.username };
	} catch (err) {
		event.locals.user = undefined;
	}
	const response = await resolve(event);
	return response;
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
	return event.locals.user
		? {
				user: {
					username: event.locals.user.username
				}
		  }
		: {};
}
