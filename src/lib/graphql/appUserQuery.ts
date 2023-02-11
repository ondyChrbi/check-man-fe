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

export interface AppUserQuery {
    appUser: AppUser
}

export interface AppUserVariables {
    id: number | string
    semesterId: number | string
}