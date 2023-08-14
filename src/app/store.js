import { configureStore } from "@reduxjs/toolkit";
import  notesDetail  from "../features/notesDetailSlice";
import modelSlicer from "../features/modelSlicer";


export const store = configureStore({
  reducer: {notesApp: notesDetail, models:modelSlicer },
  
});