import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import expert from "../api/expert";

const initialState = {
  doctors: [],
  status: "idle",
  error: null,
};

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUzODk4NzIyLCJleHAiOjE2NTY0OTA3MjJ9.UHdW9cfILKWL5l4J6ncxB8lKyUo55lehyXJ8IjOpj7Q";
export const getDoctors = createAsyncThunk(
  "doctors/getDoctors",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await expert.get("/doctors", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      console.log(response.data.data);
      return [...response.data.data];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addDoctor = createAsyncThunk(
  "doctors/addDoctor",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await expert.post("/doctors", payload, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDoctors.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctors = action.payload;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addDoctor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctors.push(action.payload);
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllDoctors = (state) => state.doctors.doctors;
export const getDoctorsStatus = (state) => state.doctors.status;
export const getDoctorsError = (state) => state.doctors.error;
export default doctorsSlice.reducer;
