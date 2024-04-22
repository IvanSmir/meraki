import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import PropTypes from 'prop-types'
import { AuthContext } from "../../Auth/context"



export const PrivateRoute = ({ children }) => {
    const { authState } = useContext(AuthContext);
    const logged = authState.isAuthenticated;
    const { pathname } = useLocation();
    const lastPath = `${pathname}`;
    localStorage.setItem('lastPath', lastPath);



    return (
        logged ? children : <Navigate to='/auth/login' />
    )
}


PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
}
