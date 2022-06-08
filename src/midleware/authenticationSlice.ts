import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const JWT_STORAGE_KEY = "jwt"

interface JwtState {
    jwtToken: string | null
}

const initialState: JwtState = {
    jwtToken: localStorage.getItem(JWT_STORAGE_KEY)
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setJwtToken: (state, action: PayloadAction<string>) => {
            state.jwtToken = action.payload
            localStorage.setItem(JWT_STORAGE_KEY, action.payload)
        }
    }
})

export const { setJwtToken } = authenticationSlice.actions

export default authenticationSlice.reducer