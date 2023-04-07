import {UploadedFile} from "./UploadArea";
import FileListItem from "./FileListItem";
import React from "react";

interface Props {
    items: Array<UploadedFile>;
    onDelete?: (uid: string) => void;
}

const FileList = ({items, onDelete = () => {}}: Props) => {
    return <ul className="flex flex-wrap list-none p-0">
        {items.map((file) => <FileListItem
            key={file.uid}
            uid={file.uid}
            filename={file.name}
            fileSize={file.size.toString()}
            onDelete={onDelete}
        />)
        }
    </ul>
};

export default FileList;