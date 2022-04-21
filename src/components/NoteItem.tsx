import React, {FC} from 'react';
import {INoteDB} from "../types/types";

interface NoteItemProps {
    note: INoteDB
    activeNote: string | null,
    setActiveNote: Function
    onDeleteNote: Function,
}

const NoteItem: FC<NoteItemProps> = ({note, activeNote, setActiveNote, onDeleteNote}) => {
    return (
        <div
            className={`app-sidebar-note ${note.note_id === activeNote && "active"}`}
            onClick={() => setActiveNote(note.note_id)}
        >
            <div className="sidebar-note-title">
                <strong>{note.title}</strong>
                <button onClick={() => onDeleteNote(note.note_id)}>Delete</button>
            </div>

            <p>{note.body && note.body.substring(0, 20) + "..."}</p>
            <small className="note-meta">
                Last Modified{" "}
                {new Date(note.modified).toLocaleDateString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </small>
        </div>
    );
};

export default NoteItem;