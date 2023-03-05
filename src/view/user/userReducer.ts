import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/index'

interface UserSlice {
    user: any
}

const initialState:UserSlice = {
    user: {
        name: "tree"
    }
}

export const userReducer = createSlice({
    name: 'users',
    initialState,
    reducers: {
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.user += action.payload
        }
    }
})

export const { incrementByAmount } = userReducer.actions

export const selectCount = (state:RootState) => state.user
export default userReducer
