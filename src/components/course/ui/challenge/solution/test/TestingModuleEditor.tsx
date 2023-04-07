import TestingModuleForm from "./TestingModuleForm";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useTestingModules} from "../../../../../../features/hooks/test";
import {TestingModule} from "../../../../../../features/challenge/test";
import {showErrorToast} from "../../../../../editor/helpers";
import LoadingSpinner from "../../../../../loading/LoadingSpinner";

interface Props {
    onModuleSelected?: (module: TestingModule) => void | Promise<void>;
}

const TestingModuleEditor = ({ onModuleSelected = () => {}}: Props) => {
    const {t} = useTranslation();

    const { testingModules: {data, isLoading, error} } = useTestingModules();
    const [selectedModule, setSelectedModule] = useState<TestingModule | undefined>(undefined);

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

    return <div className="flex flex-col">
        <p className="pb-5">{t('challenge.test.module.editor.message')}</p>
        <TestingModuleForm items={data} selected={selectedModule} onItemClick={configurationSelectHandle} />

    </div>
};

export default TestingModuleEditor;