import React from 'react';
import {useTranslation} from "react-i18next";

interface FileListItemProps {
    filename: string;
    uid?: string;
    fileSize?: string;
    onDelete?: (uid: string) => void;
    children?: JSX.Element;
}

const FileListItem = ({ filename, fileSize = "", uid = "", onDelete, children = <></>} : FileListItemProps) => {
    const {t} = useTranslation();

    const onDeleteClickHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (onDelete) {
            await onDelete(uid);
        }
    }

    return <li className="bg-white p-4 rounded-lg shadow relative group hover:opacity-75 list-none">
            <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
Up                </div>
                <div className="ml-4">
                    <div className="text-gray-700 font-medium">{filename}</div>
                    <div className="text-gray-500 text-sm">{fileSize}</div>
                    {children}
                </div>
            </div>
            {onDelete && <div onClick={onDeleteClickHandle} className="absolute inset-0 bg-gray-200 opacity-0 flex items-center justify-center group-hover:opacity-100 cursor-pointer">
                <div className="text-gray-700 font-medium">{t('common.upload.action.delete')}</div>
            </div>}
    </li>
};

export default FileListItem;