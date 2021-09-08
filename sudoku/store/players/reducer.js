import { PLAYER_SET } from "./actionType";

const initialState = {
  players: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_SET:
      console.log(action.payload, 'di reducer');
      return {
        ...state,
        players: [...state.players, action.payload]
      }
    default:
      return state
  }
}