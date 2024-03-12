import express from 'express';
import {CreateNote,GetUserNotes,deleteNotes,updateNotes} from '../controllers/notes-controller.js';
import MiddleWareAuth from '../controllers/auth-middleware.js';
const NotesRouter = express.Router();


NotesRouter.route('/:username/:id')
.put(MiddleWareAuth,updateNotes)
.delete(MiddleWareAuth,deleteNotes);

NotesRouter.route('/:username')
.post(MiddleWareAuth,CreateNote)
.get(MiddleWareAuth,GetUserNotes);


export default NotesRouter;
