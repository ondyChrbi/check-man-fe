import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {PlusIcon} from "@heroicons/react/24/solid";

interface Props {
    courseId: number | string;
}

const CourseCreateButton = ({courseId} : Props) => {
    const {t} = useTranslation();

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <Link to={`/courses/${courseId}/semester/create`}>
            <div className="rounded-full w-fit hover:bg-teal-200 text-gray-800 font-bold py-2 p-2 inline-flex items-center">
                <PlusIcon width={20} height={20}/>
                {isHovering && <span>{t('challenge.action.create')}</span>}
            </div>
        </Link>
    </div>
}

export default CourseCreateButton;