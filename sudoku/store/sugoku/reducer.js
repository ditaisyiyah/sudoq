import { SUGOKU_GET, SUGOKU_UPDATE, SUGOKU_VALIDATE, SUGOKU_SOLVE } from "./actionType";

const initialState = {
  board: [],
  status: '',
}

export default function reducer (state = initialState, action){
  switch (action.type) {
    case SUGOKU_GET:
      return {
        ...state,
        board: action.payload
      }
    case SUGOKU_UPDATE:
      return {
        ...state,
        board: action.payload
      }
    case SUGOKU_VALIDATE:
      return {
        ...state,
        status: action.payload
      }
    default:
      return state
  }
}