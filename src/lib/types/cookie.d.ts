// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
export type CookieType = {
	name: string;
	value: string;
	//expires?: Date;
	maxAge?: number;
	//domain?: string;
	//path?: string;
	secure?: boolean;
	httpOnly?: boolean;
	//sameSite?: 'Strict' | 'Lax' | 'None'
};
