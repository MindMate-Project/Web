import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useGetDataToken } from "../../hooks/useGetData";
import { usePatchData } from "../../hooks/useUpdateData";

// GET Caregiver Profile
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, thunkAPI) => {
    try {
      const res = await useGetDataToken("/api/caregiver");
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// UPDATE Caregiver Profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data, thunkAPI) => {
    try {
      const res = await usePatchData(
        "/api/caregiver/update",
        data
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        data: error.response?.data,
        message: error.message,
      });
    }
  }
);

const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateStatus: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileState: (state) => {
      state.error = null;
      state.updateStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // GET PROFILE
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload?.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE PROFILE
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.updateStatus = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileState } = profileSlice.actions;

export default profileSlice.reducer;

