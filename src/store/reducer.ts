import {counter} from "./counterSlice";
import { userReducer } from "../view/user/userReducer";

export default {
    counter: counter.reducer,
    user: userReducer.reducer
}
