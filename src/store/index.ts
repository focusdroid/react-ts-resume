/**
 * @author: focusroid
 * @description: redux store
 * @version: 1.0
 * @time：2023-03-01 17:21:54
**/
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
