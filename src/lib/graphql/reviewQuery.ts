import {gql} from "@apollo/client";
import {Challenge, Review, Solution} from "./challengeQuery";
import {Semester} from "./courseQuery";

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

export interface ChallengeSolutions{
    challenge?: Challenge,
    solutions: Array<Solution>
}

export interface CoursesReviewList {
    course?: Semester,
    reviews?: Array<ChallengeSolutions>
}
