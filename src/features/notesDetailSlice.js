import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllNotes = createAsyncThunk("notesDetail", async (args, { rejectWithValue }) => {
  try {
    const response = await fetch("http://127.0.0.1:4000/fetchNotes");
    const result = await response.json(); // Await the result of response.json()
    return result;
  } catch (error) {
    return rejectWithValue("error.response");
  }


});

export const getNoteById = createAsyncThunk("oneNoteDetail", async ({id}, { rejectWithValue }) => {
  try {
    const response = await fetch("http://127.0.0.1:4000/fetchNoteById", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiOGQ0ZmM0ZmY0YmQzMmE4NjU2MGMyIn0sImlhdCI6MTY5MTQ4ODM0M30.IehFPEW4RMo5EdzATgGfjp2OI9msdV-ALCZHhJmU458" // Replace with your actual auth token
      },
      body: JSON.stringify({ id:id })
    });
    const result = await response.json(); // Await the result of response.json()
    return result;
  } catch (error) {
    return rejectWithValue("error.response");
  }


});

export const deleteNotes = createAsyncThunk("deleteNotes", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://127.0.0.1:4000/deleteNotes/${id}`, {
      method: "DELETE"
    });
    const result = await response.json(); // Await the result of response.json()
    return result;
  } catch (error) {
    return rejectWithValue("error.response");
  }


});


export const addNotes = createAsyncThunk("addNotes", async ({ title, description, tag }, { rejectWithValue }) => {
  const user = "64b8d4fc4ff4bd32a86560c2";
  try {
    const response = await fetch("http://127.0.0.1:4000/addNotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiOGQ0ZmM0ZmY0YmQzMmE4NjU2MGMyIn0sImlhdCI6MTY5MTQ4ODM0M30.IehFPEW4RMo5EdzATgGfjp2OI9msdV-ALCZHhJmU458" // Replace with your actual auth token
      },
      body: JSON.stringify({ user, title, description, tag })
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


export const updateNotes = createAsyncThunk("updateNotes", async ({id, title, description, tag }, { rejectWithValue }) => {
  // const user = "64b8d4fc4ff4bd32a86560c2";
  console.log(title, description, tag);
  try {
    const response = await fetch(`http://127.0.0.1:4000/updateNotes/${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiOGQ0ZmM0ZmY0YmQzMmE4NjU2MGMyIn0sImlhdCI6MTY5MTQ4ODM0M30.IehFPEW4RMo5EdzATgGfjp2OI9msdV-ALCZHhJmU458 "
      },
      body: JSON.stringify({ title, description, tag })
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


export const notesDetail = createSlice({
  name: "notesDetail",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload); // Push payload data to the notes array
      })
      .addCase(addNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNotes.fulfilled, (state, action) => {
        state.loading = false;
        const deletedNoteId = action.payload.toString();
        state.notes = state.notes.filter(note => note.id !== deletedNoteId); // Filter out the deleted note
      })
      .addCase(deleteNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getNoteById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNoteById.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(getNoteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNotes.fulfilled, (state, action) => {
        state.loading = false;
        const updatedNoteIndex = state.notes.findIndex(note => note._id === action.payload._id);
        if (updatedNoteIndex !== -1) {
          state.notes[updatedNoteIndex] = action.payload;
        }
      })
      .addCase(updateNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});
// export const { getAllNotes } =notesDetail.action;
export default notesDetail.reducer;
