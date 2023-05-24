import {gql} from "@apollo/client";
import {SemesterAccessRequest} from "./courseQuery";

export const getSemesterAccessRequestsAppUser = gql`
    query GetSemesterAccessRequestsQueryAppUser($semesterId: ID!) {
        semesterAccessRequestsAppUser(semesterId: $semesterId) {
            id,
            expirationDate,
            creationDate,
        }
    }
`;

export interface GetSemesterAccessRequestsAppUserQuery {
    semesterAccessRequestsAppUser?: SemesterAccessRequest
}

export interface GetSemesterAccessRequestsAppUserVariables {
    semesterId: string | number
}

export const getSemesterAccessRequests = gql`
    query GetSemesterAccessRequestsQuery($semesterId: ID!) {
        semesterAccessRequests(semesterId: $semesterId) {
            id,
            expirationDate,
            creationDate,
            semesterId,
            appUser {
                id,
                mail,
                stagId,
                displayName,
            }
        }
    }
`;

export interface GetSemesterAccessRequestsQuery {
    semesterAccessRequests: Array<SemesterAccessRequest>
}

export interface GetSemesterAccessRequestsVariables {
    semesterId: string | number
}

export const approveCourseSemesterRequest = gql`
    mutation ApproveCourseSemesterRequest($id: ID!, $roles: [String!]!) {
        approveCourseSemesterRequest(id: $id, roles: $roles)
    }
`;

export interface ApproveCourseSemesterRequestMutation {
    approveCourseSemesterRequest: boolean
}

export interface ApproveCourseSemesterRequestVariables {
    id: string | number
    roles: Array<string>
}
