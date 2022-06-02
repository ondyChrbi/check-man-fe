import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface JwtState {
    jwtToken: string
}

const initialState: JwtState = {
    jwtToken: ""
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setJwtToken: (state, action: PayloadAction<string>) => {
            state.jwtToken = action.payload
        }
    }
})

export const { setJwtToken } = authenticationSlice.actions

export default authenticationSlice.reducer