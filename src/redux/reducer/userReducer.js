import {
    LOAD_USER,
    LOGIN_USER,
    SIGNUP_USER,
    LOGOUT_USER,
    ERROR
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