import {useAppSelector} from "../../storage/hooks";
import AuthenticationService from "../services/authentication-service";
import {Navigate} from "react-router-dom";

interface Props {
    children : JSX.Element
}

const ProtectedRoute = ({children} : Props) => {
    const authenticationInfo = useAppSelector((state) => state.storage.authentication);

    if (AuthenticationService.isNotAuthenticated(authenticationInfo)) {
        return <Navigate to={"/login"} replace />
    }


    return children;
};

export default ProtectedRoute;