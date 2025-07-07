import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  challenges: [],
  loading: false,
  error: null,
};

const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    setChallenges(state, action) {
      state.challenges = action.payload;
      state.error = null;
    },
    addChallenge(state, action) {
      state.challenges.push(action.payload);
      state.error = null;
    },
    updateChallenge(state, action) {
      const idx = state.challenges.findIndex(i => i.id === action.payload.id);
      if (idx !== -1) state.challenges[idx] = action.payload;
    },
    removeChallenge(state, action) {
      state.challenges = state.challenges.filter(i => i.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setChallenges, addChallenge, updateChallenge, removeChallenge, setLoading, setError } = challengeSlice.actions;
export default challengeSlice.reducer;
