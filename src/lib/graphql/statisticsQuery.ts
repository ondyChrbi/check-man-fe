import {gql} from "@apollo/client";
import {SortOrder} from "./index";

export const courseStatisticsQuery = gql`
    query GetCourseStatisticsQuery($semesterId: ID!, $direction: Order, $limit: Int) {
        statistic(semesterId: $semesterId, direction: $direction, limit: $limit) {
            semesterId
            challengeId
            description
            feedbackTypeId
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
}

export interface FeedbackStatistics {
    courseId?: string | null | undefined;
    challengeId?: string | null | undefined;
    description?: string | null | undefined;
    feedbackTypeId: string | null | undefined;
    count: number | null | undefined;
}