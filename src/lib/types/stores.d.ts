import type { ComponentType, PageType } from './journey';

export type StateValueType = {
	value: string | undefined;
	display: string | undefined;
	valid: boolean | undefined;
};
export type StateStoreType = Record<string, never> | { [key: string]: StateValueType };

type ParameterlessAction = () => void;
type PageParameterisedAction = (page: PageType) => void;
type ComponentParameterisedAction = (component: ComponentType) => void;
export type ActionStoreType =
	| Record<string, never>
	| { [key: string]: ParameterlessAction | PageParameterisedAction | ComponentParameterisedAction };
