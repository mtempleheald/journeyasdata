export type QuestionSet = {
    questionset: {
        title: string;
    }
    pages: Page[];
}
type Page = {
    page: {
        url: string;
        title: string;
    }
    sections: Section[];
}
type Section = {
    section: {
        title?: string;
        logo?: string;
    }
    components: Component[];
}
type Component = {
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
    post?: string;
    values?: Value[];
    dependsupon?: {
        id: string;
        value: string;
    }
}
type Value = {
    value: string;
    display: string;
}