import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quests: [],
  loading: false,
  error: null,
};

const questSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    setQuests(state, action) {
      state.quests = action.payload;
      state.error = null;
    },
    addQuest(state, action) {
      state.quests.push(action.payload);
      state.error = null;
    },
    updateQuest(state, action) {
      const idx = state.quests.findIndex(q => q.id === action.payload.id);
      if (idx !== -1) state.quests[idx] = action.payload;
    },
    removeQuest(state, action) {
      state.quests = state.quests.filter(q => q.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setQuests, addQuest, updateQuest, removeQuest, setLoading, setError } = questSlice.actions;
export default questSlice.reducer;
