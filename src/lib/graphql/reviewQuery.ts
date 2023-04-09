import {gql} from "@apollo/client";
import {Challenge, Review, Solution, Status} from "./challengeQuery";
import {Requirement} from "./requirementQuery";

export const getSolutionsCountToReview = gql`
    query GetSolutionCountToReview($challengeId: ID!) {
        countToReview(challengeId: $challengeId)
    }
`;

export const getSolutionsToReview = gql`
    query GetSolutionsToReview($challengeId: ID!, $offset: Int, $size: Int, ) {
        countToReview(challengeId: $challengeId)
        solutionsToReview(challengeId: $challengeId, offset: $offset, size: $size) {
            id,
            uploadDate,
            review {
                id,
                description
            }
            author {
                id
                stagId,
                displayName,
                mail
            }
        }
    }
`;

export const createReviewMutation = gql`
    mutation CreateReviewMutation($solutionId: ID!, $input: ReviewInput!) {
        createReview(solutionId: $solutionId, reviewInput: $input) {
            id,
            description
        }
    }
`;

export const publishReviewMutation = gql`
    mutation PublishReviewMutation($id: ID!, $status: String!) {
        publishReview(id: $id, status: $status)
    }
`;

export const editReviewMutation = gql`
    mutation EditReviewMutation($id: ID!, $input: ReviewInput!) {
        editReview(id: $id, input: $input) {
            id,
            description
        }
    }
`;

export const editReviewPoints = gql`
    mutation AddRequirementReview($reviewId: ID!, $requirementId: ID!, $reviewPointsInput: ReviewPointsInput!) {
        editReviewPoints(reviewId: $reviewId, requirementId: $requirementId, reviewPointsInput: $reviewPointsInput)
    }
`;

export const getSolution = gql`
    query GetReview($challengeId: ID!, $solutionId: ID!) {
        challenge(id: $challengeId) {
            id,
            name,
            description,
            deadlineDate,
            startDate,
            challengeKind,
        },
        solution(id: $solutionId) {
            id,
            uploadDate,
            status
            review {
                id,
                description,
                feedbacks {
                    id,
                    description,
                    type
                }
                requirements {
                    id,
                    description,
                    points,
                    requirement {
                        id,
                        name,
                        description,
                        active,
                        minPoint,
                        maxPoint,
                    }
                }
            }
            author {
                stagId,
                mail,
                displayName,
            },
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

export interface GetSolutionQuery {
    challenge: Challenge;
    solution: Solution;
}

export interface GetSolutionVariables {
    solutionId: number | string;
    challengeId: number | string;
}

export interface EditReviewPointsMutation {
    addReviewPoints: Boolean;
}

export interface EditReviewPointsVariables {
    reviewId: number | string
    requirementId: number | string
    reviewPointsInput: ReviewPointsInput
}

export interface ReviewPointsInput {
    points: number
}

export interface EditReviewMutation {
    editReview: Review
}

export interface EditReviewVariables {
    id: number | string
    input: ReviewInput
}

export interface PublishReviewMutation {
    publishReview: boolean
}

export interface PublishReviewVariables {
    id: number | string
    status: Status
}

export interface CreateReviewMutation{
    createReview: Review
}

export interface CreateReviewVariables {
    solutionId: number | string
    input: ReviewInput
}

export interface ReviewInput {
    description: string
}

export interface GetSolutionsToReviewQuery {
    countToReview: number
    solutionsToReview: Array<Solution>
}

export interface GetSolutionsToReviewVariables {
    challengeId: number | string
    offset?: number | undefined
    size?: number | undefined
}

export interface GetSolutionsCountToReviewQuery {
    countToReview?: number | undefined
}

export interface GetSolutionsCountToReviewVariables {
    challengeId: number | string
}

export interface ReviewedRequirement {
    id: string;
    points: number | null;
    description: string | null;
    requirement?: Requirement;
}