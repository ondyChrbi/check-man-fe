import {gql} from "@apollo/client";
import {SortOrder} from "./index";
import {FeedbackType} from "./challengeQuery";

export const courseStatisticsQuery = gql`
    query GetCourseStatisticsQuery($semesterId: ID!, $direction: Order, $limit: Int, $description: String, $type: String) {
        statistic(semesterId: $semesterId, direction: $direction, limit: $limit, description: $description, type: $type) {
            semesterId
            challengeId
            description
            feedbackTypeId
            feedbackName
            count
        }
    }
`;

export interface GetCourseStatisticsQuery {
    statistic: Array<FeedbackStatistics>
}

export interface CourseStatisticsVariables {
    semesterId: number | string
    direction?: SortOrder
    limit?: number
    description?: string,
    type?: FeedbackType
}

export interface FeedbackStatistics {
    courseId?: string
    challengeId?: string
    description?: string
    feedbackTypeId?: string
    feedbackName?: string
    count?: number
}