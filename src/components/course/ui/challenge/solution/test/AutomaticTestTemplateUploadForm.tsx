import {UploadArea, UploadedFile} from "../../../../../editor/input/upload/UploadArea";
import React from "react";

interface Props {
    onFileUploaded: (file: UploadedFile[]) => void;
}

const AutomaticTestTemplateUploadForm = ({onFileUploaded = () => {}} : Props) => {
    return <div className="flex items-center justify-center w-full">
        <UploadArea onFilesSelected={onFileUploaded} />
    </div>
};

export default AutomaticTestTemplateUploadForm;