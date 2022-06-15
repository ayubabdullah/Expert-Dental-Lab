import { configureStore } from "@reduxjs/toolkit";
import doctorsReducer from '../slices/doctorsSlice'
import casesReducer from '../slices/casesSlice'
export const store = configureStore({
    reducer: {
      doctors: doctorsReducer,
      cases: casesReducer
  },
});
