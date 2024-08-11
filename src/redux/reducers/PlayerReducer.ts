import {IPlayerState, PlayerActionType, Track} from "../../types/playerTypes.ts";


const initState: IPlayerState = {
    isPlaying: false,
    track: undefined,
    history: [],
    queue: []
}

export const PlayerReducer = (state=initState, action: any) : IPlayerState => {

    switch(action.type) {
        case PlayerActionType.PREVIOUS_TRACK: {
            return {
                isPlaying: true,
                queue: state.history.length > 0 && state.track ? [state.track, ...state.queue] : state.queue,
                track: state.history.length > 0 ? state.history[state.history.length-1] : state.track,
                history: state.history.length > 0 ? state.history.slice(0, state.history.length - 1) : state.history

            };
        }
        case PlayerActionType.NEXT_TRACK: {
            return {
                isPlaying: true,
                history: state.queue.length && state.track ? [...state.history, state.track] : state.history,
                track: state.queue.length > 0 ? state.queue[0] : state.track,
                queue: state.queue.length > 0 ? state.queue.slice(1) : state.queue
            };
        }
        case PlayerActionType.ADD_TO_QUEUE: {
            return {
                isPlaying: state.isPlaying,
                history: state.history,
                track: state.track,
                queue: [...state.queue, action.payload]
            };
        }
        case PlayerActionType.SET_TRACK: {
            const track = action.payload as Track;
            return {
                isPlaying: true,
                history: state.track ? [...state.history, state.track] : state.history,
                track: track,
                queue: state.queue
            };
        }
        case PlayerActionType.CHANGE_PLAYING: {
            return {
                isPlaying: !state.isPlaying,
                track: state.track,
                history: state.history,
                queue: state.queue
            };
        }
    }
    return state;
}