import {useTranslation} from "react-i18next";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Course} from "../../../lib/graphql/courseQuery";
import {WrenchIcon} from "@heroicons/react/24/solid";

interface Props {
    course: Course
}

const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;

const ManageCourseButton = ({course}: Props) => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const clickHandle = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        navigate(`/courses/${course.id}/manage`);
    }

    return <button onClick={clickHandle}
                   className="w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-full inline-flex items-center">
        <WrenchIcon width={ICON_WIDTH} height={ICON_HEIGHT}/>
        <span className="ml-2">{t('course.semester.manage')}</span>
    </button>
}

export default ManageCourseButton;