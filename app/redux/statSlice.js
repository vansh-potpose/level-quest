import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stats: [],
  loading: false,
  error: null,
};

const statSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setStats(state, action) {
      state.stats = action.payload;
      state.error = null;
    },
    addStat(state, action) {
      state.stats.push(action.payload);
      state.error = null;
    },
    updateStat(state, action) {
      const idx = state.stats.findIndex(i => i.id === action.payload.id);
      if (idx !== -1) state.stats[idx] = action.payload;
    },
    removeStat(state, action) {
      state.stats = state.stats.filter(i => i.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setStats, addStat, updateStat, removeStat, setLoading, setError } = statSlice.actions;
export default statSlice.reducer;
