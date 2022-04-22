import React, {FC} from 'react';

import ReactMarkdown from "react-markdown";
import {INoteDB, ITemplateDB} from "../types/types";

interface NoteProps {
    activeElement: INoteDB | ITemplateDB
    onUpdateElement: Function
}


const Note: FC<NoteProps> = ({activeElement, onUpdateElement}) => {
    const onEditField = (field: string, value: string) => {
        onUpdateElement({
            ...activeElement,
            [field]: value,
        });
    };

    if (!activeElement) return <div className="no-active-note">No Active Note</div>;

    return (
        <div className="app-main">
            <div className="app-main-note-edit">
                <input
                    type="text"
                    id="title"
                    placeholder="Note Title"
                    value={activeElement.title}
                    onChange={(e) => onEditField("title", e.target.value)}
                    autoFocus
                />
                <textarea
                    id="body"
                    placeholder="Write your note here..."
                    value={activeElement.body}
                    onChange={(e) => {
                        onEditField("body", e.target.value);

                    }}
                />
            </div>
            <div className="app-main-note-preview">
                <h1 className="preview-title">{activeElement.title}</h1>
                <ReactMarkdown className="markdown-preview">
                    {activeElement.body}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default Note;