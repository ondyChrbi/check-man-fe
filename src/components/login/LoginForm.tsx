import React from 'react';
import {useAppDispatch, useAppSelector} from '../../features/authentication/hooks/hooks';
import {setJwtToken} from "../../features/authentication/store/authenticationSlice";
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

    return (
        <div className="flex flex-row justify-center align-middle mx-3 md:mx-0 h-full">
            <div className="flex flex-col justify-center align-middle rounded-lg shadow-md shadow-gray-300 bg-white w-96 h-fit p-8">
                <h1 className="font-roboto text-teal-600 text-2xl md:text-5xl uppercase font-bold text-center">{t('application.name')}</h1>
                <h2 className="font-roboto text-gray-600 text-sm text-center pb-7">{t('application.subtitle')}</h2>
                <div className="mt-7">
                    <h3 className="text-center text-gray-500 font-bold text-sm mb-3">{t('authentication.title')}</h3>
                    {AuthenticationService.isNotAuthenticated(authenticationInfo) &&
                        <button
                            className="w-full text-center text-gray-900 bg-white hover:shadow-gray-300 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-md shadow-sm shadow-gray-200 text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:shadow-gray-600 mr-2 mb-2"
                            onClick={loginToMicrosoftAccount}>
                            <object className="w-6 h-6 mr-5" data={`/icons/button/microsoft-logo.svg`}
                                    type="image/svg+xml"/>
                            {t('authentication.login.button')}
                        </button>
                    }
                </div>
                <div className="flex flex-row justify-center align-middle text-xs text-center mt-8 text-gray-500">
                    <div>{t('authentication.troubleshooting.login')}</div>
                    <div className="w-1 h-1 mt-1.5 mx-2.5 bg-gray-400 rounded-full"></div>
                    <div>{t('authentication.troubleshooting.report-bug')}</div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
