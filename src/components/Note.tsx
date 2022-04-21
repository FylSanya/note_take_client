import React, {FC} from 'react';

import ReactMarkdown from "react-markdown";
import {INoteDB} from "../types/types";

interface NoteProps {
    activeNote: INoteDB
    onUpdateNote: Function
}


const Note: FC<NoteProps> = ({activeNote, onUpdateNote}) => {
    const onEditField = (field: string, value: string) => {
        onUpdateNote({
            ...activeNote,
            [field]: value,
            modified: Date.now(),
        });
    };

    if (!activeNote) return <div className="no-active-note">No Active Note</div>;

    return (
        <div className="app-main">
            <div className="app-main-note-edit">
                <input
                    type="text"
                    id="title"
                    placeholder="Note Title"
                    value={activeNote.title}
                    onChange={(e) => onEditField("title", e.target.value)}
                    autoFocus
                />
                <textarea
                    id="body"
                    placeholder="Write your note here..."
                    value={activeNote.body}
                    onChange={(e) => onEditField("body", e.target.value)}
                />
            </div>
            <div className="app-main-note-preview">
                <h1 className="preview-title">{activeNote.title}</h1>
                <ReactMarkdown className="markdown-preview">
                    {activeNote.body}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default Note;