import {JwtInfo} from "../helper";
import {AuthenticationInfo} from "../store/authenticationSlice";

const AuthenticationService = {
    isAuthenticated: (authenticationInfo: AuthenticationInfo | null | undefined) => {
        return (authenticationInfo.jwtInfo && authenticationInfo.jwtInfo.token
            && authenticationInfo.jwtInfo.expiresAtDate
            && (Date.parse(authenticationInfo.jwtInfo.expiresAtDate) >= Date.now())) as Boolean;
    },

    isNotAuthenticated: (jwtInfo: JwtInfo | null | undefined) => {
        return !AuthenticationService.isAuthenticated(jwtInfo)
    }
}

export default AuthenticationService;