import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import sugokuReducer from './sugoku/reducer';

const store = createStore(combineReducers({
  sugoku: sugokuReducer
}), applyMiddleware(thunk));

export default store;