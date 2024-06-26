import {AuthenticationInfo} from "../../storage/storageSlice";

const AuthenticationService = {
    isAuthenticated: (authenticationInfo: AuthenticationInfo) => {
        return (authenticationInfo && authenticationInfo.jwtInfo && authenticationInfo.jwtInfo.token
            && authenticationInfo.jwtInfo.expiresAtDate
            && (Date.parse(authenticationInfo.jwtInfo.expiresAtDate) >= Date.now())) as Boolean;
    },

    isNotAuthenticated: (authenticationInfo: AuthenticationInfo) => {
        return !AuthenticationService.isAuthenticated(authenticationInfo)
    }
}

export default AuthenticationService;