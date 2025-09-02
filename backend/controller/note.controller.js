import Note from "../modals/note.modal.js"


export const addNote = async (req, res) => {
    const { content } = req.body;
    const userId  = req.user?._id;
    try{
        if(!content){
            return res.status(400).json({message:"Content is required"});
        }
        if(!userId){
            return res.status(400).json({message:"User id is required"});
        }
        const note = await Note.create({content, userId});
        res.status(201).json({message:"Note added successfully", note});
    }catch(error){
        res.status(500).json({message:"Internal Server Error"});
        console.log("error in addNote",error);
    }
}

export const deleteNote = async (req, res) => {
    const { id } = req.body;
    const userId = req.user?._id;
    try{
        const note = await Note.findById(id);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        if(note.userId.toString() !== userId.toString()){
            return res.status(403).json({message:"You are not authorized to delete this note"});
        }
        await Note.findByIdAndDelete(id);
        res.status(200).json({message:"Note deleted successfully", note});
    }catch(error){
        res.status(500).json({message:"Internal Server Error"});
        console.log("error in deleteNote",error);
    }
}

export const getNotes = async (req, res) => {
    const  userId  = req.user?._id;
    try{
        const notes = await Note.find({userId});
        res.status(200).json({notes});
    }catch(error){
        res.status(500).json({message:"Internal Server Error"});
        console.log("error in getNotes",error);
    }
}