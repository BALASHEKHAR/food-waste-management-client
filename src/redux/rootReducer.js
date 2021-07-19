import { combineReducers } from 'redux';
import userReducer from './reducer/userReducer';
import postReducer from './reducer/postsReducer';

const rootReducer = combineReducers({
    user: userReducer,
    posts: postReducer,
});

export default rootReducer;