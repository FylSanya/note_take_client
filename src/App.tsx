import {useCallback, useEffect, useRef, useState} from "react";
import "./App.css";
import Note from "./components/Note";
import Sidebar from "./components/Sidebar";
import {ActiveElement, INote, INoteDB, ITemplate, ITemplateDB} from "./types/types";
import NoteService from "./services/NoteService";
import TemplateService from "./services/TemplateService";

const noteService = new NoteService();
const templateService = new TemplateService();


const App = () => {
    const [notes, setNotes] = useState<INoteDB[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [templates, setTemplates] = useState<ITemplateDB[]>([]);

    const [activeElement, setActiveElement] = useState<ActiveElement>({
        type: "",
        element_id: ""
    })

    const timeOutId = useRef<NodeJS.Timeout>()

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            let charCode = (event.key).toLowerCase();
            if (charCode === 's') {
                alert("CTRL+S Pressed");
            } else if (charCode === 'c') {
                alert("CTRL+C Pressed");
            } else if (charCode === 'v') {
                alert("CTRL+V Pressed");
            }
        }


    }, []);

    useEffect(() => {
        setActiveElement({
            type: '',
            element_id: ''
        })
        noteService.fetchFilteredNotes(searchQuery).then((response) => {
                setNotes(response!)
            }
        )
    }, [searchQuery])

    useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);

        // remove the event listener
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);


    useEffect(() => {
        noteService.fetchNotes().then((response) => {
            setNotes(response!)
        })
        templateService.fetchTemplates().then((response) => {
            setTemplates(response!)
        })
    }, [])

    const onAddTemplate = () => {
        const newTemplate: ITemplate = {
            title: "Untitled template",
            body: "Some template text...",
        };
        templateService.createTemplate(newTemplate).then((template_id) => {
            const newTemplateWithID: ITemplateDB = {
                template_id: template_id,
                ...newTemplate
            };
            setTemplates([newTemplateWithID, ...templates]);
            setActiveElement({
                type: "template",
                element_id: template_id
            });
        });
    }

    const onAddNote = (template_data?: ITemplate) => {
        let newNote: INote;
        if (template_data) {
            newNote = {
                title: template_data.title,
                body: template_data.body,
                created: new Date(),
                modified: new Date(),
            };
        } else {
            newNote = {
                title: "",
                body: "",
                created: new Date(),
                modified: new Date(),
            };
        }
        noteService.createNote(newNote).then((note_id) => {
            const newNoteWithID: INoteDB = {
                note_id: note_id,
                ...newNote
            };
            setNotes([newNoteWithID, ...notes]);
            setActiveElement({
                type: "note",
                element_id: note_id
            });
        });
    };

    const onDeleteNote = (noteId: string) => {
        setNotes(notes.filter(({note_id}) => note_id !== noteId));
        noteService.deleteNote(noteId);
    };

    const onDeleteTemplate = (templateId: string) => {
        setTemplates(templates.filter(({template_id}) => template_id !== templateId));
        templateService.deleteTemplate(templateId);
    };

    const onUpdateTemplate = (updatedTemplate: ITemplateDB) => {
        const updatedTemplatesArr = templates.map((template) => {
            if (template.template_id === updatedTemplate.template_id) {
                return updatedTemplate;
            }

            return template;
        });
        setTemplates(updatedTemplatesArr);
        clearTimeout(timeOutId.current!);
        timeOutId.current = (setTimeout(() => templateService.updateTemplate(updatedTemplate), 500));
    };

    const onUpdateNote = (updatedNote: INoteDB) => {
        const updatedNotesArr = notes.map((note) => {
            if (note.note_id === updatedNote.note_id) {
                return updatedNote;
            }

            return note;
        });
        setNotes(updatedNotesArr);
        clearTimeout(timeOutId.current!);
        timeOutId.current = (setTimeout(() => noteService.updateNote(updatedNote), 500));
    };

    const onUpdateElement = (updatedElem: INoteDB | ITemplateDB) => {
        if (activeElement["type"] === "template") {
            onUpdateTemplate(updatedElem as ITemplateDB)
        } else {
            onUpdateNote(updatedElem as INoteDB)
        }
    }

    const getActiveElement = () => {
        if (activeElement["type"] === "template") {
            return templates.find(({template_id}) => template_id === activeElement["element_id"]);
        } else {
            return notes.find(({note_id}) => note_id === activeElement["element_id"]);
        }
    };


    return (
        <div className="App">
            <Sidebar
                setSearchQuery={setSearchQuery}
                notes={notes}
                templates={templates}
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
                activeElement={activeElement}
                onAddTemplate={onAddTemplate}
                setActiveElement={setActiveElement}
                onDeleteTemplate={onDeleteTemplate}
            />
            <Note activeElement={getActiveElement()!} onUpdateElement={onUpdateElement}/>
        </div>
    );
}

export default App;