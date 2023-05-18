import {gql} from "@apollo/client";
import {Challenge, Status} from "./challengeQuery";

export const getChallengeSummaryQuery = gql`
    query GetChallengeQuery($id: ID!) {
        challenge(id: $id) {
            id,
            name,
            relatedUsers {
                id,
                mail,
                stagId,
                displayName,
                challengeSummary(challengeId: $id) {
                    statusName,
                    count
                }
            }
        }
    }
`;

export interface ChallengeSummaryQueryVariables {
    id: string | number
}

export interface ChallengeSummaryQuery {
    challenge: Challenge
}

export interface ChallengeSummary {
    courseId: number;
    challengeId: number;
    statusId: number;
    statusName: Status;
    appUserId: number;
    count: number;
}
