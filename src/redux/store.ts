import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {PlayerReducer} from "./reducers/PlayerReducer.ts";


export const rootReducer = combineReducers({
    player: PlayerReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
});