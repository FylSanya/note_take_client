import {INoteDB} from "../types/types";
import {FC} from "react";

interface SidebarProps {
    notes: INoteDB[],
    onAddNote: Function,
    onDeleteNote: Function,
    activeNote: string | null,
    setActiveNote: Function

}

const Sidebar: FC<SidebarProps> = ({
                                       notes,
                                       onAddNote,
                                       onDeleteNote,
                                       activeNote,
                                       setActiveNote,
                                   }) => {
    const sortedNotes = notes.sort((a, b) => b.modified.valueOf() - a.modified.valueOf());

    return (
        <div className="app-sidebar">
            <div className="app-sidebar-header">
                <h1>Notes</h1>
                <button onClick={() => onAddNote()}>Add</button>
            </div>
            <div className="app-sidebar-notes">
                {sortedNotes.map(({note_id, title, body, modified}, i) => (
                    <div
                        className={`app-sidebar-note ${note_id === activeNote && "active"}`}
                        onClick={() => setActiveNote(note_id)}
                    >
                        <div className="sidebar-note-title">
                            <strong>{title}</strong>
                            <button onClick={(e) => onDeleteNote(note_id)}>Delete</button>
                        </div>

                        <p>{body && body.substr(0, 100) + "..."}</p>
                        <small className="note-meta">
                            Last Modified{" "}
                            {new Date(modified).toLocaleDateString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;