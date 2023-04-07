
export interface TestConfiguration {
    id: number;
    templatePath?: string;
    dockerFilePath?: string;
    active: boolean;
    creationDate: Date;
    updateDate?: Date;
}