import { combineReducers } from "redux";

import loginReducer from "./LoginReducer";

const AppReducer = combineReducers({ loginReducer });

export default AppReducer;
