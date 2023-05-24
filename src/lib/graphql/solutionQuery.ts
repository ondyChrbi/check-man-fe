import {gql} from "@apollo/client";
import {Feedback, Solution} from "./challengeQuery";

export const testResultQuery = gql`
    query TestResultQuery($id: ID!) {
        testResult(id: $id) {
            id
            log
            creationDate
            updateDate
            status
            feedbacks {
                id
                description
                type
            }
        }
    }
`;

export const solutionsQuery = gql`
    query SolutionQuery($challengeId: ID!) {
        solutions(challengeId: $challengeId) {
            id,
            uploadDate,
            status,
            review {
                id,
                description,
            }
            author {
                id,
                stagId,
                displayName,
                mail,
            }
        }
    }
`;

export interface SolutionsQuery {
    solutions: Array<Solution>
}


export interface SolutionsQueryVariables {
    challengeId: number | string
}

export interface TestResultQuery {
    testResult?: TestResult
}

export interface TestResultVariables {
    id: number | string | undefined
}

export interface TestResult {
    id?: number | null;
    log: string;
    creationDate: Date;
    updateDate?: Date | null;
    status?: TestStatus | null;
    feedbacks?: [Feedback] | null | undefined;
}

export enum TestStatus {
    WAITING_TO_TEST = 'WAITING_TO_TEST',
    RUNNING = 'RUNNING',
    FINISHED = 'FINISHED',
    ERROR = 'ERROR',
}
