import {IPlayerState, PlayerActionType, Track} from "../../types/playerTypes.ts";


const initState: IPlayerState = {
    isPlaying: false,
    track: undefined
}

export const PlayerReducer = (state=initState, action: any) : IPlayerState => {

    switch(action.type) {
        case PlayerActionType.SET_TRACK: {
            const track = action.payload as Track;
            return {
                isPlaying: true,
                track: track
            };
        }
        case PlayerActionType.CHANGE_PLAYING: {
            return {
                isPlaying: !state.isPlaying,
                track: state.track
            };
        }
    }
    return state;
}