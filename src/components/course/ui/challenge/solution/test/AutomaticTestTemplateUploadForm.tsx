import {UploadArea, UploadedFile} from "../../../../../editor/input/upload/UploadArea";
import React from "react";
import FileList from "../../../../../editor/input/upload/FileList";

interface Props {
    items?: Array<UploadedFile>;
    onFileUploaded?: (file: UploadedFile[]) => void;
    onFileDeleted?: (uid: string) => void;
}

const AutomaticTestTemplateUploadForm = ({items = [], onFileUploaded = () => {}, onFileDeleted = () => {}} : Props) => {
    return <div className="flex flex-col items-center justify-center w-full">
        <UploadArea onFilesSelected={onFileUploaded} />
        {items?.length > 0 && <div className="flex flex-row items-center justify-center w-full">
            <FileList items={items} onDelete={onFileDeleted} />
        </div>}
    </div>
};

export default AutomaticTestTemplateUploadForm;