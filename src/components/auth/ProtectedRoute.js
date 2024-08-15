import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedRoute = ({children, allowedRoles}) => {
    const {isAuthenticated, role} = useSelector((state) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{from: location}} replace/>
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        // if (role === 'ROLE_ADMIN') {
        //     return <Navigate to="/admin" replace />;
        // } else if (role === 'ROLE_TEACHER') {
        //     return <Navigate to="/teacher" replace />;
        // } else if (role === 'ROLE_STUDENT') {
        //     return <Navigate to="/student" replace />;
        // } else {
        //     return <Navigate to="/" replace />;
        // }
        switch (role) {
            case 'ROLE_ADMIN':
                return <Navigate to="/admin" replace/>;
            case 'ROLE_TEACHER':
                return <Navigate to="/teacher" replace/>;
            case 'ROLE_STUDENT':
                return <Navigate to="/student" replace/>;
            default:
                return <Navigate to="/" replace/>;
        }
    }
    return children
}

export default ProtectedRoute;
