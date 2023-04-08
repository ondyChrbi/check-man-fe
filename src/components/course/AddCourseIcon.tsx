import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import CoolModal from "../ui/modal/CoolModal";
import {PlusIcon} from "@heroicons/react/24/solid";
import CourseEditor from "../../pages/course/CourseEditor";

const ICON_WIDTH = 80;
const ICON_HEIGHT = 80;

interface Props {
    modalTitle?: string
    modal?: JSX.Element
    children?: JSX.Element
}

const AddCourseIcon = ({}: Props) => {
    const {t} = useTranslation();
    const [clicked, setClicked] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const closeClickedHandle = () => {
        setClicked(false);
    }

    if (clicked) {
        return <CoolModal title={t('course.new.title')} onCloseClicked={closeClickedHandle}>
            <div className="p-5">
                <CourseEditor />
            </div>
        </CoolModal>
    }

    const clickHandle = () => {
        setClicked(true);
    }

    const mouseIconEnterHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        setIsHovering(true);
    }

    const mouseIconLeaveHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        setIsHovering(false);
    }

    return <div className="course-container flex flex-col mr-5 hover:cursor-pointer"
                onClick={clickHandle}
                onMouseEnter={mouseIconEnterHandler}
                onMouseLeave={mouseIconLeaveHandler}>
        <div className="flex flex-col justify-center align-middle items-center course-icon rounded-3xl w-40 h-40">
            <PlusIcon width={ICON_WIDTH} height={ICON_HEIGHT} fill="#0c9488" />
        </div>
        <div className="h-14">
            {isHovering && <div className="my-4 text-center">{t('common.title.settings')}</div>}
        </div>
    </div>
}

export default AddCourseIcon;