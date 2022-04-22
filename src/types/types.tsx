export interface INote {
    title: string;
    body: string;
    created: Date;
    modified: Date;
}

export interface INoteDB extends INote {
    note_id: string;
}

export interface ITemplate {
    title: string;
    body: string;
}

export interface ITemplateDB extends ITemplate {
    template_id: string;
}

export interface ActiveElement {
    type: string
    element_id: string
}