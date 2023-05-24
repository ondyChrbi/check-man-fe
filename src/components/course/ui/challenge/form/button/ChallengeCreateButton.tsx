import {Link} from "react-router-dom";
import {PlusIcon} from "@heroicons/react/24/solid";
import React from "react";
import {useTranslation} from "react-i18next";
import {animated} from "@react-spring/web";

interface Props {
    semesterId: number | string;
    courseId: number | string;
}

const ChallengeCreateButton = ({semesterId, courseId}: Props) => {
    const {t} = useTranslation();

    return <div className="flex flex-row justify-start align-middle items-start w-full">
        <Link to={`/courses/${courseId}/semester/${semesterId}/challenge/create`}>
            <div
                className="rounded-full w-full text-white py-2 px-4 inline-flex items-center  hover:font-bold">
                <PlusIcon width={20} height={20} className="mr-3.5" />
                <animated.div>{t('challenge.action.create')}</animated.div>
            </div>
        </Link>
    </div>
}

export default ChallengeCreateButton;