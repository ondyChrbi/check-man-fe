import {useTranslation} from "react-i18next";
import {useDropzone} from "react-dropzone";
import {ArrowUpIcon} from "@heroicons/react/24/solid";
import React from "react";

export interface UploadedFile {
    name: string,
    size: number,
    status: string,
    percent: number,
    uid: string,

    [key: string]: any;
}

interface Props {
    onFilesSelected: (files: UploadedFile[]) => void;
}

export const UploadArea = ({onFilesSelected}: Props) => {
    const {t} = useTranslation();

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: async (acceptedFiles: File[]) => {
            const newFiles = acceptedFiles.map((file: File) => Object.assign(file, {
                status: 'ready',
                percent: 0,
                uid: Math.random().toString(36).substr(2, 9),
            }));

            await onFilesSelected(newFiles);
        },
        multiple: true,
    });

    return <div
        className="flex flex-col items-center justify-center w-full h-64 rounded-lg § bg-gray-50 hover:bg-gray-100" {...getRootProps()}>
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <input multiple {...getInputProps()} />
            <ArrowUpIcon className="my-2 text-xs text-gray-500" width={30} height={30}/>
            <p className="text-xs text-gray-500">
                {t((isDragActive) ? 'common.solution.upload.action.drop' : 'common.upload.action.drag')}
            </p>
        </div>
    </div>;
}