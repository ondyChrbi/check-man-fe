import {gql} from "@apollo/client";
import {AppUser, CourseSemesterRole} from "./meQuery";

export const appUser = gql`
    query AppUserQuery($id: ID!, $semesterId: ID!) {
        appUser(id: $id) {
            id,
            displayName,
            stagId,
            mail
            registrationDate,
            lastAccessDate,
            disabled,
            roles(semesterId: $semesterId) {
                id,
                name
            }
        }
    }
`

export const appUserAllRoles = gql`
    query AppUserQuery($id: ID!, $semesterId: ID!) {
        appUser(id: $id) {
            id,
            displayName,
            stagId,
            mail
            registrationDate,
            lastAccessDate,
            disabled,
            roles(semesterId: $semesterId) {
                id,
                name
            }
        }
        allCourseRoles {
            id,
            name
        }
    }
`

export const removeCourseRole = gql`
    mutation RemoveCourseRoleMutation($appUserId: ID!, $semesterId: ID!, $roleId: ID!) {
        removeCourseRole(appUserId: $appUserId, semesterId: $semesterId, roleId: $roleId)
    }
`

export const addCourseRole = gql`
    mutation AddCourseRoleMutation($appUserId: ID!, $semesterId: ID!, $roleId: ID!) {
        addCourseRole(appUserId: $appUserId, semesterId: $semesterId, roleId: $roleId)
    }
`

export interface RemoveCourseRoleMutation {
    removeCourseRole: Boolean
}

export interface RemoveCourseRoleVariables {
    appUserId: number | string,
    semesterId: number | string,
    roleId: number | string,
}

export interface AddCourseRoleVariables {
    appUserId: number | string,
    semesterId: number | string,
    roleId: number | string,
}

export interface AddCourseRoleMutation {
    addCourseRole: Boolean
}

export interface AppUserQuery {
    appUser: AppUser
}

export interface AppUserAllRolesQuery {
    appUser: AppUser
    allCourseRoles: Array<CourseSemesterRole>
}

export interface AppUserVariables {
    id: number | string
    semesterId: number | string
}
