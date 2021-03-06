import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import expert from "../api/expert";

const initialState = {
  doctors: [],
  pagination: {},
  userQuery: {
    pagination: {
      page: 1,
    },
    sort: ["createdAt:desc"],
  },
  status: "idle",
  error: null,
};

const TOKEN =
  "6225d6297b8dc34091e7d8ca3b4acd33f4d4f0276a57cab837823def48e1c98f01a577af995c3ecdd723cfa650ccbe6bbfb6830ef657dfbe90007c0b36cdd7d47377bd31a951aa33a92099d0ccd6b7518e579e2f2a4e2a20c8c76ac75c68cc026f52de7fe8b215b0d92bbc9f4065b0398b705df2e3845c4a7823ed039f85c4bd";
export const getDoctors = createAsyncThunk(
  "doctors/getDoctors",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await expert.get(`/doctors?${payload}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
     
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getDoctorById = createAsyncThunk(
  "doctors/getDoctorById",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await expert.get(`/doctors/${payload}`, {
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
export const addDoctor = createAsyncThunk(
  "doctors/addDoctor",
  async ({ data, callback }, { rejectWithValue }) => {
    try {
      const response = await expert.post(
        "/doctors",
        { data },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      callback();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  "doctors/deleteDoctors",
  async ({ doctorId, callback }, { rejectWithValue }) => {
    try {
      const response = await expert.delete(`/doctors/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      callback();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDoctor = createAsyncThunk(
  "doctors/updateDoctor",
  async ({ id, data, callback }, { rejectWithValue }) => {
    try {
      const response = await expert.put(`/doctors/${id}`, data, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      callback();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setUserQuery: {
      reducer: (state, action) => {
        state.userQuery = action.payload;
        state.status = 'idle'
      },
      prepare: (userQuery) => {
        return {
          payload: userQuery,
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      //getDoctors
      .addCase(getDoctors.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pagination = action.payload.meta.pagination;
        state.doctors = action.payload.data;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //getDoctorById
      .addCase(getDoctorById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDoctorById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctors = action.payload;
      })
      .addCase(getDoctorById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //addDoctor
      .addCase(addDoctor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //deleteDoctor
      .addCase(deleteDoctor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //updateDoctor
      .addCase(updateDoctor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllDoctors = (state) => state.doctors.doctors;
export const getDoctorsPagination = (state) => state.doctors.pagination;
export const getUserQuery = (state) => state.doctors.userQuery;
export const getDoctorsStatus = (state) => state.doctors.status;
export const getDoctorsError = (state) => state.doctors.error;

export const { setUserQuery } = doctorsSlice.actions;
export default doctorsSlice.reducer;
