import {gql} from "@apollo/client";
import {Challenge, Solution} from "./challengeQuery";
import {Semester} from "./courseQuery";

export const getSolutionsCountToReview = gql`
    query GetSolutionCountToReview($challengeId: ID!) {
        countToReview(challengeId: $challengeId)
    }
`;

export interface GetSolutionsCountToReviewQuery {
    countToReview?: number | undefined
}

export interface GetSolutionsCountToReviewVariables {
    challengeId: number | string
}

export const getAllSolutionsToReview = gql`
    query GetSolutionsToReview($courseId: ID!) {
        allSolutionsToReview(courseId: $courseId) {
            course {
                id,
                note
            }
            reviews {
                challenge {
                    id,
                    name
                }
                solutions {
                    id,
                    uploadDate
                }
            }
        }
    }
`;

export interface GetSolutionsToReviewVariables {
    courseId: number | string
}

export interface GetSolutionsToReviewQuery{
    allSolutionsToReview: Array<CoursesReviewList>
}

export interface ChallengeSolutions{
    challenge?: Challenge,
    solutions: Array<Solution>
}

export interface CoursesReviewList {
    course?: Semester,
    reviews?: Array<ChallengeSolutions>
}
