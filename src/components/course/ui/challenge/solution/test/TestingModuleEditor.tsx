import TestingModuleForm from "./TestingModuleForm";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useTestingModules} from "../../../../../../features/hooks/test";
import {TestingModule} from "../../../../../../features/challenge/test";
import {showErrorToast} from "../../../../../editor/helpers";
import LoadingSpinner from "../../../../../loading/LoadingSpinner";

interface Props {
    selected?: string;
    onModuleSelected?: (module: TestingModule) => void | Promise<void>;
}

const TestingModuleEditor = ({ selected, onModuleSelected = () => {}}: Props) => {
    const {t} = useTranslation();

    const [selectedModule, setSelectedModule] = useState<TestingModule | undefined>(undefined);
    const { testingModules: {data, isLoading, error} } = useTestingModules({
        onDownloadSuccess: (data) => setSelectedModule(data.find(module => module.moduleClass === selected))
    });

    const configurationSelectHandle = (module: TestingModule) => {
        setSelectedModule(module);
        onModuleSelected(module);
    }

    if (error || !data) {
        showErrorToast(t('common.message.not-authenticated'));
        return <></>
    }

    if (isLoading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner />
        </div>
    }

    return <TestingModuleForm items={data} selected={selectedModule} onItemClick={configurationSelectHandle} />
};

export default TestingModuleEditor;