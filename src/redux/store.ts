import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {PlayerReducer} from "./reducers/PlayerReducer.ts";
import {FavouriteReducer} from "./reducers/FavouriteReducer.ts";


export const rootReducer = combineReducers({
    player: PlayerReducer,
    favourite: FavouriteReducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
});