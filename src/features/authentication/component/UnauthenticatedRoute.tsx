import {useAppSelector} from "../../storage/hooks";
import AuthenticationService from "../services/authentication-service";
import {Navigate} from "react-router-dom";

interface Props {
    redirectUrl: string,
    children : JSX.Element
}

const UnauthenticatedRoute = ({redirectUrl, children} : Props) => {
    const authenticationInfo = useAppSelector((state) => state.storage.authentication);

    if (AuthenticationService.isAuthenticated(authenticationInfo)) {
        return <Navigate to={redirectUrl} replace />
    }

    return children;
}

export default UnauthenticatedRoute;