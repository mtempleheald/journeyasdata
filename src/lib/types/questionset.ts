export type QuestionSetType = {
    title: string;
    pages: PageType[];
}
export type PageType = {
    url: string;
    title: string;
    sections: SectionType[];
}
export type SectionType = {
    title?: string;
    logo?: string;
    components: ComponentType[];
}
export type ComponentType = BaseComponentType | AddressComponentType | VehicleComponentType;

export type BaseComponentType = {
    type: "Address" 
        | "ButtonSelect"
        | "Colour" 
        | "Date" 
        | "Datetime"
        | "Displayblock"
        | "Dropdown" 
        | "Email"
        | "Month" 
        | "Number"
        | "Range" 
        | "Search"
        | "Telephone"
        | "Text" 
        | "Time"
        | "Url"
        | "Vehicle" 
        | "Week"
        | "Year"
        | "YesNo";
    id?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    errorMessage?: string;
    help?: string;
    pre?: string;
    content?: string;
    post?: string;
    values?: ValueType[];
    refdata?: string;
    dependsupon?: {
        id: string;
        value: string;
    }
}
export type ValueType = {
    key: string;
    value: string;
}
export type AddressComponentType = BaseComponentType & {
    postcodeLabel?: string;
    postcodePlaceholder?: string;    
    propertyLabel?: string;
    propertyPlaceholder?: string;
    postcodeHelp?: string;
    postcodeError?: string;
}
export type VehicleComponentType = BaseComponentType & {
    regnumLabel: string;
    regnumPlaceholder: string;
    buttonLabel: string;
    errorMessage: string;
}