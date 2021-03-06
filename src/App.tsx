import {useCallback, useEffect, useRef, useState} from "react";
import "./App.css";
import Note from "./components/Note";
import Sidebar from "./components/Sidebar";
import {ActiveElement, INote, INoteDB, ITemplate, ITemplateDB} from "./types/types";
import NoteService from "./services/NoteService";
import TemplateService from "./services/TemplateService";


const App = () => {
    const [notes, setNotes] = useState<INoteDB[]>([]);
    const [templates, setTemplates] = useState<ITemplateDB[]>([]);

    const [searchQuery, setSearchQuery] = useState<string>('')

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
                onUpdateElement(getActiveElement()!)
            }
        }
    }, [activeElement, notes, templates]);


    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);


    useEffect(() => {
        NoteService.fetchNotes().then((response) => {
            setNotes(response!)
        })
        TemplateService.fetchTemplates().then((response) => {
            setTemplates(response!)
        })
    }, [])

    useEffect(() => {
        if (searchQuery !== '') {
            setActiveElement({
                type: '',
                element_id: ''
            })
            NoteService.fetchFilteredNotes(searchQuery).then((response) => {
                    setNotes(response!)
                }
            )
        } else {
            NoteService.fetchNotes().then((response) => {
                setNotes(response!)
            })
        }
    }, [searchQuery])

    const onAddTemplate = () => {
        const newTemplate: ITemplate = {
            title: "Untitled template",
            body: "Some template text...",
        };
        TemplateService.createTemplate(newTemplate).then((template_id) => {
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

    const onDeleteTemplate = (templateId: string) => {
        setTemplates(templates.filter(({template_id}) => template_id !== templateId));
        TemplateService.deleteTemplate(templateId);
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
        timeOutId.current = (setTimeout(() => TemplateService.updateTemplate(updatedTemplate), 10000));
    };

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
        NoteService.createNote(newNote).then((note_id) => {
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
        NoteService.deleteNote(noteId);
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
        timeOutId.current = (setTimeout(() => NoteService.updateNote(updatedNote), 10000));
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