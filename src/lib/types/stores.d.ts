import type { PageType } from './journey';

export type StateValueType = {
	value: string | undefined;
	display: string | undefined;
	valid: boolean | undefined;
};
export type StateStoreType = { [key: string]: StateValueType };

type ParameterlessAction = () => void;
type PageParameterisedAction = (page: PageType) => void;
export type ActionStoreType = {
	[key: string]: ParameterlessAction | PageParameterisedAction;
};
