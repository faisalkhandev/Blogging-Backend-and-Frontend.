/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoutes = ({ children }) => {
    const token = Cookies.get('token');

    return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
