import {
    LOAD_USER,
    LOGIN_USER,
    SIGNUP_USER,
    LOGOUT_USER,
    ERROR,
    UP_VOTE,
    UPDATE_USER
} from '../actionTypes';

let intiState = {
    user: null,
    loading: true,
    error: null
}

const userReducer = (state = intiState, action) => {
    switch (action.type) {
        case LOAD_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case SIGNUP_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                loading: false
            };
        case UPDATE_USER:
            state.user = action.payload;
            return {
                ...state
            }
        // case UP_VOTE:
        //     if (state.user.points.includes(action.payload)) {
        //         state.user.points = state.user.points.filter(userid => userid !== action.payload);
        //     }
        //     else {
        //         state.user.points.push(action.payload);
        //     }
        //     return {
        //         ...state,
        //     }
        case ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

export default userReducer