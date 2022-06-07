import { createStore } from 'redux';
import { applyMiddleware, combineReducers, compose } from "redux";
import  thunk  from "redux-thunk";
import { productReducers } from "./reducers/productReducers";

const initialState = {};
const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productReducers,
  }),
  initialState,
  composeEnchancer(applyMiddleware(thunk))
);

export default store;