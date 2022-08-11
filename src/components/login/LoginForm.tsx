import React from 'react';
import {useAppDispatch, useAppSelector} from '../../features/authentication/hooks/hooks';
import {disableJwtToken, setJwtToken} from "../../features/authentication/store/authenticationSlice";
import MicrosoftAuthenticationService from "../../features/authentication/services/microsoft-authentication-service";
import AuthenticationService from "../../features/authentication/services/authentication-service";
import {useTranslation} from "react-i18next";

const LoginForm = () => {
    const {t} = useTranslation();
    const authenticationInfo = useAppSelector((state) => state.authentication);
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
        <div className="flex flex-col m-8">
            <h1>{t('application.title')}</h1>
            <h2>{t('application.subtitle')}</h2>

            <p>{t('application.instructions')}</p>
            {AuthenticationService.isNotAuthenticated(authenticationInfo) &&
                <button onClick={loginToMicrosoftAccount}>{t('authentication.login.button')}</button>
            }

            <button onClick={logout}>Logout</button>
        </div>
    </>)
}

export default LoginForm
