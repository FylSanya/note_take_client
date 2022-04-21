import React, {FC} from 'react';
import {INoteDB} from "../types/types";
import NoteItem from "./NoteItem";

interface NoteListProps {
    sortedNotes: INoteDB[]
    activeNote: string | null,
    setActiveNote: Function
    onDeleteNote: Function,
}

const NoteList: FC<NoteListProps> = ({sortedNotes, activeNote, setActiveNote, onDeleteNote}) => {
    return (
        <div className="app-sidebar-notes">
            {sortedNotes.map((note) => (
                <NoteItem note={note} activeNote={activeNote} setActiveNote={setActiveNote}
                          onDeleteNote={onDeleteNote}/>
            ))}
        </div>
    );
};

export default NoteList;