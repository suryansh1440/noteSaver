import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';

export const useNoteStore = create((set,get) => ({
    notes:[],
    isAddingNote:false,
    isDeletingNote:false,
    isGettingNotes:false,
    

    addNote: async (note) => {
        set({isAddingNote:true});
        try {
            const response = await axiosInstance.post("/note/add", note);
            set({notes:[...get().notes,response.data.note]});
            toast.success(response.data.message);
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isAddingNote:false});
        }
    },
    deleteNote: async (id) => {
        set({isDeletingNote:true});
        try {
            const response = await axiosInstance.delete("/note/delete",{data: {id}});
            set({notes:get().notes.filter((note) => note._id !== id)});
            toast.success(response.data.message);
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isDeletingNote:false});
        }
    },
    getNotes: async () => {
        set({isGettingNotes:true});
        try {
            const response = await axiosInstance.get("/note/get");
            set({notes:response.data.notes});
        }catch(error){
            console.error(error);
        }finally{
            set({isGettingNotes:false});
        }
    }
}))