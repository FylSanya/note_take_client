import axios from "axios";
import {INote, INoteDB} from "../types/types";

export default class NoteService {
    private readonly API_URL: string;

    constructor() {
        this.API_URL = 'http://0.0.0.0:8000/notes/'
    }

    fetchNotes = async () => {
        return await axios.get<INoteDB[]>(this.API_URL).then(
            (response) => {
                return response.data
            }
        ).catch((e) => {
            console.log(e)
            return []
        })
    }

    fetchFilteredNotes = async (filteredQuery: string) => {
        return await axios.get<INoteDB[]>(`${this.API_URL}${filteredQuery}`).then(
            (response) => {
                return response.data
            }
        ).catch((e) => {
            console.log(e)
            return []
        })
    }

    updateNote = async (updatedNote: INoteDB) => {
        try {
            await axios.put(`${this.API_URL}${updatedNote.note_id}`, updatedNote)
        } catch (e) {
            console.log(e)
        }
    }

    deleteNote = async (noteId: string) => {
        try {
            await axios.delete(`${this.API_URL}${noteId}`)
        } catch (e) {
            console.log(e)
        }
    }

    createNote = async (note: INote) => {
        try {
            const response = await axios.post(this.API_URL, note)
            return response.data
        } catch (e) {
            console.log(e)
        }

    }
}