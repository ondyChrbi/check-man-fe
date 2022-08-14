import {gql} from "@apollo/client";
import {AppUser} from "./meQuery";

export const getChallengesQuery = gql`
    query GetChallengeQuery($semesterId: ID!) {
        challenges(semesterId: $semesterId) {
            id,
            name,
            description,
            challengeKind
        }
    }
`;

export const getChallengeQuery = gql`
    query GetChallengeQuery($id: ID!) {
        challenge(id: $id) {
            id,
            name,
            description,
            deadlineDate,
            startDate,
            challengeKind,
            author {
                id
                stagId
                displayName
            }
        }
    }
`;

export enum ChallengeKind {
    OPTIONAL = 'OPTIONAL',
    MANDATORY = 'MANDATORY',
    CREDIT = 'CREDIT',
    EXAM = 'EXAM'
}

export interface ChallengeQuery {
    challenge: Challenge
}

export interface ChallengesQuery {
    challenges: Array<Challenge>
}

export interface Challenge {
    id: number,
    name: string,
    description: string,
    deadlineDate?: string,
    startDate?: string,
    author? : AppUser,
    challengeKind: ChallengeKind
}