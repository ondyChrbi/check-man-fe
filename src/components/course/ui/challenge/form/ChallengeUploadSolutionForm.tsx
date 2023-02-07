import React, {useState} from 'react';
import FileListItem from "../../../../editor/input/upload/FileListItem";
import {UploadArea, UploadedFile} from "../../../../editor/input/upload/UploadArea";
import {generateZip} from "../../../../../features/upload/helper";
import {ChallengeV1ApiFp} from "../../../../../lib/api/api";
import {useAppSelector} from "../../../../../features/storage/hooks";
import {useTranslation} from "react-i18next";

interface Props {
    courseId: number | string;
    semesterId: number | string;
    challengeId: number | string;
}

const ChallengeUploadSolutionForm = ({courseId, semesterId, challengeId}: Props) => {
    const {t} = useTranslation();

    const authenticationInfo = useAppSelector((state) => state.storage.authentication.jwtInfo);

    const [fileList, setFileList] = useState<UploadedFile[]>([]);
    const [, setUploading] = useState(false);

    const deleteFromUploadHandle = (uid: string) => {
        const filtered = fileList.filter((f) => f.uid !== uid);

        setFileList(filtered);
    };

    const filesSelectedHandle = (files: UploadedFile[]) => {
        setFileList([...files, ...fileList]);
    };

    const handleUpload = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        setUploading(true);

        const file = await generateZip(fileList);

        if (authenticationInfo) {
            const response = (await ChallengeV1ApiFp().upload(+courseId, +semesterId, +challengeId, {file}, {}));

            await response();
            setUploading(false);
        }
    };

    return <>
        <div className="flex items-center justify-center w-full">
            <UploadArea onFilesSelected={filesSelectedHandle} />
        </div>
        <div className="flex flex-row items-center justify-center w-full">
            {fileList.length !== 0 && <ul className="flex flex-wrap list-none p-0">
                {fileList.map((file) => <FileListItem
                    key={file.uid}
                    uid={file.uid}
                    filename={file.name}
                    fileSize={file.size.toString()}
                    onDelete={deleteFromUploadHandle}
                />)
                }
            </ul>}
        </div>
        <div className="flex items-center justify-center w-full my-5">
            <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {t('challenge.solution.upload.action.send')}
            </button>
        </div>
    </>;
};

export default ChallengeUploadSolutionForm;
