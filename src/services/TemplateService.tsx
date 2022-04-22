import axios from "axios";
import {ITemplate, ITemplateDB} from "../types/types";

export default class TemplateService {
    private readonly API_URL: string;

    constructor() {
        this.API_URL = 'http://0.0.0.0:8000/templates/'
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

    // fetchOneNote = async (templateId: string) => {
    //
    //     try {
    //         const response = await axios.get<ITemplateDB>(`${this.API_URL}${templateId}`)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

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