import { createSlice } from "@reduxjs/toolkit";
export interface AuthState {
  token: "";
  isAuthenticad: Boolean;
  isLoading: Boolean;
  auth: Array<any>;
}

const initialStateAuth: AuthState = {
  token: "",
  isAuthenticad: false,
  isLoading: false,
  auth: [],
};
/**
 * bu function global state yönetimini yapacak olan kısım
 * dataların initial değerleri olabilir
 */
const authSlice = createSlice({
  name: "auth",
  initialState: initialStateAuth,
  reducers: {},
  extraReducers: {},
});

//store reducer istediği için authSlice reduceer olarak export ediliyor
export default authSlice.reducer;
