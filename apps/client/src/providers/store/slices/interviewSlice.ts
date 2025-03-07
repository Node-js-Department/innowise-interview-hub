import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInterviewState {
  intreviewId: string | null,
  loading: boolean,
  error: string | null,
}

const initialState: IInterviewState = {
  intreviewId: null,
  loading: false,
  error: null,
};

const interviewSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {
    setInterview: (state, action: PayloadAction<string>) => {
      state.intreviewId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setInterview, setLoading, setError } = interviewSlice.actions;

export default interviewSlice.reducer;