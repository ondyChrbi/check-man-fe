import {Semester} from "../../../../lib/graphql/courseQuery";
import {useTranslation} from "react-i18next";
import React from "react";
import {CreditCardIcon} from "@heroicons/react/24/outline";

interface SendAccessRequestButtonProps {
    semester: Semester

    onClick?: (semester: Semester) => void | Promise<void>
}

const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;

const SendAccessRequestButton = ({semester, onClick = () => {}}: SendAccessRequestButtonProps) => {
    const {t} = useTranslation();
    const clickHandle = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        await onClick(semester);
    }

    return <button onClick={clickHandle}
                   className="w-fit bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-full inline-flex items-center">
        <CreditCardIcon width={ICON_WIDTH} height={ICON_HEIGHT}/>
        <span className="ml-2">{t('course.semester.available.access.join')}</span>
    </button>
}

export default SendAccessRequestButton;