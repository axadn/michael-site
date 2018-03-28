import {createStore, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "../reducers/reducer";
import logger from "redux-logger";

export default createStore(
    rootReducer, {logged_in: false}, applyMiddleware(ReduxThunk, logger)
);