import { configureStore } from "@reduxjs/toolkit";
import  notesSlicer  from "../features/notesDetailSlice";
import modelSlicer from "../features/modelSlicer";
import newNotesSlicer from "../features/newNotesSlicer";


export const store = configureStore({
  reducer: {
    notesApp: notesSlicer, 
    models:modelSlicer,
    newNotes:newNotesSlicer
   },
  
});