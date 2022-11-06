// TODO: make these types global in app.d.ts
export type JourneyType = {
	title: string;
	journeyflow?: 'classic' | 'questionperpage' | 'infinitescroll'; // https://github.com/mtempleheald/journeyasdata/issues/95
	pages: PageType[];
	logo?: ImageType;
	cookiepreferences?: CookiePreferenceType;
	footercontent?: string | string[];
};
export type NavigationOptionsType = {
	backlabel?: string; // omit to not provide a back button
	nextlabel?: string; // omit to not provide a next button
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
	id: string; // used for triggering bespoke actions
	sections: SectionType[];
	summarycontent: string | string[];
	minrepeats?: number;
	maxrepeats: number;
	labeladd?: string;
	labeledit?: string;
	labelremove?: string;
};
export type SectionType = {
	type?: 'section'; // section is default if excluded
	id?: string; // used for triggering bespoke actions
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
	| AddressComponent
	| DisplayComponent
	| DisplaySelections
	| InputComponent
	| OptionComponent
	| TriBoxDateComponent
	| VehicleComponent
	| UnknownComponent;

// Every component must have a type or we have no way to render it
interface BaseComponent {
	type: string;
	pre?: string;
	post?: string;
	dependsupon?: {
		id: string;
		value: string;
	};
}
// Every input must have an id and a label for integration and accessibility respectively
interface BaseInputComponent extends BaseComponent {
	id: string; // id must not contain a . (full stop) - this is reserved for components within repeating groups
	label?: string;
	required?: boolean;
	placeholder?: string;
	value?: string; // TODO: Consider renaming to defaultvalue
	errorMessage?: string;
	help?: string;
}
export interface InputComponent extends BaseComponent, BaseInputComponent {
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
}
// Option components require a source list of options to render, which may cascade hierarchically
export interface OptionComponent extends BaseComponent, BaseInputComponent {
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
// TODO: consider merging with DisplayComponent, complicating content's type and removing items
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

// Composite component, an alternative to "Date"
export interface TriBoxDateComponent extends BaseComponent, BaseInputComponent {
	type: 'TriBoxDate';
	separator?: string;
	resetLabel: string;
	displayFormat: 'full' | 'long' | 'medium' | 'short';
	validation?: {
		min?: string; // DD/MM/YYYY
		max?: string; // DD/MM/YYYY
		minyearsago?: number;
		maxyearsago?: number;
		minyearsahead?: number;
		maxyearsahead?: number;
	};
}
// TODO: Consider icons/fonts vs images - images are content, but icons are styling and don't belong in journey
type ImageType = {
	url: string;
	alt?: string;
	width?: string; // TODO: move to CSS variables - which image/ alt text is content, size is styling
	height?: string; // TODO: move to CSS variables - which image/ alt text is content, size is styling
};

// TODO: Consider removing Address composite component in favour of action provider solution
export interface AddressComponent extends BaseComponent, BaseInputComponent {
	type: 'Address';
	postcodeLabel?: string;
	postcodePlaceholder?: string;
	propertyLabel?: string;
	propertyPlaceholder?: string;
	postcodeHelp?: string;
	postcodeError?: string;
}
// TODO: Consider removing Vehicle composite component in favour of action provider solution
export interface VehicleComponent extends BaseComponent, BaseInputComponent {
	type: 'Vehicle';
	regnumLabel?: string;
	regnumPlaceholder?: string;
	buttonLabel?: string;
}
export interface UnknownComponent extends BaseComponent {
	type: 'unknown';
	id?: string;
	values?: ValueType[];
}
