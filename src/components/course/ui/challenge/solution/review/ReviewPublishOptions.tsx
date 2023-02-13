import {Status} from "../../../../../../lib/graphql/challengeQuery";
import {ArrowUturnLeftIcon, CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {useTranslation} from "react-i18next";
import React from "react";

const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;

const reviewOptions = [Status.APPROVED, Status.RETURN_TO_EDIT, Status.DENIED];

const statusIcons = new Map([
    [Status.APPROVED, <CheckIcon className="mr-2" width={ICON_WIDTH} height={ICON_HEIGHT}/>],
    [Status.RETURN_TO_EDIT, <ArrowUturnLeftIcon className="mr-2" width={ICON_WIDTH} height={ICON_HEIGHT}/>],
    [Status.DENIED, <XMarkIcon className="mr-2" width={ICON_WIDTH} height={ICON_HEIGHT}/>],
]);

const statusColors = new Map([
    [Status.APPROVED, 'bg-teal-200'],
    [Status.RETURN_TO_EDIT, 'bg-blue-300'],
    [Status.DENIED, 'bg-red-400'],
]);

const statusColorsHover = new Map([
    [Status.APPROVED, 'bg-teal-300'],
    [Status.RETURN_TO_EDIT, 'bg-blue-400'],
    [Status.DENIED, 'bg-red-500'],
]);

interface Props {
    onClicked?: (status: Status) => void | Promise<void>
}

const ReviewPublishOptions = ({onClicked}: Props) => {
    const {t} = useTranslation();

    const clickHandle = async (e: React.MouseEvent<HTMLElement>, status: Status) => {
        e.preventDefault();

        if (onClicked) {
            await onClicked(status);
        }
    }

    return <div className="flex flex-row justify-start items-start align-baseline">
        {reviewOptions.map(status =>
            <button onClick={e => clickHandle(e, status)}
                    className={`${statusColors.get(status)} hover:${statusColorsHover.get(status)}  w-fit text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center mx-1`}>
                {statusIcons.get(status)}
                <span>{t(`challenge.solution.status.action.${status}`)}</span>
            </button>
        )}
    </div>
}

export default ReviewPublishOptions;