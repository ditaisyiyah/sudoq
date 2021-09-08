import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import sugokuReducer from './sugoku/reducer';
import playersReducer from './players/reducer';

const store = createStore(combineReducers({
  sugoku: sugokuReducer,
  players: playersReducer
}), applyMiddleware(thunk));

export default store;