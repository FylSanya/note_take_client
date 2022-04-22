import {ActiveElement, INoteDB, ITemplateDB} from "../types/types";
import React, {FC, useState} from "react";
import NoteList from "./NoteList";
import SearchBar from "./SearchBar";
import TemplateList from "./TemplateList";

interface SidebarProps {
    notes: INoteDB[],
    templates: ITemplateDB[],
    onAddNote: Function,
    onDeleteNote: Function,
    activeElement: ActiveElement,
    setActiveElement: Function
    onAddTemplate: Function
    onDeleteTemplate: Function
    setSearchQuery: Function
}

const Sidebar: FC<SidebarProps> = ({
                                       notes,
                                       templates,
                                       onAddNote,
                                       onDeleteNote,
                                       activeElement,
                                       setActiveElement,
                                       onAddTemplate,
                                       onDeleteTemplate,
                                       setSearchQuery,
                                   }) => {
    const sortedNotes = notes.sort((a, b) => b.modified.valueOf() - a.modified.valueOf());
    const [isTemplate, setIsTemplate] = useState<boolean>(true)


    return (
        <div className="app-sidebar">
            <div className="app-sidebar-header">
                <strong onClick={() => {
                    setActiveElement({type: "", element_id: ""})
                    setIsTemplate(true)
                }}
                >SESSION NOTES</strong>
            </div>
            <SearchBar setSearchQuery={setSearchQuery}/>
            {isTemplate ?
                <>
                    <NoteList sortedNotes={sortedNotes} activeElement={activeElement}
                              setActiveElement={setActiveElement}
                              onDeleteNote={onDeleteNote}/>
                    <button className="add-button app-sidebar-note" onClick={() => setIsTemplate(false)}>Add page
                    </button>
                </>
                :
                <>
                    <button className="add-button app-sidebar-note" onClick={() => {
                        setIsTemplate(true)
                        onAddNote()
                    }}>Blank page
                    </button>
                    <TemplateList templates={templates}
                                  activeElement={activeElement}
                                  onDeleteTemplate={onDeleteTemplate} onAddNote={onAddNote}
                                  setIsTemplate={setIsTemplate}/>
                    <button className="add-button app-sidebar-note" onClick={() => {
                        setActiveElement({type: "", element_id: ""})
                        onAddTemplate()
                    }}>Add template
                    </button>
                </>
            }


        </div>
    );
};

export default Sidebar;