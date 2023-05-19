import React, {useState} from "react";
import {Challenge} from "../../../../../../lib/graphql/challengeQuery";
import TestingModuleEditor from "./TestingModuleEditor";
import {useTestConfiguration} from "../../../../../../features/hooks/test";
import LoadingSpinner from "../../../../../loading/LoadingSpinner";
import {isValidConfiguration, TestConfiguration, TestingModule} from "../../../../../../features/challenge/test";
import {useTranslation} from "react-i18next";
import TestConfigurationTemplateEditor from "./TestConfigurationTemplateEditor";
import Switch from "../../../../../editor/input/Switch";
import FileListItem from "../../../../../editor/input/upload/FileListItem";

interface Props {
    challenge: Challenge
}

const AutomaticTestEditor = ({challenge}: Props) => {
    const {t} = useTranslation();

    const {
        testConfigurations: {data, isLoading, refetch},
        addTestConfiguration:
            {
                mutate: saveTestConfiguration,
                data: addData,
                isLoading: isAddLoading
            },
    } = useTestConfiguration(challenge);

    const moduleSelectedHandle = async (module: TestingModule) => {
        if (!data || isAddLoading) {
            const testModuleClass = module.moduleClass;
            await saveTestConfiguration({testModuleClass});
        }
    }

    if (isLoading) {
        return <div className="w-full h-full flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    return <div className="flex flex-col w-full h-fit p-5 rounded-md">
        <div className="py-5">
            <TestingModuleEditor selected={data?.testModuleClass} onModuleSelected={moduleSelectedHandle}/>
            {data && <TestConfigurationTemplateEditor testConfiguration={data}/>}
        </div>
        <div className="flex flex-col w-full justify-center items-center align-middle">
            {data?.templatePath && <FileListItem filename={data.templatePath || ""}/>}
        </div>
        <div className="flex flex-col w-full justify-center items-center align-middle my-5">
            {isValidConfiguration(data) && <ActiveButton configuration={data!!} challenge={challenge}/>}
        </div>
    </div>
}

interface ActiveButtonProps {
    configuration: TestConfiguration;
    challenge: Challenge
}

const ActiveButton = ({configuration, challenge}: ActiveButtonProps) => {
    const {t} = useTranslation();

    const {editTestConfiguration: {mutate: editTestConfiguration, isLoading}} = useTestConfiguration(challenge);
    const [checked, setChecked] = useState(configuration.active);

    const changeHandle = (active: boolean) => {
        if (!isLoading) {
            const id = configuration.id;

            setChecked(active);
            editTestConfiguration({id, active});
        }
    }

    return <Switch label={t(`challenge.test.action.active.${checked}`)} checked={checked} onChange={changeHandle}/>
}

export default AutomaticTestEditor;