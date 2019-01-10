import { combineReducers } from 'redux';
import bookReducer from './book';

const rootReducer = combineReducers({
    bookState: bookReducer
});

export default rootReducer;