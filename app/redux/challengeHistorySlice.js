import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  challengeHistory: [],
  loading: false,
  error: null,
};

const challengeHistorySlice = createSlice({
  name: 'challengeHistory',
  initialState,
  reducers: {
    setChallengeHistory(state, action) {
      state.challengeHistory = action.payload;
      state.error = null;
    },
    addChallengeHistory(state, action) {
      state.challengeHistory.push(action.payload);
      state.error = null;
    },
    updateChallengeHistory(state, action) {
      const idx = state.challengeHistory.findIndex(i => i.id === action.payload.id);
      if (idx !== -1) state.challengeHistory[idx] = action.payload;
    },
    removeChallengeHistory(state, action) {
      state.challengeHistory = state.challengeHistory.filter(i => i.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setChallengeHistory, addChallengeHistory, updateChallengeHistory, removeChallengeHistory, setLoading, setError } = challengeHistorySlice.actions;
export default challengeHistorySlice.reducer;
