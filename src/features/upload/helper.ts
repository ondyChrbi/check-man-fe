import JSZip from 'jszip';
import {UploadedFile} from "../../components/editor/input/upload/UploadArea";

const FIRST_INDEX = 0;

export const generateZip = async (files: UploadedFile[]) => {
    if (checkSingleZip(files)) {
        const file = files[FIRST_INDEX];
        //@ts-ignore
        return new Blob([file], { type: file.type })
    }

    const jszip = new JSZip();

    files.filter(f => !!f).forEach((f) => {
       //@ts-ignore
       jszip.file(f.name, f!);
    });

    return jszip.generateAsync({type: 'blob'});
};

const checkSingleZip = (files: UploadedFile[]) => {
    return files.length === 1 && files[FIRST_INDEX].name.endsWith(".zip")
};