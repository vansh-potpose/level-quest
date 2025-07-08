import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rewards: [],
  loading: false,
  error: null,
};

const rewardSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    setRewards(state, action) {
      state.rewards = action.payload;
      state.error = null;
    },
    addReward(state, action) {
      state.rewards.push(action.payload);
      state.error = null;
    },
    updateReward(state, action) {
      const idx = state.rewards.findIndex(i => i.id === action.payload.id);
      if (idx !== -1) state.rewards[idx] = action.payload;
    },
    removeReward(state, action) {
      state.rewards = state.rewards.filter(i => i.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setRewards, addReward, updateReward, removeReward, setLoading, setError } = rewardSlice.actions;
export default rewardSlice.reducer;
