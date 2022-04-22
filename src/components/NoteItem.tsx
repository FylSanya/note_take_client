import React, {Dispatch, FC, SetStateAction} from 'react';
import {ActiveElement, INoteDB} from "../types/types";
import {faFileLines, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface NoteItemProps {
    note: INoteDB
    activeElement: ActiveElement
    setActiveElement: Dispatch<SetStateAction<ActiveElement>>
    onDeleteNote(noteId: string): void
}

const NoteItem: FC<NoteItemProps> = ({note, activeElement, setActiveElement, onDeleteNote}) => {

    return (
        <div
            className={`app-sidebar-note ${note.note_id === activeElement["element_id"] && "active"}`}
            onClick={() => {
                setActiveElement({
                    type: "note",
                    element_id: note.note_id
                })
            }}
        >
            <div className="icon file">
                <FontAwesomeIcon icon={faFileLines}/>
            </div>
            <div className="sidebar-note-title">
                <p>{note.title.length > 25 ? note.title.substring(0, 25) + "..." : note.title}</p>
            </div>

            <small className="note-meta">
                {new Date(note.modified).toLocaleDateString("en-US", {
                    month: 'short',
                    day: 'numeric',
                })}
            </small>
            <div className="icon trash" onClick={() => onDeleteNote(note.note_id)}>
                <FontAwesomeIcon icon={faTrashCan}/>
            </div>
        </div>
    );
};

export default NoteItem;