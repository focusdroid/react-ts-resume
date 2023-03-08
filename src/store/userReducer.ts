import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './index'
import {PartialUserInfo, UserInfo} from "../utils/type";

interface UserSlice {
    user: PartialUserInfo<UserInfo>
}

const initialState:UserSlice = {
    user: {}
}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserInfoReducer: (state = initialState, action: any) => {
            console.log("state, action", state, action, action.type)
            if (action.type === "users/addUserInfo") {
                state.user = action.payload
                console.log("state user",state.user)
            }
        }
    }
})

export const { addUserInfoReducer } = userReducer.actions

export const selectCount = (state:RootState) => state.user
export default userReducer
