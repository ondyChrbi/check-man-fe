import React from "react";
import {Challenge} from "../../../../../../lib/graphql/challengeQuery";
import TestingModuleEditor from "./TestingModuleEditor";
import {useTestConfiguration} from "../../../../../../features/hooks/test";
import LoadingSpinner from "../../../../../loading/LoadingSpinner";
import {TestingModule} from "../../../../../../features/challenge/test";
import {useTranslation} from "react-i18next";
import {showSuccessToast} from "../../../../../editor/helpers";
import TestConfigurationTemplateEditor from "./TestConfigurationTemplateEditor";

interface Props {
    challenge: Challenge
}

const AutomaticTestEditor = ({challenge}: Props) => {
    const {t} = useTranslation();

    const {
        testConfigurations: {data, isLoading},
        addTestConfigurations: {mutate : add, data: addData, isLoading: isAddLoading}
    } = useTestConfiguration(challenge);

    const moduleSelectedHandle = async (module: TestingModule) => {
        if (!data || isAddLoading) {
            const testModuleClass = module.moduleClass;
            add({ testModuleClass });
        }
    }

    if (addData) {
        showSuccessToast(t('common.message.add'));
    }

    if (isLoading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner />
        </div>
    }

    return <div className="flex flex-col w-full h-fit">
        <div className="py-5">
            {data && <TestConfigurationTemplateEditor testConfiguration={data} />}
            <TestingModuleEditor onModuleSelected={moduleSelectedHandle} />
        </div>
    </div>
}

export default AutomaticTestEditor;