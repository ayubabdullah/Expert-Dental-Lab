import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import expert from "../api/expert";

const initialState = {
  cases: [],
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
export const getCases = createAsyncThunk(
  "cases/getCases",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await expert.get(`/cases?${payload}`, {
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
export const getCaseById = createAsyncThunk(
  "cases/getCaseById",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await expert.get(`/cases/${payload}`, {
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
export const addCase = createAsyncThunk(
  "cases/addCase",
  async ({ data, callback }, { rejectWithValue }) => {
    try {
      const response = await expert.post(
        "/cases",
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

export const deleteCase = createAsyncThunk(
  "cases/deleteCases",
  async ({ doctorId, callback }, { rejectWithValue }) => {
    try {
      const response = await expert.delete(`/cases/${doctorId}`, {
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

export const updateCase = createAsyncThunk(
  "cases/updateCase",
  async ({ id, data, callback }, { rejectWithValue }) => {
    try {
      const response = await expert.put(`/cases/${id}`, data, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      callback();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const casesSlice = createSlice({
  name: "cases",
  initialState,
  reducers: {
    setUserQuery: {
      reducer: (state, action) => {
        state.userQuery = action.payload;
        state.status = "idle";
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
      //getCases
      .addCase(getCases.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCases.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pagination = action.payload.meta.pagination;
        state.cases = action.payload.data;
      })
      .addCase(getCases.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //getCaseById
      .addCase(getCaseById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCaseById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cases = action.payload;
      })
      .addCase(getCaseById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //addCase
      .addCase(addCase.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addCase.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(addCase.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //deleteCase
      .addCase(deleteCase.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCase.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteCase.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //updateCase
      .addCase(updateCase.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateCase.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateCase.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllCases = (state) => state.cases.cases;
export const getCasesPagination = (state) => state.cases.pagination;
export const getUserQuery = (state) => state.cases.userQuery;
export const getCasesStatus = (state) => state.cases.status;
export const getCasesError = (state) => state.cases.error;

export const { setUserQuery } = casesSlice.actions;
export default casesSlice.reducer;
