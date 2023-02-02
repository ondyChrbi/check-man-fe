import {gql} from "@apollo/client";
import {AppUser} from "./meQuery";

export const getChallengesQuery = gql`
    query GetChallengeQuery($semesterId: ID!) {
        challenges(semesterId: $semesterId) {
            id,
            name,
            deadlineDate,
            startDate,
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
            published,
            author {
                id
                stagId
                displayName
            }
        }
    }
`;

export const createChallengeMutation = gql`
    mutation CreateChallengeMutation($semesterId: ID!, $input: ChallengeInput!) {
        createChallenge(semesterId: $semesterId, input: $input) {
            id
        }
    }
`;

export const editChallengeMutation = gql`
    mutation EditChallengeMutation($challengeId: ID!, $input: ChallengeInput!) {
        editChallenge(challengeId: $challengeId, input: $input) {
            id
        }
    }
`;

export const deleteChallengeMutation = gql`
    mutation DeleteChallengeMutation($challengeId: ID!) {
        deleteChallenge(challengeId: $challengeId) {
            id,
            name
        }
    }
`;

export const publishChallengeMutation = gql`
    mutation PublishChallengeMutation($challengeId: ID!) {
        publishChallenge(challengeId: $challengeId)
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

export interface ChallengeInput {
    name: string,
    description: string,
    deadlineDate?: string,
    startDate?: string,
    challengeKind: ChallengeKind
}

export interface CreateChallengeVariables{
    semesterId: string,
    input: ChallengeInput
}

export interface EditChallengeVariables{
    challengeId: string,
    input: ChallengeInput
}

export interface PublishChallengeMutationVariables {
    challengeId: number | string;
}

export interface DeleteChallengeVariables{
    challengeId: string,
}

export interface CreateChallengeMutation{
    createChallenge : Challenge
}

export interface EditChallengeMutation{
    editChallenge : Challenge
}

export interface DeleteChallengeMutation{
    deleteChallenge : Challenge
}

export interface ChallengesQuery {
    challenges: Array<Challenge>
}

export interface PublishChallengeMutation {
    publishChallenge: boolean;
}
export interface Challenge {
    id: number,
    name: string,
    description: string,
    deadlineDate?: string,
    startDate?: string,
    published: boolean,
    author? : AppUser,
    challengeKind: ChallengeKind
}