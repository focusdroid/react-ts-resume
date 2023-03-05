import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'

interface CounterSlice {
    values: number
}

const initialState:CounterSlice = {
    values: 11
}

export const counter = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.values += 1
        },
        decrement: (state) => {
            state.values -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.values += action.payload
        }
    }
})

export const { increment, incrementByAmount, decrement } = counter.actions

export const selectCount = (state:RootState) => state.counter
export default counter
