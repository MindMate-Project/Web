import {
    CREATE_NEW_USER,
    LOGIN_USER,
    GET_CURRENT_USER,
    FOREGT_PASSWORD,
    VERIFY_RESET_CODE,
    RESET_PASSWORD,
} from "../type";

const initial = {
    createUser: [],
    loginUser: [],
    currentUser: [],
    forgetPassword: [],
    verifyResetCode: [],
    resetPassword: [],
    loading: true,
};
const authReducer = (state = initial, action) => {
    switch (action.type) {
        case CREATE_NEW_USER:
            return {
                ...state,
                createUser: action.payload,
                loading: false,
            };
        case LOGIN_USER:
            return {
                ...state,
                loginUser: action.payload,
                loading: false,
            };
        case GET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            };
        case FOREGT_PASSWORD:
            return {
                ...state,
                forgetPassword: action.payload,
            };
        case VERIFY_RESET_CODE:
            return {
                ...state,
                verifyResetCode: action.payload,
            };
        case RESET_PASSWORD:
            return {
                ...state,
                resetPassword: action.payload,
            };
        default:
            return state;
    }
};
export default authReducer;
