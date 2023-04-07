import React, {useState} from "react";
import {UploadedFile} from "../../../../../editor/input/upload/UploadArea";
import {Challenge} from "../../../../../../lib/graphql/challengeQuery";
import AutomaticTestTemplateUploadForm from "./AutomaticTestTemplateUploadForm";
import TestConfigurationForm from "./TestConfigurationForm";
import {TestConfiguration} from "../../../../../../features/challenge/test";
import {useTestConfiguration} from "../../../../../../features/hooks/test";
import LoadingSpinner from "../../../../../loading/LoadingSpinner";

interface Props {
    challenge: Challenge
}

const AutomaticTestEditor = ({challenge}: Props) => {
    const [fileList, setFileList] = useState<UploadedFile[]>([]);
    const { testConfigurations: {data, isLoading} } = useTestConfiguration(challenge);

    const filesSelectedHandle = (files: UploadedFile[]) => {
        setFileList([...files, ...fileList]);
    };

    const configurationSelectHandle = (configuration: TestConfiguration) => {

    }

    return <div className="flex flex-col w-full h-fit">
        <div className="py-5">
            <AutomaticTestTemplateUploadForm onFileUploaded={filesSelectedHandle} />
        </div>
        <div className="py-5">
            {isLoading && <div className="w-full h-full flex flex-row items-center justify-center">
                <LoadingSpinner />
            </div>}
            {data && <TestConfigurationForm items={data} onItemClick={configurationSelectHandle} />}
        </div>
    </div>
}

export default AutomaticTestEditor;