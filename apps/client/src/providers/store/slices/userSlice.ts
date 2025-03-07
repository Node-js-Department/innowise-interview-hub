import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  id: string,
  username: string,
}

interface IUserState {
  user: IUser | null,
  loading: boolean,
  error: string | null,
}

const initialState: IUserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;