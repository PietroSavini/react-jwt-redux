import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'
import authReducer from '../../auth/authSlice'

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },

    //il concat sul middleware mi serve per inserire il middleware di Redux toolkit Query all' interno del middleware base dello store redux
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch