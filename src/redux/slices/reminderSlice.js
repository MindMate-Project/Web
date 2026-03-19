import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useGetDataToken } from "../../hooks/useGetData";
import { useInsertDataToken } from '../../hooks/useInsertData';
import { useUpdateData } from '../../hooks/useUpdateData';
import useDeleteData from '../../hooks/useDeleteData';

// Get all reminders for a specific patient
export const getRemindersByPatient = createAsyncThunk(
    'reminder/getRemindersByPatient',
    async (patientId, thunkAPI) => {
        try {
            const res = await useGetDataToken(`/api/reminders/patient/${patientId}`);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Create a new reminder
export const createReminder = createAsyncThunk(
    'reminder/createReminder',
    async (data, thunkAPI) => {
        try {
            const res = await useInsertDataToken(`/api/reminders`, data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({
                data: error.response?.data,
                status: error.response?.status,
                message: error.message
            });
        }
    }
);

// Update reminder data
export const updateReminder = createAsyncThunk(
    'reminder/updateReminder',
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await useUpdateData(`/api/reminders/${id}`, data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({
                data: error.response?.data,
                status: error.response?.status,
                message: error.message
            });
        }
    }
);

// Delete reminder by id
export const deleteReminder = createAsyncThunk(
    'reminder/deleteReminder',
    async (id, thunkAPI) => {
        try {
            const res = await useDeleteData(`/api/reminders/${id}`);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    reminders: [],
    createdReminder: null,
    deleteStatus: null,
    updateStatus: null,
    loading: false,
    error: null,
};

const reminderSlice = createSlice({
    name: 'reminder',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle get reminders
            .addCase(getRemindersByPatient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRemindersByPatient.fulfilled, (state, action) => {
                state.loading = false;
                state.reminders = action.payload;
            })
            .addCase(getRemindersByPatient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle create reminder
            .addCase(createReminder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReminder.fulfilled, (state, action) => {
                state.loading = false;
                // Add the new reminder directly to reminders array
                state.reminders.push(action.payload);
                state.createdReminder = action.payload; // optional
            })
            .addCase(createReminder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle update reminder
            .addCase(updateReminder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateReminder.fulfilled, (state, action) => {
                state.loading = false;
                // Update the reminder in the array
                const index = state.reminders.findIndex(r => r._id === action.payload._id);
                if (index !== -1) {
                    state.reminders[index] = action.payload;
                }
                state.updateStatus = action.payload;
            })
            .addCase(updateReminder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle delete reminder
            .addCase(deleteReminder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteReminder.fulfilled, (state, action) => {
                state.loading = false;
                // Remove the deleted reminder from array
                state.reminders = state.reminders.filter(
                    (r) => r._id !== action.meta.arg
                );
                state.deleteStatus = action.payload; // optional
            })
            .addCase(deleteReminder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default reminderSlice.reducer;