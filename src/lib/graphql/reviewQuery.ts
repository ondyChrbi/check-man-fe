import {gql} from "@apollo/client";
import {Review, Solution, Status} from "./challengeQuery";

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
