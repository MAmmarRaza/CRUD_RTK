import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const newNotes = createAsyncThunk("newNotes", async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/fetchNotes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
  
      // Assuming your API response returns JSON data
      const responseData = await response.json();
  
      if (response.ok) {
        return responseData; // Return the actual response data
      } else {
        // Handle non-200 responses
        return rejectWithValue(responseData);
      }
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });

  export const addNotes = createAsyncThunk("addNotes", async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/addNotes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
  
      // Assuming your API response returns JSON data
      const responseData = await response.json();
  
      if (response.ok) {
        return responseData; // Return the actual response data
      } else {
        // Handle non-200 responses
        return rejectWithValue(responseData);
      }
    } catch (error) {
      return rejectWithValue(error.response);
    }
  });

  export const newNotesSlicer = createSlice({
    name: "newNotes",
    initialState: {
      notes: [],
      message:"",
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
      .addCase(newNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(newNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes=action.payload;
      })
      .addCase(newNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNotes.fulfilled, (state, action) => {
        state.loading = false;
        // state.notes=action.payload;
        state.message=action.payload.message;
      })
      .addCase(addNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    }
})

export default newNotesSlicer.reducer;