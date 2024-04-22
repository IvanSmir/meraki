import { useReducer } from "react";
import { AuthContext, authReducer } from "./";
import PropTypes from "prop-types";

const init = () => {
    return JSON.parse(localStorage.getItem('auth')) || { isAuthenticated: false };
}
export const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {}, init);
    const login = (user) => {
        const { firstName, lastName, userName, picture } = user;
        const action = {
            type: '[auth] login',
            payload: { firstName, lastName, userName, picture }
        }
        localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user }));
        dispatch(action);

    }
    const logout = () => {
        const action = {
            type: '[auth] logout'
        }
        localStorage.removeItem('auth');
        dispatch(action);
    }
    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}
