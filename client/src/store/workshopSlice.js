import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchWorkshops = createAsyncThunk(
  'workshops/fetchWorkshops',
  async () => {
    const response = await axios.get('/api/workshops');
    return response.data;
  }
);

export const fetchWorkshopById = createAsyncThunk(
  'workshops/fetchWorkshopById',
  async (id) => {
    const response = await axios.get(`/api/workshops/${id}`);
    return response.data;
  }
);

export const createWorkshop = createAsyncThunk(
  'workshops/createWorkshop',
  async (workshopData) => {
    const response = await axios.post('/api/workshops', workshopData);
    return response.data;
  }
);

export const updateWorkshop = createAsyncThunk(
  'workshops/updateWorkshop',
  async ({ id, workshopData }) => {
    const response = await axios.patch(`/api/workshops/${id}`, workshopData);
    return response.data;
  }
);

export const deleteWorkshop = createAsyncThunk(
  'workshops/deleteWorkshop',
  async (id) => {
    await axios.delete(`/api/workshops/${id}`);
    return id;
  }
);

const workshopSlice = createSlice({
  name: 'workshops',
  initialState: {
    items: [],
    currentWorkshop: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch workshops
      .addCase(fetchWorkshops.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWorkshops.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchWorkshops.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch single workshop
      .addCase(fetchWorkshopById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWorkshopById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentWorkshop = action.payload;
      })
      .addCase(fetchWorkshopById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Create workshop
      .addCase(createWorkshop.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update workshop
      .addCase(updateWorkshop.fulfilled, (state, action) => {
        const index = state.items.findIndex(workshop => workshop._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentWorkshop?._id === action.payload._id) {
          state.currentWorkshop = action.payload;
        }
      })
      // Delete workshop
      .addCase(deleteWorkshop.fulfilled, (state, action) => {
        state.items = state.items.filter(workshop => workshop._id !== action.payload);
        if (state.currentWorkshop?._id === action.payload) {
          state.currentWorkshop = null;
        }
      });
  }
});

export default workshopSlice.reducer;