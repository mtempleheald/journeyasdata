// TODO: make these types global in app.d.ts
export type JourneyType = {
	title: string;
	pages: PageType[];
	logo?: ImageType;
	cookiepreferences?: CookiePreferenceType;
	footercontent: string | string[];
};
export type NavigationOptionsType = {
	includeinjourney?: boolean; // default true, disable if needed e.g. remove error pages from main journey flow
	showback?: boolean; // default true
	backlabel?: string; // default "Back"
	shownext?: boolean; // default true
	nextlabel?: string; // default "Next"
};
export type PageType = {
	id?: string; // exclusively for triggering bespoke actions, dev-maintained
	url: string;
	title: string;
	displaytitle?: boolean;
	displayprogress?: boolean;
	sections: (SectionType | RepeatingGroupType)[];
	navigation?: NavigationOptionsType;
	showtopnav?: boolean; // default false, also show nav buttons at the top
};
// A repeating group has no presentation elements of its own, it simply wraps one or more sections
export type RepeatingGroupType = {
	type: 'repeatinggroup';
	id?: string; // exclusively for triggering bespoke actions, dev-maintained
	sections: SectionType[];
	summarycontent: string | string[];
	minrepeats?: number;
	maxrepeats?: number;
	labeladd?: string;
	labeledit?: string;
	labelremove?: string;
};
export type SectionType = {
	type?: 'section'; // section is default if excluded
	id?: string; // exclusively for triggering bespoke actions, dev-maintained
	instanceid?: number; // used only when section is contained within a repeating group
	title?: string;
	logo?: ImageType;
	maxrepeats?: number;
	collapsible?: boolean;
	components: ComponentType[];
	navigation?: NavigationOptionsType;
};

// Currently just a cut down OptionButtons component, this may change
export type CookiePreferenceType = {
	pre?: string;
	post?: string;
	values?: ValueType[];
};

// ValueType is typically used for Option components
export type ValueType = {
	value: string;
	display: string;
	icon?: string; // TODO: Replaces image - this will refer to a CSS class defined in the theme
	image?: ImageType; // TODO: Consider replacing this with an identifier for an image rather than a url - let styling handle how this is included (e.g. font icons)
	textLocation?: string; // TODO: Consider removing this, it is not intuitive and belongs in styling
};

// Use "type" property to select from this discriminated union
export type ComponentType =
	| Unknown // Used by admin pages when prototyping
	| AddressComponent
	| DisplayComponent
	| DisplaySelections
	| InputComponent
	| OptionComponent
	| TriBoxDateComponent
	| VehicleComponent;

// Every component must have a type or we have no way to render it
interface BaseComponent {
	pre?: string;
	post?: string;
	dependsupon?: {
		id: string;
		value: string;
	};
}

// Input components must have an identity for their value to be useful
export interface InputComponent extends BaseComponent {
	type:
		| 'Colour'
		| 'Date'
		| 'Datetime'
		| 'Email'
		| 'Month'
		| 'Number'
		| 'Range'
		| 'Search'
		| 'Telephone'
		| 'Text'
		| 'Time'
		| 'Upper'
		| 'Url'
		| 'Week'
		| 'Year';
	id: string; // id must not contain a . (full stop) - this is reserved for components within repeating groups
	label?: string;
	required?: boolean;
	placeholder?: string;
	value?: string;
	errorMessage?: string;
	help?: string;
}
// Composite component, an alternative to "Date"
export interface TriBoxDateComponent extends BaseComponent, InputComponent {
	type: 'TriBoxDate';
	separator?: string;
	resetLabel: string;
	displayFormat: 'full' | 'long' | 'medium' | 'short';
	validation?: {
		min?: string; // YYYY-MM-DD
		max?: string; // YYYY-MM-DD
		minyearsago?: number;
		maxyearsago?: number;
		minyearsahead?: number;
		maxyearsahead?: number;
	};
}
// Option components require a source list of options to render, which may cascade hierarchically
export interface OptionComponent extends BaseComponent, InputComponent {
	type: 'OptionButtons' | 'OptionDropdown' | 'YesNo';
	values?: ValueType[];
	refdata?: string;
	refdataparent?: string;
}

// Display components' main purpose is content display, this field is mandatory
export interface DisplayComponent extends BaseComponent {
	type: 'Displayblock' | 'Displaymodal';
	id?: string; // included to remove TS warnings only
	content: string | string[]; // allow multiple columns by passing multiple content blocks
	collapsible?: boolean;
}
// selected/unselected items is more important than content for this component
export interface DisplaySelections extends BaseComponent {
	type: 'Displayselections';
	id?: string; // included to remove TS warnings only
	selectedtitle?: string;
	unselectedtitle?: string;
	content?: string;
	items: {
		title: string;
		selected: boolean;
		detail?: string;
	}[];
}

// TODO: Consider icons/fonts vs images - images are content, but icons are styling and don't belong in journey
type ImageType = {
	url: string;
	alt?: string;
	width?: string; // TODO: move to CSS variables - which image/ alt text is content, size is styling
	height?: string; // TODO: move to CSS variables - which image/ alt text is content, size is styling
};

// TODO: Consider removing Address composite component in favour of action provider solution
export interface AddressComponent extends BaseComponent, InputComponent {
	type: 'Address';
	postcodeLabel?: string;
	postcodePlaceholder?: string;
	propertyLabel?: string;
	propertyPlaceholder?: string;
	postcodeHelp?: string;
	postcodeError?: string;
}
// TODO: Consider removing Vehicle composite component in favour of action provider solution
export interface VehicleComponent extends BaseComponent, InputComponent {
	type: 'Vehicle';
	regnumLabel?: string;
	regnumPlaceholder?: string;
	buttonLabel?: string;
}
