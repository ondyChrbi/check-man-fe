import React from 'react';
import {useTranslation} from "react-i18next";

interface FileListItemProps {
    uid: string,
    filename: string;
    fileSize: string;
    onDelete?: (uid: string) => void
}

const FileListItem = ({ filename, fileSize, uid, onDelete } : FileListItemProps) => {
    const {t} = useTranslation();

    const onDeleteClickHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (onDelete) {
            await onDelete(uid);
        }
    }

    return <>
        <li className="bg-white p-4 rounded-lg shadow relative group hover:opacity-75">
            <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg>
                </div>
                <div className="ml-4">
                    <div className="text-gray-700 font-medium">{filename}</div>
                    <div className="text-gray-500 text-sm">{fileSize}</div>
                </div>
            </div>
            <div onClick={onDeleteClickHandle} className="absolute inset-0 bg-gray-200 opacity-0 flex items-center justify-center group-hover:opacity-100 cursor-pointer">
                <div className="text-gray-700 font-medium">{t('common.upload.action.delete')}</div>
            </div>
        </li>
    </>
};

export default FileListItem;