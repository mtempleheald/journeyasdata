export type StateValueType = {
	value: string | undefined;
	display: string | undefined;
	valid: boolean | undefined;
};
export type StateStoreType =
	| { [key: string]: StateValueType }
	| Record<{ [key: string]: StateValueType }, unknown>;
