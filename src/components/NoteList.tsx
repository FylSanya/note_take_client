import React, {FC} from 'react';
import {ActiveElement, INoteDB} from "../types/types";
import NoteItem from "./NoteItem";

interface NoteListProps {
    sortedNotes: INoteDB[]
    activeElement: ActiveElement,
    setActiveElement: Function
    onDeleteNote: Function,
}

const NoteList: FC<NoteListProps> = ({sortedNotes, activeElement, setActiveElement, onDeleteNote}) => {
    return (
        <div className="app-sidebar-notes">
            {sortedNotes.map((note) => (
                <NoteItem note={note} activeElement={activeElement} setActiveElement={setActiveElement}
                          onDeleteNote={onDeleteNote}/>
            ))}
        </div>
    );
};

export default NoteList;