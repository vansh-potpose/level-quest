import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subquests: [],
  loading: false,
  error: null,
};

const subquestSlice = createSlice({
  name: 'subquests',
  initialState,
  reducers: {
    setSubquests(state, action) {
      state.subquests = action.payload;
      state.error = null;
    },
    addSubquest(state, action) {
      state.subquests.push(action.payload);
      state.error = null;
    },
    updateSubquest(state, action) {
      const idx = state.subquests.findIndex(i => i.id === action.payload.id);
      if (idx !== -1) state.subquests[idx] = action.payload;
    },
    removeSubquest(state, action) {
      state.subquests = state.subquests.filter(i => i.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setSubquests, addSubquest, updateSubquest, removeSubquest, setLoading, setError } = subquestSlice.actions;
export default subquestSlice.reducer;
