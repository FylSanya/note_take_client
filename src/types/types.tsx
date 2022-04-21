export interface INote {
    title: string;
    body: string;
    created: Date;
    modified: Date;
}

export interface INoteDB extends INote {
    note_id: string;
}