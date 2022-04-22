import React, {FC} from 'react';
import {ActiveElement, ITemplateDB} from "../types/types";
import TemplateItem from "./TemplateItem";

interface TemplateListProps {
    templates: ITemplateDB[]
    activeElement: ActiveElement,
    onDeleteTemplate: Function,
    onAddNote: Function,
    setIsTemplate: Function
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