import {ArrowDownTrayIcon} from "@heroicons/react/24/solid";
import React from "react";
import {useTranslation} from "react-i18next";
import {showErrorToast} from "../../../../editor/helpers";
import axios from "axios";
import {useAppSelector} from "../../../../../features/storage/hooks";
import {Solution} from "../../../../../lib/graphql/challengeQuery";
import { saveAs } from 'file-saver';

const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;

const TESTING_SUBSYSTEM_URL =` ${import.meta.env.VITE_TESTING_SUBSYSTEM_API_URL}`;

interface Props {
    solution: Solution
}

const SolutionDownloadButton = ({solution} : Props) => {
    const {t} = useTranslation();
    const authenticationInfo = useAppSelector((state) => state.storage.authentication.jwtInfo);

    const clickHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (!authenticationInfo?.token) {
            showErrorToast(t('common.message.not-authenticated'));
            return;
        }

        const response = await axios.get(`${TESTING_SUBSYSTEM_URL}/solution/${solution.id}/download`, {
            headers: {'Authorization': `${authenticationInfo.token}`},
            responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'application/zip' });
        saveAs(blob, createFileName(solution));
    }

    return <div className="flex flex-row justify-start items-start align-baseline">
        <button onClick={clickHandle}
                className="w-fit hover:bg-gray-500 bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
            <ArrowDownTrayIcon className="mr-2" width={ICON_WIDTH} height={ICON_HEIGHT}/>
            <span>{t('common.button.download')}</span>
        </button>
    </div>
};

const createFileName = (solution: Solution) => {
    return `${solution.author.displayName}-${solution.id}.zip`;
}

export default SolutionDownloadButton;