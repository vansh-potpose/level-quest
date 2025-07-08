import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dailyChallenges: [],
  loading: false,
  error: null,
};

const dailyChallengeSlice = createSlice({
  name: 'dailyChallenges',
  initialState,
  reducers: {
    setDailyChallenges(state, action) {
      state.dailyChallenges = action.payload;
      state.error = null;
    },
    addDailyChallenge(state, action) {
      state.dailyChallenges.push(action.payload);
      state.error = null;
    },
    updateDailyChallenge(state, action) {
      const idx = state.dailyChallenges.findIndex(i => i.id === action.payload.id);
      if (idx !== -1) state.dailyChallenges[idx] = action.payload;
    },
    removeDailyChallenge(state, action) {
      state.dailyChallenges = state.dailyChallenges.filter(i => i.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setDailyChallenges, addDailyChallenge, updateDailyChallenge, removeDailyChallenge, setLoading, setError } = dailyChallengeSlice.actions;
export default dailyChallengeSlice.reducer;
