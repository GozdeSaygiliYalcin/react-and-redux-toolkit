import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialStateUser = {
  userProfiles: [],
  isLoading: false,
  isMoreLoading: false,
  page: 0,
  userProfile: {
    authId: 0,
    userName: "",
    email: "",
  },
};
/**
 * yönetilebilir fetch işlemleri için kullanılır
 * her thunk ismi uniq olmalıdır
 */
export const fetchSaveUserProfile = createAsyncThunk(
  "user/fetchSaveUserProfile",
  async (user) => {
    fetch("http://34.69.208.110:9092/v1/api/user/newcreateuser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Encoding": "br;q=1.0, gzip;q=0.8, *;q=0.1",
      },
      body: JSON.stringify(user),
    })
      .then((data) => {
        setPage(0);
        getAllUsers(0);
      })
      .catch((err) => console.log("something went wrong ", err));
  }
);
export const fetchGetAllUsers = createAsyncThunk(
  "user/fetchGetAllUsers",
  async () => {
    const result = await fetch(
      `http://34.69.208.110:9092/v1/api/user/findallslice?currentPage=${currentPage}&pageSize=8&sortParameter=id&direction=desc`
    )
      .then((p) => p.json())
      .catch((err) => console.log(err));
    return result;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    /**
     * buradaki state en başta tanımladığımız
     * initial state e atadığımz değerleri değiştirmek için kullanılır.
     * Action, buraya dışarıdan girilecek dataları tanımlar
     */
    nextPage: (state) => {
      state.page = state.page + 1;
    },
    setAuthId: (state, action) => {
      state.userProfile = { ...state.userProfile, authId: action.payload };
    },
    setUserName: (state, action) => {
      state.userProfile = { ...state.userProfile, userName: action.payload };
    },
    setEmail: (state, action) => {
      state.userProfile = { ...state.userProfile, email: action.payload };
    },
    setUserProfile: (state, action) => {
      state.userProfile = { ...state.userProfile, ...action.payload };
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchSaveUserProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    build.addCase(fetchSaveUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    build.addCase(fetchSaveUserProfile.rejected, (state, action) => {
      state.isLoading = false;
    });
    build.addCase(fetchGetAllUsers.pending, (state, action) => {
      state.isLoading = false;
    });
    build.addCase(fetchGetAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userProfileList = action.payload.content;
    });
    build.addCase(fetchGetAllUsers.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export const { nextPage, setAuthId, setUserName, setEmail, setUserProfile } =
  userSlice.actions;
export default userSlice.reducer;
