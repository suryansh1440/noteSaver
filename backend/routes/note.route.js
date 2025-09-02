import { Router } from "express";
import { addNote, deleteNote, getNotes } from "../controller/note.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const noteRouter = Router();

noteRouter.post("/add",protectRoute ,addNote);
noteRouter.delete("/delete",protectRoute ,deleteNote);
noteRouter.get("/get",protectRoute ,getNotes);


export default noteRouter;