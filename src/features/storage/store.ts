import { configureStore } from '@reduxjs/toolkit'
import storageReducer from './storageSlice'

const store = configureStore({
    reducer: {
        storage: storageReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store