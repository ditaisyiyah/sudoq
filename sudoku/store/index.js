import { Tuple, configureStore } from "@reduxjs/toolkit";
import { thunk } from 'redux-thunk';
import sugokuReducer from './sugoku/reducer';
import playersReducer from './players/reducer';

const store = configureStore({
  reducer: {
    sugoku: sugokuReducer,
    players: playersReducer
  },
  middleware: () => new Tuple(thunk),
});

export default store;