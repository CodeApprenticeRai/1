import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const RequireAuth = ({ children }) => {
    const location = useLocation();

    const auth = useAuth();
    if (auth.username == null) {
        return <Navigate to="/login" state={{path: location.pathname}}/>;
    }
    return children;
}