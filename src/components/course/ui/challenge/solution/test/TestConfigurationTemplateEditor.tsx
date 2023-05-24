import React, {useState} from "react";
import {UploadedFile} from "../../../../../editor/input/upload/UploadArea";
import AutomaticTestTemplateUploadForm from "./AutomaticTestTemplateUploadForm";
import {TestConfiguration} from "../../../../../../features/challenge/test";
import {useTestConfigurationUpload} from "../../../../../../features/hooks/test";
import {generateZip} from "../../../../../../features/upload/helper";
import {showSuccessToast} from "../../../../../editor/helpers";
import {useTranslation} from "react-i18next";

interface Props {
    testConfiguration: TestConfiguration
}

const TestConfigurationTemplateEditor = ({testConfiguration} : Props) => {
    const {t} = useTranslation();

    const {uploadTestConfiguration} = useTestConfigurationUpload(testConfiguration);
    const [fileList, setFileList] = useState<UploadedFile[]>([]);

    const filesSelectedHandle = async (files: UploadedFile[]) => {
        setFileList([...files, ...fileList]);

        const file = await generateZip(files);
        await uploadTestConfiguration(file);

        showSuccessToast(t('common.message.add'));
    };

    const deleteFileHandle = (uid: string) => {
        const filtered = fileList.filter((f) => f.uid !== uid);
        setFileList(filtered);
    };

    return <div className="flex flex-col w-full h-fit">
        <AutomaticTestTemplateUploadForm items={fileList} onFileUploaded={filesSelectedHandle} onFileDeleted={deleteFileHandle} />
    </div>
}

export default TestConfigurationTemplateEditor;