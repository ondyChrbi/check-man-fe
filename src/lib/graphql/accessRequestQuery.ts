import {gql} from "@apollo/client";
import {SemesterAccessRequest} from "./courseQuery";

export const getSemesterAccessRequests = gql`
    query GetSemesterAccessRequestsQuery($semesterId: ID!) {
        semesterAccessRequestsAppUser(semesterId: $semesterId) {
            id,
            expirationDate,
            creationDate,
        }
    }
`;

export interface GetSemesterAccessRequestsQuery {
    semesterAccessRequestsAppUser?: SemesterAccessRequest
}

export interface GetSemesterAccessRequestsVariables {
    semesterId: string | number
}