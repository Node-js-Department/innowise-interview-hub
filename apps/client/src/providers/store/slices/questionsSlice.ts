import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IQuestion {
  id: string,
}

interface IQuestionsState {
  questions: IQuestion[],
  loading: boolean,
  error: string | null,
}

const initialState: IQuestionsState = {
  questions: [],
  loading: false,
  error: null,
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<IQuestion[]>) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action: PayloadAction<IQuestion>) => {
      state.questions.push(action.payload);
    },
    removeQuestion: (state, action: PayloadAction<string>) => {
      state.questions = state.questions.filter(
        question => question.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setQuestions, addQuestion, removeQuestion, setLoading, setError } = questionsSlice.actions;

export default questionsSlice.reducer;