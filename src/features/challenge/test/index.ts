export interface TestConfiguration {
    id: number;
    templatePath?: string;
    dockerFilePath?: string;
    testModuleClass?: string;
    active: boolean;
    creationDate: Date;
    updateDate?: Date;
}

export interface TestingModule {
    key: string;
    name: string;
    description: string;
    dockerFilePath: string;
    moduleClass: string;
}

export interface TestConfigurationInput {
    testModuleClass: string;
}

const BASE_PATH = "/icons";

export const getTestModuleIcon = (module: TestingModule) => {
    return `${BASE_PATH}/gradle-java-kotlin.svg`;
}
