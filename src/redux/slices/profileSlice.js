import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useGetDataToken } from "../../hooks/useGetData";
import { usePatchData } from "../../hooks/useUpdateData";
import baseUrl from "../../API/baseURL";

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

// UPLOAD Profile Picture
export const uploadProfilePicture = createAsyncThunk(
  "profile/uploadProfilePicture",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const res = await baseUrl.post(
        "/api/users/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// DELETE Profile Picture
export const deleteProfilePicture = createAsyncThunk(
  "profile/deleteProfilePicture",
  async (_, thunkAPI) => {
    try {
      const res = await baseUrl.delete("/api/users/profile-picture", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateStatus: null,
  isUploadingPhoto: false,
  isDeletingPhoto: false,
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
      })

      // UPLOAD PROFILE PICTURE
      .addCase(uploadProfilePicture.pending, (state) => {
        state.isUploadingPhoto = true;
        state.error = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.isUploadingPhoto = false;
        // The API returns the new URL in `action.payload.data.profilePicture` (as per the Swagger docs)
        if (state.profile && action.payload?.data?.profilePicture) {
          state.profile.profilePicture = action.payload.data.profilePicture;
        }
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.isUploadingPhoto = false;
        state.error = action.payload;
      })

      // DELETE PROFILE PICTURE
      .addCase(deleteProfilePicture.pending, (state) => {
        state.isDeletingPhoto = true;
        state.error = null;
      })
      .addCase(deleteProfilePicture.fulfilled, (state) => {
        state.isDeletingPhoto = false;
        // Revert profile picture back to null or default
        if (state.profile) {
          state.profile.profilePicture = null;
        }
      })
      .addCase(deleteProfilePicture.rejected, (state, action) => {
        state.isDeletingPhoto = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileState } = profileSlice.actions;

export default profileSlice.reducer;

