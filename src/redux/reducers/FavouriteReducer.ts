
import {FavouriteActionType, IFavouriteState} from "../../types/favouriteTypes.ts";
import {Track} from "../../types/playerTypes.ts";


const initState: IFavouriteState = {
    favourites: []
}

export const FavouriteReducer = (state=initState, action: any) : IFavouriteState => {

    switch(action.type) {
        case FavouriteActionType.ADD_FAVOURITE: {
            const track = action.payload as Track;
            return {
                favourites: state.favourites.some(t => t == track) ? state.favourites : [...state.favourites, track]
            };
        }
        case FavouriteActionType.REMOVE_FAVOURITE: {
            const track = action.payload as Track;
            return {
                favourites: state.favourites.filter(t => t !== track)
            };
        }
    }
    return state;
}