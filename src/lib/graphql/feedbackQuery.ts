import {gql} from "@apollo/client";
import {Feedback, FeedbackType} from "./challengeQuery";

export const unlinkFeedbackMutation = gql`
    mutation UnlinkFeedbackMutation($reviewId: ID!, $feedbackId: ID!) {
        removeFeedbackFromReview(reviewId: $reviewId, feedbackId: $feedbackId) 
    }
`;

export interface UnlinkFeedbackMutationVariables {
    reviewId : number | string,
    feedbackId : number | string,
}

export interface UnlinkFeedbackMutation {
    removeFeedbackFromReview: boolean
}

export const createFeedbackToReviewMutation = gql`
    mutation createFeedbackToReviewMutation($reviewId: ID!, $feedback: FeedbackInput!) {
        createFeedbackToReview(reviewId: $reviewId, feedback: $feedback) {
            id,
            description,
            type
        }
    }
`;

export interface CreateFeedbackToReviewMutation {
    createFeedbackToReview: Feedback
}

export interface CreateFeedbackToReviewMutationVariables {
    reviewId: number | string,
    feedback: FeedbackInput
}

export interface FeedbackInput {
    description: string,
    type: FeedbackType
}

export const linkFeedbackMutation = gql`
    mutation LinkFeedbackMutation($reviewId: ID!, $feedbackId: ID!) {
        addFeedbackToReview(reviewId: $reviewId, feedbackId: $feedbackId)
    }
`;

export interface LinkFeedbackMutationVariables {
    reviewId : number | string,
    feedbackId : number | string,
}

export interface LinkFeedbackMutation {
    removeFeedbackFromReview: boolean
}
