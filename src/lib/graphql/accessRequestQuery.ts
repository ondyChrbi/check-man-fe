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
        }
    }
`;

export interface GetSemesterAccessRequestsQuery {
    semesterAccessRequests: Array<SemesterAccessRequest>
}

export interface GetSemesterAccessRequestsVariables {
    semesterId: string | number
}
