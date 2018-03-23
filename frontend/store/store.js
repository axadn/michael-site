import {createStore, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "../reducers/root_reducer";
import logger from "redux-logger";

export default ()=> createStore(
    rootReducer, null, applyMiddleware(ReduxThunk, logger)
);