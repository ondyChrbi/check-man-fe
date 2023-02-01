import JSZip from 'jszip';
import {UploadedFile} from "../../components/editor/input/upload/UploadArea";

export const generateZip = async (files: UploadedFile[]) => {
    const zip = new JSZip();

    files.filter(f => !!f).forEach((f) => {
       //@ts-ignore
       zip.file(f.name, f!);
    });

    return zip.generateAsync({type: 'blob'});
};