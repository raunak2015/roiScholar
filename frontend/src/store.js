import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import loanReducer from './features/loan/loanSlice';
import roiReducer from './features/roi/roiSlice';
import uiReducer from './features/ui/uiSlice';
import universityReducer from './features/university/universitySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loan: loanReducer,
    roi: roiReducer,
    ui: uiReducer,
    university: universityReducer,
  },
});
