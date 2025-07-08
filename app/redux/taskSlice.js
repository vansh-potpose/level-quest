import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
      state.error = null;
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
      state.error = null;
    },
    updateTask(state, action) {
      const idx = state.tasks.findIndex(i => i.id === action.payload.id);
      if (idx !== -1) state.tasks[idx] = action.payload;
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter(i => i.id !== action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setTasks, addTask, updateTask, removeTask, setLoading, setError } = taskSlice.actions;
export default taskSlice.reducer;
