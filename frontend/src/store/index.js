import { combineReducers } from "redux";
import user from "./userSlice";
import post from "./postSlice";
export default combineReducers({ user, post });
