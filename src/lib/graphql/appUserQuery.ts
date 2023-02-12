import {gql} from "@apollo/client";
import {AppUser} from "./meQuery";

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

export const removeCourseRole = gql`
    mutation RemoveCourseRoleMutation($appUserId: ID!, $semesterId: ID!, $roleId: ID!) {
        removeCourseRole(appUserId: $appUserId, semesterId: $semesterId, roleId: $roleId)
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

export interface AppUserQuery {
    appUser: AppUser
}

export interface AppUserVariables {
    id: number | string
    semesterId: number | string
}