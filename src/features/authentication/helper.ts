export const JWT_TOKEN_KEY = "jwt"
export const JWT_ISSUE_AT_DATE_KEY = "jwt_issue_at"
export const JWT_EXPIRE_AT_DATE_KEY = "jwt_expire_at"

export interface JwtInfo {
    token: string | null
    issueAtDate: string | null
    expiresAtDate: string | null
}

export const EmptyJwtInfo = {
    token: null,
    issueAtDate: null,
    expiresAtDate: null,
} as JwtInfo;

export const getAuthenticationInfoFromLocalStorage = () => {
    const authenticationInfo = {
        token : localStorage.getItem(JWT_TOKEN_KEY),
        issueAtDate : localStorage.getItem(JWT_ISSUE_AT_DATE_KEY),
        expiresAtDate : localStorage.getItem(JWT_EXPIRE_AT_DATE_KEY)
    } as JwtInfo;

    if (!authenticationInfo.token || !authenticationInfo.issueAtDate || !authenticationInfo.expiresAtDate) {
        deleteAuthenticationInfoToLocalStorage();
        return EmptyJwtInfo;
    }

    return authenticationInfo;
};

export const saveAuthenticationInfoToLocalStorage = (jwtInfo: JwtInfo) => {
    if (jwtInfo.token) { localStorage.setItem(JWT_TOKEN_KEY, jwtInfo.token) }
    if (jwtInfo.issueAtDate) { localStorage.setItem(JWT_ISSUE_AT_DATE_KEY, jwtInfo.issueAtDate) }
    if (jwtInfo.expiresAtDate) { localStorage.setItem(JWT_EXPIRE_AT_DATE_KEY, jwtInfo.expiresAtDate) }
};

export const deleteAuthenticationInfoToLocalStorage = () => {
    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(JWT_ISSUE_AT_DATE_KEY);
    localStorage.removeItem(JWT_EXPIRE_AT_DATE_KEY);
};