import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: "" };

export const modelSlicer = createSlice({
  name: "models",  
  initialState,
  reducers: {
    updateId: (state, action) => {
        state.value =  action.payload;
      },
  },
});

export const { updateId } = modelSlicer.actions;

export default modelSlicer.reducer;