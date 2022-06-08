import {AuthenticationResponseDtoV1, MicrosoftAuthenticationV1ApiFp, MicrosoftOAuthResponseDtoV1} from "../api/api";

const REDIRECT_URI = "http://localhost:3000/login"

const MicrosoftAuthenticationService = {
    startAuthentication: async () : Promise<MicrosoftOAuthResponseDtoV1> => {
        const response = await MicrosoftAuthenticationV1ApiFp().start(REDIRECT_URI)
        return await response()
    },

    finishAuthentication: async (code: string) : Promise<AuthenticationResponseDtoV1> => {
        const response = await MicrosoftAuthenticationV1ApiFp().finish(code, REDIRECT_URI)
        return await response()
    }
}

export default MicrosoftAuthenticationService