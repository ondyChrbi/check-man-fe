import {UploadArea, UploadedFile} from "../../../../../editor/input/upload/UploadArea";
import React from "react";

interface Props {
    items?: Array<UploadedFile>;
    onFileUploaded?: (file: UploadedFile[]) => void;
    onFileDeleted?: (uid: string) => void;
}

const AutomaticTestTemplateUploadForm = ({items = [], onFileUploaded = () => {}} : Props) => {
    return <div className="flex flex-col items-center justify-center w-full">
        <UploadArea onFilesSelected={onFileUploaded} />
    </div>
};

export default AutomaticTestTemplateUploadForm;