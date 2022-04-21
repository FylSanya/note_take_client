import {INoteDB} from "../types/types";
import {FC} from "react";
import NoteList from "./NoteList";
import SearchBar from "./SearchBar";

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
            <SearchBar/>
            <NoteList sortedNotes={sortedNotes} activeNote={activeNote} setActiveNote={setActiveNote}
                      onDeleteNote={onDeleteNote}/>
        </div>
    );
};

export default Sidebar;