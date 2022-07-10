import {MicrosoftAuthenticationV1ApiFp} from "../../../lib/api/api";
import * as msal from "@azure/msal-browser";
import i18next from "i18next";
import {msalConfiguration, scopes, validDomains} from "../../../data/ms.config";

const msalInstance = new msal.PublicClientApplication(msalConfiguration);

const MicrosoftAuthenticationService = {
    initMicrosoftAuthentication: async () => {
        if (MicrosoftAuthenticationService.isAlreadyAuthenticated()) {

            if (MicrosoftAuthenticationService.isNotAccountValid(msalInstance.getAllAccounts()[0])) {
                await MicrosoftAuthenticationService.logoutAll();
            }

            throw Error(i18next.t('authentication.error.already-authenticated'));
        }

        await msalInstance.loginPopup();

        if (MicrosoftAuthenticationService.isNotAccountValid(msalInstance.getAllAccounts()[0])) {
            await MicrosoftAuthenticationService.logoutAll();
            throw Error(i18next.t('authentication.error.not-valid-account'));
        }
    },

    getAuthenticationToken: async () => {
        const tokenResponse = await msalInstance.acquireTokenSilent({
            scopes: scopes,
            account: msalInstance.getAllAccounts()[0]
        });

        return tokenResponse.accessToken;
    },

    exchangeAuthToken: async (accessToken: string) => {
        const response = await MicrosoftAuthenticationV1ApiFp().exchange({authToken: accessToken});

        return (await response());
    },

    isAlreadyAuthenticated: () => {
        return msalInstance.getAllAccounts() && msalInstance.getAllAccounts()[0];
    },

    isNotAlreadyAuthenticated: () => {
        return !MicrosoftAuthenticationService.isAlreadyAuthenticated();
    },

    isAccountValid: (account: msal.AccountInfo) => {
        if (!account.username) { return false; }

        const domain = account.username.split("@").pop();
        return domain && validDomains.includes(domain);
    },

    isNotAccountValid: (account: msal.AccountInfo) => {
        return !(MicrosoftAuthenticationService.isAccountValid(account));
    },

    logoutAll: async () => {
        await msalInstance.logoutPopup();
    }
}

export default MicrosoftAuthenticationService