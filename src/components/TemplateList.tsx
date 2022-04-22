import React, {Dispatch, FC, SetStateAction} from 'react';
import {ActiveElement, ITemplate, ITemplateDB} from "../types/types";
import TemplateItem from "./TemplateItem";

interface TemplateListProps {
    templates: ITemplateDB[]
    activeElement: ActiveElement
    onDeleteTemplate(templateId: string): void
    onAddNote(template_data?: ITemplate): void
    setIsTemplate: Dispatch<SetStateAction<boolean>>
}

const TemplateList: FC<TemplateListProps> = ({
                                                 templates,
                                                 activeElement,
                                                 onDeleteTemplate,
                                                 onAddNote,
                                                 setIsTemplate,
                                             }) => {
    return (
        <div className="app-sidebar-notes">
            {templates.map((template) => (
                <TemplateItem template={template} activeElement={activeElement}
                              onAddNote={onAddNote}
                              onDeleteTemplate={onDeleteTemplate} setIsTemplate={setIsTemplate}/>
            ))}
        </div>
    );
};

export default TemplateList;