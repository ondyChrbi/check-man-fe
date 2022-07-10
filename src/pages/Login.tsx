import {useAppDispatch, useAppSelector} from '../features/authentication/hooks/hooks';
import React, {ReactElement} from 'react';
import {disableJwtToken, setJwtToken} from "../features/authentication/store/authenticationSlice";
import MicrosoftAuthenticationService from "../features/authentication/services/microsoft-authentication-service";
import AuthenticationService from "../features/authentication/services/authentication-service";

const Login: React.FC = (): ReactElement => {
    const jwtInfo = useAppSelector((state) => state.authentication);
    const dispatch = useAppDispatch();

    const loginToMicrosoftAccount = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (MicrosoftAuthenticationService.isNotAlreadyAuthenticated()) {
            await MicrosoftAuthenticationService.initMicrosoftAuthentication();
        }

        const microsoftAuthToken = await MicrosoftAuthenticationService.getAuthenticationToken();
        const authResponse = await MicrosoftAuthenticationService.exchangeAuthToken(microsoftAuthToken);

        dispatch(setJwtToken({
            token: authResponse.token,
            issueAtDate: authResponse.issueAtDate.toString(),
            expiresAtDate: authResponse.expireAtDate.toString()
        }));
    }

    const logout = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        await MicrosoftAuthenticationService.logoutAll();
        dispatch(disableJwtToken());
    };

    return (<>
        {AuthenticationService.isNotAuthenticated(jwtInfo.jwtInfo) &&
            <button onClick={loginToMicrosoftAccount}>Microsoft UPCE account</button>
        }
        <button onClick={logout}>Logout</button>
    </>)
}

export default Login
