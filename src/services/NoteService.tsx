import axios from "axios";
import {INote, INoteDB} from "../types/types";

export default class NoteService {

    fetchNotes = async () => {
        return await axios.get<INoteDB[]>('http://0.0.0.0:8000/api/notes/').then(
            (response) => {
                return response.data
            }
        ).catch((e) => {
            console.log(e)
            return []
        })
    }

    // fetchOneNote = async (noteId: string) => {
    //
    //     try {
    //         const response = await axios.get<INoteDB>(`http://0.0.0.0:8000/api/notes/${noteId}`)
    //         setNotes([...notes, response.data])
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    updateNote = async (updatedNote: INoteDB) => {
        try {
            await axios.put(`http://0.0.0.0:8000/api/notes/${updatedNote.note_id}`, updatedNote)
        } catch (e) {
            console.log(e)
        }
    }

    deleteNote = async (noteId: string) => {
        try {
            await axios.delete(`http://0.0.0.0:8000/api/notes/${noteId}`)
        } catch (e) {
            console.log(e)
        }
    }

    createNote = async (note: INote) => {
        try {
            const response = await axios.post(`http://0.0.0.0:8000/api/notes/`, note)
            return response.data
        } catch (e) {
            console.log(e)
        }

    }
}