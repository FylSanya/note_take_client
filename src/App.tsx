import {useEffect, useState} from "react";
import "./App.css";
import Main from "./components/Note";
import Sidebar from "./components/Sidebar";
import {INote, INoteDB} from "./types/types";
import NoteService from "./services/NoteService";


const noteService = new NoteService();


const App = () => {
    const [notes, setNotes] = useState<INoteDB[]>([]);
    const [activeNote, setActiveNote] = useState<string | null>(null);

    useEffect(() => {
        noteService.fetchNotes().then((response) => {
            setNotes(response!)
        })
    }, [])

    const onAddNote = () => {
        const newNote: INote = {
            title: "Untitled Note",
            body: "kek",
            created: new Date(),
            modified: new Date(),
        };
        noteService.createNote(newNote).then((note_id) => {
            const newNoteWithID: INoteDB = {
                note_id: note_id,
                ...newNote
            };
            setNotes([newNoteWithID, ...notes]);
            setActiveNote(newNoteWithID.note_id);
        });


    };

    const onDeleteNote = (noteId: string) => {
        setNotes(notes.filter(({note_id}) => note_id !== noteId));
        noteService.deleteNote(noteId);
    };

    const onUpdateNote = (updatedNote: INoteDB) => {
        const updatedNotesArr = notes.map((note) => {
            if (note.note_id === updatedNote.note_id) {
                return updatedNote;
            }

            return note;
        });
        setNotes(updatedNotesArr);
        noteService.updateNote(updatedNote);
    };

    const getActiveNote = () => {
        return notes.find(({note_id}) => note_id === activeNote);
    };


    return (
        <div className="App">
            <Sidebar
                notes={notes}
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
            />
            <Main activeNote={getActiveNote()!} onUpdateNote={onUpdateNote}/>
        </div>
    );
}

export default App;