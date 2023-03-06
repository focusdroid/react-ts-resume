import {counter} from "./counterSlice";
import userReducer from "./userReducer";

export default {
    counter: counter.reducer,
    user: userReducer.reducer
}
