import {gql} from "@apollo/client";
import {AppUser} from "./meQuery";
import {Requirement} from "./requirementQuery";
import {TestResult} from "./solutionQuery";
import {TestConfiguration} from "../../features/challenge/test";
import {ReviewedRequirement} from "./reviewQuery";

export const getChallengesQuery = gql`
    query GetChallengeQuery($semesterId: ID!) {
        challenges(semesterId: $semesterId) {
            id,
            name,
            deadlineDate,
            startDate,
            description,
            challengeKind,
            published
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
            requirements {
                id,
                name,
                description,
                minPoint,
                maxPoint,
                active
            }
            testConfigurations {
                id,
                templatePath,
                dockerFilePath,
                testModuleClass,
                active,
                creationDate,
                updateDate,
            }
        }
    }
`;

export const getSolutionQuery = gql`
    query GetSolutionQuery($id : ID!) {
        solution(id: $id) {
            id,
            uploadDate,
            status,
            review {
                id,
                description,
                feedbacks {
                    id,
                    description,
                    type
                }
            }
            author {
                stagId,
                mail,
                displayName,
                mail,
                registrationDate,
                lastAccessDate
            }
            testResult {
                id,
                log,
                creationDate,
                updateDate,
                status
            }
        }
    }
`;

export const getSolutionsQuery = gql`
    query GetSolutionsQuery($challengeId : ID!) {
        solutions(challengeId: $challengeId) {
            id,
            uploadDate,
            status,
            review {
                id,
                description
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
            name
            description
            startDate
            deadlineDate
            challengeKind
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

export interface EditChallengeInput {
    name?: string,
    description?: string,
    deadlineDate?: string,
    startDate?: string,
    challengeKind?: ChallengeKind
}

export interface CreateChallengeVariables{
    semesterId: string,
    input: ChallengeInput
}

export interface GetSolutionVariables {
    id: string | number
}

export interface GetSolutionsVariables {
    challengeId: string | number
}

export interface EditChallengeVariables{
    challengeId: string | number,
    input: EditChallengeInput
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

export interface GetSolutionQuery {
    solution: Solution
}

export interface GetSolutionsQuery {
    solutions: Array<Solution>
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
    challengeKind: ChallengeKind,
    requirements: Array<Requirement>,
    testConfigurations: Array<TestConfiguration>
}

export interface Feedback {
    id: number,
    description: string,
    type: FeedbackType,
}

export interface Review {
    id: number,
    description: string,
    feedbacks: Array<Feedback>
    requirements: Array<ReviewedRequirement>
}

export interface Solution {
    id: number,
    uploadDate: string,
    status: Status,
    review: Review,
    author: AppUser,
    testResult?: TestResult | null | undefined
}

export enum Status {
    APPROVED = 'APPROVED',
    RETURN_TO_EDIT = 'RETURN_TO_EDIT',
    DENIED = 'DENIED',
    WAITING_TO_REVIEW = 'WAITING_TO_REVIEW',
}

export enum FeedbackType {
    EXTREMELY_POSITIVE = 'EXTREMELY_POSITIVE',
    POSITIVE = 'POSITIVE',
    NEUTRAL = 'NEUTRAL',
    NEGATIVE = 'NEGATIVE',
}