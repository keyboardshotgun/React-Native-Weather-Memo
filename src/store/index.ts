import {combineReducers} from 'redux';
import weatherReducer from '../reducer/weatherReducer';
//import { createSelectorHook, TypedUseSelectorHook  } from "react-redux";

const rootReducer = combineReducers({
  weatherReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;
//export const useMySelector  = createSelectorHook<RootReducerType>();

export default rootReducer;
