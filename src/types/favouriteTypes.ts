import {Track} from "./playerTypes.ts";

export enum FavouriteActionType {
    ADD_FAVOURITE = "ADD_FAVOURITE",
    REMOVE_FAVOURITE = "REMOVE_FAVOURITE",
}

export interface IFavouriteState {
    favourites: Track[]
}