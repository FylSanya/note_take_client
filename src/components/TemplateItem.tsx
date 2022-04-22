import React, {Dispatch, FC, SetStateAction} from 'react';
import {ActiveElement, ITemplate, ITemplateDB} from "../types/types";
import {faTrashCan, faFile} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


interface TemplateItemProps {
    template: ITemplateDB
    activeElement: ActiveElement
    onAddNote(template_data?: ITemplate): void
    onDeleteTemplate(templateId: string): void
    setIsTemplate: Dispatch<SetStateAction<boolean>>
}


const TemplateItem: FC<TemplateItemProps> = ({
                                                 template,
                                                 activeElement,
                                                 onAddNote,
                                                 onDeleteTemplate,
                                                 setIsTemplate,
                                             }) => {


    return (
        <div
            className={`app-sidebar-note ${template.template_id === activeElement["element_id"] && "active"}`}

        >
            <div className="icon file">
                <FontAwesomeIcon icon={faFile}/>
            </div>
            <div className="sidebar-note-title">
                <p
                    onClick={() => {
                        onAddNote(template)
                        setIsTemplate(true)
                    }}
                >{template.title.length > 25 ? template.title.substring(0, 25) + "..." : template.title}</p>

            </div>
            <div className="icon trash" onClick={() => onDeleteTemplate(template.template_id)}>
                <FontAwesomeIcon icon={faTrashCan}/>
            </div>

        </div>
    );
};

export default TemplateItem;