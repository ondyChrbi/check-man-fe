import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    deleteAuthenticationInfoToLocalStorage,
    EmptyJwtInfo,
    getAuthenticationInfoFromLocalStorage,
    JwtInfo,
    saveAuthenticationInfoToLocalStorage
} from "../authentication/helper";
import {CourseRoles, getCourseRolesFromLocalStorage, saveCourseRolesToLocalStorage} from "../authorization/helper";

export interface CoursesPermissionInfo{
    coursesRoles: Array<CourseRoles>;
}

export interface AuthenticationInfo {
    jwtInfo: JwtInfo | null | undefined
}

export interface StorageInfo {
    authentication : AuthenticationInfo;
    coursesPermission: CoursesPermissionInfo;
}

const initialState = {
    authentication: {jwtInfo : getAuthenticationInfoFromLocalStorage()},
    coursesPermission: {coursesRoles : getCourseRolesFromLocalStorage()}
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
        }
    }
})

export const { setJwtToken, disableJwtToken, addRoles } = storageSlice.actions
export default storageSlice.reducer