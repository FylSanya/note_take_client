import axios from "axios";
import {ITemplate, ITemplateDB} from "../types/types";

class TemplateService {
    private readonly API_URL: string;

    constructor() {
        this.API_URL = '/templates/'
    }

    fetchTemplates = async () => {
        return await axios.get<ITemplateDB[]>(this.API_URL).then(
            (response) => {
                return response.data
            }
        ).catch((e) => {
            console.log(e)
            return []
        })
    }

    updateTemplate = async (updatedTemplate: ITemplateDB) => {
        try {
            await axios.put(`${this.API_URL}${updatedTemplate.template_id}`, updatedTemplate)
        } catch (e) {
            console.log(e)
        }
    }

    deleteTemplate = async (templateId: string) => {
        try {
            await axios.delete(`${this.API_URL}${templateId}`)
        } catch (e) {
            console.log(e)
        }
    }

    createTemplate = async (template: ITemplate) => {
        try {
            const response = await axios.post(this.API_URL, template)
            return response.data
        } catch (e) {
            console.log(e)
        }

    }
}

export default new TemplateService()