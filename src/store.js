import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import ExerciseListReducer from './redux/reducer/ExerciseListReducer';

export default createStore (
    combineReducers({
        ExerciseListReducer,
    }),
    applyMiddleware(
        logger, reduxThunk,
    )
)