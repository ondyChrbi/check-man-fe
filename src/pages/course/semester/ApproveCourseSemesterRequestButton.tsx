import {useTranslation} from "react-i18next";
import {HandThumbUpIcon} from "@heroicons/react/24/solid";

interface Props {
    semesterId: string | number;
}

const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;

const ApproveCourseSemesterRequestButton = ({semesterId}: Props) => {
    const {t} = useTranslation();

    return <div className="flex justify-center space-x-2">
        <div>
            <button
                type="button"
                data-te-ripple-init="true"
                data-te-ripple-color="light"
                className="flex items-center rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg">
                <HandThumbUpIcon width={ICON_WIDTH} height={ICON_HEIGHT} />
                {t('course.semester.available.access.approve')}
            </button>
        </div>
    </div>
};

export default ApproveCourseSemesterRequestButton;