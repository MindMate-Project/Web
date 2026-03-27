import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useGetDataToken } from '../../hooks/useGetData';
import { useInsertDataToken } from '../../hooks/useInsertData';
import { useUpdateData } from '../../hooks/useUpdateData';
import useDeleteData from '../../hooks/useDeleteData';

// 1. Create memory POST /api/memories
export const createMemory = createAsyncThunk(
    'memory/createMemory',
    async (body, thunkAPI) => {
        try {
            const res = await useInsertDataToken('/api/memories', body);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({
                data: error.response?.data,
                status: error.response?.status,
                message: error.message,
            });
        }
    }
);

// 2. Get all memories GET /api/memories/patient/:patientId
export const getAllMemories = createAsyncThunk(
    'memory/getAllMemories',
    async (patientId, thunkAPI) => {
        try {
            const res = await useGetDataToken(`/api/memories/patient/${patientId}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// 3. Get memory by id GET /api/memories/:id
export const getMemoryById = createAsyncThunk(
    'memory/getMemoryById',
    async (id, thunkAPI) => {
        try {
            const res = await useGetDataToken(`/api/memories/${id}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// 4. Update memory PUT /api/memories/:id
export const updateMemory = createAsyncThunk(
    'memory/updateMemory',
    async ({ id, body }, thunkAPI) => {
        try {
            const res = await useUpdateData(`/api/memories/${id}`, body);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({
                data: error.response?.data,
                status: error.response?.status,
                message: error.message,
            });
        }
    }
);

// 5. Delete memory DELETE /api/memories/:id
export const deleteMemory = createAsyncThunk(
    'memory/deleteMemory',
    async (id, thunkAPI) => {
        try {
            const res = await useDeleteData(`/api/memories/${id}`);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// 6. Search memories GET /api/memories/search?tags=family,mother
export const searchMemories = createAsyncThunk(
    'memory/searchMemories',
    async (tags, thunkAPI) => {
        try {
            const res = await useGetDataToken(`/api/memories/search?tags=${tags}`);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    memories: [],
    memory: {},
    searchResults: [],
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    loading: false,
    error: null,
};

const memorySlice = createSlice({
    name: 'memory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // createMemory
            .addCase(createMemory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createMemory.fulfilled, (state, action) => {
                state.loading = false;
                state.createStatus = action.payload;
            })
            .addCase(createMemory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getAllMemories
            .addCase(getAllMemories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMemories.fulfilled, (state, action) => {
                state.loading = false;
                state.memories = action.payload;
            })
            .addCase(getAllMemories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getMemoryById
            .addCase(getMemoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMemoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.memory = action.payload;
            })
            .addCase(getMemoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // updateMemory
            .addCase(updateMemory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMemory.fulfilled, (state, action) => {
                state.loading = false;
                state.updateStatus = action.payload;
            })
            .addCase(updateMemory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // deleteMemory
            .addCase(deleteMemory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMemory.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteStatus = action.payload;
            })
            .addCase(deleteMemory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // searchMemories
            .addCase(searchMemories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchMemories.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchMemories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default memorySlice.reducer;
