import { createSlice } from '@reduxjs/toolkit';
import { searchAsync } from './asyncActions';
import { SearchState, Status } from './types';

const initialState: SearchState = {
  email: '',
  number: '',
  results: [],
  status: Status.IDLE,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setNumber: (state, action) => {
      state.number = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(searchAsync.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.results = action.payload;
      })
      .addCase(searchAsync.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.payload as string;
      });
  },
});

export const { setEmail, setNumber } = searchSlice.actions;

export default searchSlice.reducer;
