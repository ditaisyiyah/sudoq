import { SUGOKU_GET } from "./actionType";

const initialState = {
  board: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUGOKU_GET:
      return {
        ...state,
        board: action.payload
      }
    default:
      return state
  }
}