import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dailyRewards: [],
  loading: false,
  error: null,
};

const dailyRewardSlice = createSlice({
  name: 'dailyRewards',
  initialState,
  reducers: {
    setDailyRewards(state, action) {
      state.dailyRewards = action.payload;
      state.error = null;
    },
    addDailyReward(state, action) {
      state.dailyRewards.push(action.payload);
      state.error = null;
    },
    updateDailyReward(state, action) {
      const idx = state.dailyRewards.findIndex(i => i.id === action.payload.id);
      if (idx !== -1) state.dailyRewards[idx] = action.payload;
    },
    removeDailyReward(state, action) {
      state.dailyRewards = state.dailyRewards.filter(i => i.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setDailyRewards, addDailyReward, updateDailyReward, removeDailyReward, setLoading, setError } = dailyRewardSlice.actions;
export default dailyRewardSlice.reducer;
