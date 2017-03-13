import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import NoteViewReducer from "./reducers/NoteViewReducer";
import NoteEditReducer from "./reducers/NoteEditReducer";
import GuiReducer from "./reducers/GuiReducer";

export default createStore(
    combineReducers({
        NoteViewReducer,
        NoteEditReducer,
        GuiReducer
    }),
    {},
    applyMiddleware(logger(), thunk)
);