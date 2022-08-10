import {useAppSelector} from "../hooks/hooks";
import AuthenticationService from "../services/authentication-service";
import {Navigate} from "react-router-dom";

interface Props {
    children : JSX.Element
}

const ProtectedRoute = ({children} : Props) => {
    const authenticationInfo = useAppSelector((state) => state.authentication);

    if (AuthenticationService.isNotAuthenticated(authenticationInfo)) {
        return <Navigate to={"/login"} replace />
    }


    return children;
};

export default ProtectedRoute;