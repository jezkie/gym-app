import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import ExerciseListReducer from './component/ExerciseListReducer';

export default createStore (
    combineReducers({
        ExerciseListReducer,
    }),
    applyMiddleware(
        logger, reduxThunk,
    )
)