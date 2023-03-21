import {gql} from "@apollo/client";

export const testResultQuery = gql`
    query TestResultQuery($id: ID!) {
        testResult(id: $id) {
            id
            log
            creationDate
            updateDate
            status
        }
    }
`;

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
}

export enum TestStatus {
    WAITING_TO_TEST = 'WAITING_TO_TEST',
    RUNNING = 'RUNNING',
    FINISHED = 'FINISHED',
    ERROR = 'ERROR',
}
