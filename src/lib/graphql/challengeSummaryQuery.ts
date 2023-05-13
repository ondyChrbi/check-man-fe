import {gql} from "@apollo/client";
import {Challenge} from "./challengeQuery";

export const getChallengeSummaryQuery = gql`
    query GetChallengeQuery($id: ID!) {
        challenge(id: $id) {
            id,
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
    statusName: string;
    appUserId: number;
    count: number;
}