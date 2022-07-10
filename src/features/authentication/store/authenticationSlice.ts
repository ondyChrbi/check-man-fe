import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    deleteAuthenticationInfoToLocalStorage,
    EmptyJwtInfo,
    getAuthenticationInfoFromLocalStorage,
    JwtInfo,
    saveAuthenticationInfoToLocalStorage
} from "../helper";

export interface AuthenticationInfo {
    jwtInfo: JwtInfo | null | undefined
}

const initialState = {
    jwtInfo: getAuthenticationInfoFromLocalStorage()
} as AuthenticationInfo;

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setJwtToken: (state, action: PayloadAction<JwtInfo>) => {
            state.jwtInfo = action.payload;

            saveAuthenticationInfoToLocalStorage(action.payload)
        },
        disableJwtToken: (state) => {
            state.jwtInfo = EmptyJwtInfo;
            deleteAuthenticationInfoToLocalStorage();
        }
    }
})

export const { setJwtToken, disableJwtToken } = authenticationSlice.actions
export default authenticationSlice.reducer