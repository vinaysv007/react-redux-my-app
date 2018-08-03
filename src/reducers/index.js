import { combineReducers } from "redux";
import signUpReducer from './SignUpReducer';
import flashMessageReducer from './FlashMessageReducer';
import forgotPwdReducer from './ForgotPasswordReducer';
import resetPwdReducer from './ResetPasswordReducer';
import loginReducer from "./LoginReducer";
import { users, message } from "./ChatAppReducer";

export default combineReducers({
    signUp: signUpReducer,
    flashMessages: flashMessageReducer,
    login: loginReducer,
    forgotPwd: forgotPwdReducer,
    resetPwd: resetPwdReducer,
    chatUsers: users,
    chatMessages: message
});