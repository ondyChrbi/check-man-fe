import LoginForm from "../components/login/LoginForm";
import {useAppSelector} from "../features/authentication/hooks/hooks";
import AuthenticationService from "../features/authentication/services/authentication-service";
import {Navigate} from "react-router-dom";

const Login = () => {
    const authenticationInfo = useAppSelector((state) => state.authentication);

    if (AuthenticationService.isAuthenticated(authenticationInfo)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <div className="w-full h-full bg-gray-50 pt-5 md:pt-10">
        <LoginForm />
    </div>;
}

export default Login;