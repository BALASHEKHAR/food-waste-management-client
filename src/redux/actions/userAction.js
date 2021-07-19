import {
    LOAD_USER,
    LOGIN_USER,
    SIGNUP_USER,
    LOGOUT_USER,
    ERROR
} from '../actionTypes';
import axios from 'axios'

export const LoadUser = () => {
    return async (dispatch, getState) => {
        try {
            let token = localStorage.getItem("token");
            if (!token) {
                dispatch({ type: ERROR, payload: "token not found" });
                return;
            }
            const user = await axios.get('/api/auth/getuser', {
                headers: {
                    "authentication": token
                }
            });


            dispatch({ type: LOAD_USER, payload: user.data })
        } catch (err) {
            dispatch({ type: ERROR, payload: err.response.data })
        }
    }
}