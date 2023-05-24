import React from 'react';
import {useAppDispatch, useAppSelector} from '../../features/storage/hooks';
import {setJwtToken} from "../../features/storage/storageSlice";
import MicrosoftAuthenticationService from "../../features/authentication/services/microsoft-authentication-service";
import AuthenticationService from "../../features/authentication/services/authentication-service";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const LoginForm = () => {
    const {t} = useTranslation();
    const authenticationInfo = useAppSelector((state) => state.storage.authentication);
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
            <div className="flex flex-col justify-center align-middle">
                <div className="flex flex-row justify-center align-middle items-center pb-7">
                    <object className="w-48 h-48 fill-white" data="/pages/fingerprint.svg" type="image/svg+xml"/>
                </div>
                <h1 className="font-roboto text-teal-600 text-2xl md:text-5xl uppercase font-bold text-center">{t('application.name')}</h1>
                <h2 className="font-roboto text-gray-500 text-sm text-right font-bold pb-2">{t('application.subtitle')}</h2>
                <div className="flex flex-row justify-center align-middle items-center my-16">
                    {AuthenticationService.isNotAuthenticated(authenticationInfo) &&
                        <button
                            className="w-full md:w-64 text-gray-900 bg-white justify-center border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                            onClick={loginToMicrosoftAccount}>
                            <object className="w-6 h-6 mr-5" data={`/icons/button/microsoft-logo.svg`}
                                    type="image/svg+xml"/>
                            {t('authentication.login.button')}
                        </button>
                    }
                </div>
                <div className="flex flex-row justify-center align-middle mt-5">
                    <div className="flex flex-row justify-center items-center align-middle p-5">
                        <img className="h-12 mr-2.5" src="/pages/fei-logo.png" />
                        <p className="font-roboto text-gray-600 font-bold text-sm leading-4">Fakulta<br />elektrotechniky<br />a informatiky</p>
                    </div>
                    <div className="flex flex-row justify-center items-center align-middle h-full">
                        <img className="h-12 mr-2.5" src="/pages/uni-logo.png" />
                        <p className="font-roboto text-gray-600 font-bold text-md leading-4">Univerzita<br />Pardubice</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center align-middle text-xs text-center mt-2 text-gray-500">
                    <Link to="/credit">
                        <p className="hover:text-gray-700 cursor-pointer">{t('credit.link')}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
