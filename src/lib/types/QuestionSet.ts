export type QuestionSet = {
    questionset: {
        title: string;
    }
    pages: Page[];
}
export type Page = {
    page: {
        url: string;
        title: string;
    }
    sections: Section[];
}
export type Section = {
    section: {
        title?: string;
        logo?: string;
    }
    components: Component[];
}
export type Component = {
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
    values?: Value[];
    refdata?: string;
    dependsupon?: {
        id: string;
        value: string;
    }
}
export type Value = {
    key: string;
    value: string;
}