import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    deleteAuthenticationInfoToLocalStorage,
    EmptyJwtInfo,
    getAuthenticationInfoFromLocalStorage,
    JwtInfo,
    saveAuthenticationInfoToLocalStorage
} from "../authentication/helper";
import {
    CourseRoles,
    getCourseRolesFromLocalStorage,
    getGlobalRolesFromLocalStorage, GlobalRoles,
    saveCourseRolesToLocalStorage, saveGlobalRolesToLocalStorage
} from "../authorization/helper";
import {GlobalRole} from "../../lib/graphql/meQuery";

export interface CoursesPermissionInfo{
    coursesRoles: Array<CourseRoles>;
}

export interface GlobalPermissionInfo{
    globalRoles: Array<GlobalRole>;
}

export interface AuthenticationInfo {
    jwtInfo: JwtInfo | null | undefined
}

export interface StorageInfo {
    authentication : AuthenticationInfo;
    coursesPermission: CoursesPermissionInfo;
    globalPermission: GlobalPermissionInfo;
}

const initialState = {
    authentication: {jwtInfo : getAuthenticationInfoFromLocalStorage()},
    coursesPermission: {coursesRoles : getCourseRolesFromLocalStorage()},
    globalPermission: {globalRoles : getGlobalRolesFromLocalStorage()}
} as StorageInfo;

export const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        setJwtToken: (state, action: PayloadAction<JwtInfo>) => {
            state.authentication.jwtInfo = action.payload;

            if (action.payload) {
                saveAuthenticationInfoToLocalStorage(action.payload);
            }
        },

        disableJwtToken: (state) => {
            state.authentication.jwtInfo = EmptyJwtInfo;
            deleteAuthenticationInfoToLocalStorage();
        },

        addRoles: (state, action: PayloadAction<CourseRoles>) => {
            const courseIds = state.coursesPermission.coursesRoles
                .map((c) => c.semesterId);

            if (!(courseIds.includes(action.payload.semesterId))) {
                state.coursesPermission.coursesRoles.push(action.payload);
                saveCourseRolesToLocalStorage(state.coursesPermission.coursesRoles);
            }
        },

        addGlobalRoles: (state, action: PayloadAction<GlobalRoles>) => {
            saveGlobalRolesToLocalStorage(action.payload.globalRoles);
        }
    }
})

export const { setJwtToken, disableJwtToken, addRoles , addGlobalRoles} = storageSlice.actions
export default storageSlice.reducer