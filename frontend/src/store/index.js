import { combineReducers } from "redux";
import user from "./userSlice";
import post from "./postSlice";
import progress from "./progressSlice";
export default combineReducers({ user, post, progress });
