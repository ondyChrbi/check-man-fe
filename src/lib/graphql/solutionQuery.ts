
export interface TestResult {
    id?: number | null;
    log: string;
    creationDate: Date;
    updateDate?: Date | null;
    status?: TestStatus | null;
}

export enum TestStatus {
    WAITING_TO_TEST = 'WAITING_TO_TEST',
    TESTING = 'TESTING',
    PASSED = 'PASSED',
    FAILED = 'FAILED',
    ERROR = 'ERROR',
}
