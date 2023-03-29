import {Link} from "react-router-dom";
import {UserPlusIcon} from "@heroicons/react/24/solid";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";

interface Props {
    courseId: number | string,
    semesterId: number | string,
}

const ManageCourseSemesterAccessRequestsButton = ({courseId, semesterId}: Props) => {
    const {t} = useTranslation();
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <Link to={`/courses/${courseId}/semester/${semesterId}/access-requests`}>
            <div
                className="w-fit hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
                <UserPlusIcon width={20} height={20}/>
                {isHovering && <span>{t('course.action.users')}</span>}
            </div>
        </Link>
    </div>
}

export default ManageCourseSemesterAccessRequestsButton;