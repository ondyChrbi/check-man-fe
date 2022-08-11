import LoginForm from "../components/login/LoginForm";
import {useAppSelector} from "../features/authentication/hooks/hooks";
import {useEffect} from "react";
import AuthenticationService from "../features/authentication/services/authentication-service";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const authenticationInfo = useAppSelector((state) => state.authentication);
    const navigate = useNavigate();

    useEffect(() => {
        if (AuthenticationService.isAuthenticated(authenticationInfo)) {
            return navigate('/dashboard', {replace: true})
        }
    }, [])

    return <>
        <LoginForm />
    </>;
}

export default Login;