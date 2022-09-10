import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	let userid = event.cookies.get('userid');

	if (!userid) {
		// set a cookie for first time users
		userid = crypto.randomUUID();
		event.cookies.set('userid', userid, { path: '/' });
	}

	event.locals.userid = userid;

	return resolve(event);
};
