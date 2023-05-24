import React, {useState} from 'react';
import {UploadArea, UploadedFile} from "../../../../editor/input/upload/UploadArea";
import {generateZip} from "../../../../../features/upload/helper";
import {useAppSelector} from "../../../../../features/storage/hooks";
import {useTranslation} from "react-i18next";
import {useChallengeUpload} from "../../../../../features/hooks/challenge";
import FileList from "../../../../editor/input/upload/FileList";
import {showErrorToast} from "../../../../editor/helpers";

interface Props {
    challengeId: number | string;
}

const ChallengeUploadSolutionForm = ({challengeId}: Props) => {
    const {t} = useTranslation();
    const authenticationInfo = useAppSelector((state) => state.storage.authentication.jwtInfo);

    const {uploadSolution, uploadProgress} = useChallengeUpload(challengeId);
    const [fileList, setFileList] = useState<UploadedFile[]>([]);

    const deleteFromUploadHandle = (uid: string) => {
        const filtered = fileList.filter((f) => f.uid !== uid);
        setFileList(filtered);
    };

    const filesSelectedHandle = (files: UploadedFile[]) => {
        setFileList([...files, ...fileList]);
    };

    const uploadCompleteHandle = () => {
        setFileList([]);
    };

    const handleUpload = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (fileList.length <= 0) {
            showErrorToast(t('challenge.solution.upload.error.no-files'));
            return;
        }

        const file = await generateZip(fileList);

        if (authenticationInfo) {
            await uploadSolution(file, uploadCompleteHandle);
        }
    };

    return <>
        <div className="flex items-center justify-center w-full">
            <UploadArea onFilesSelected={filesSelectedHandle} />
        </div>
        <div className="flex flex-row items-center justify-center w-full">
            <FileList items={fileList} onDelete={deleteFromUploadHandle} />
        </div>
        {fileList.length > 0 && <div className="flex items-center justify-center w-full my-5">
            <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {t('challenge.solution.upload.action.send')}
            </button>
        </div>}
        {showProgressBar(uploadProgress) && <>
            Uploading...
        </>}
    </>;
};

const showProgressBar = (uploadProgress: number) => {
    return uploadProgress > 0 && uploadProgress < 100;
};

export default ChallengeUploadSolutionForm;
