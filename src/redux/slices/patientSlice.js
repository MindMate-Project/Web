import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useGetDataToken } from "../../hooks/useGetData";
import { useInsertDataToken } from '../../hooks/useInsertData';
import { usePatchData } from '../../hooks/useUpdateData';
import useDeleteData from '../../hooks/useDeleteData';

// 1. Get all patients /api/caregiver/patients
export const getAllPatients = createAsyncThunk(
    'patient/getAllPatients',
    async (_, thunkAPI) => {
        try {
            const res = await useGetDataToken('/api/caregiver/patients');
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// 2. Get patient data /api/caregiver/patients/:id
export const getPatientData = createAsyncThunk(
    'patient/getPatientData',
    async (id, thunkAPI) => {
        try {
            const res = await useGetDataToken(`/api/caregiver/patients/${id}`);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// 3. Assign patient request /api/caregiver/patients/assignment-request
export const assignPatientRequest = createAsyncThunk(
    'patient/assignPatientRequest',
    async (data, thunkAPI) => {
        try {
            const res = await useInsertDataToken('/api/caregiver/patients/assignment-request', data);
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

// 4. Delete patient from caregiver /api/caregiver/patients/remove/:id
export const deletePatient = createAsyncThunk(
    'patient/deletePatient',
    async (id, thunkAPI) => {
        try {
            const res = await useDeleteData(`/api/caregiver/patients/remove/${id}`);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// 5. Update patient data /api/caregiver/patients/update/:id
export const updatePatientData = createAsyncThunk(
    'patient/updatePatientData',
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await usePatchData(`/api/caregiver/patients/update/${id}`, data);
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

const initialState = {
    patients: [],
    patient: {},
    assignRequest: null,
    deleteStatus: null,
    updateStatus: null,
    loading: false,
    error: null,
};

const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getAllPatients
            .addCase(getAllPatients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPatients.fulfilled, (state, action) => {
                state.loading = false;
                state.patients = action.payload; // Adjust if the API returns wrapped data
            })
            .addCase(getAllPatients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getPatientData
            .addCase(getPatientData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPatientData.fulfilled, (state, action) => {
                state.loading = false;
                state.patient = action.payload; // Adjust if the API returns wrapped data
            })
            .addCase(getPatientData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // assignPatientRequest
            .addCase(assignPatientRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(assignPatientRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.assignRequest = action.payload;
            })
            .addCase(assignPatientRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // deletePatient
            .addCase(deletePatient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePatient.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteStatus = action.payload;
            })
            .addCase(deletePatient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // updatePatientData
            .addCase(updatePatientData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePatientData.fulfilled, (state, action) => {
                state.loading = false;
                state.updateStatus = action.payload;
            })
            .addCase(updatePatientData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default patientSlice.reducer;
