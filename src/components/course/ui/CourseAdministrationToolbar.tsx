import {Semester} from "../../../lib/graphql/courseQuery";
import React from "react";
import SemesterEditor from "../../../pages/course/semester/SemesterEditor";
import ShowModalButton from "../../ui/modal/ShowModalButton";
import {useTranslation} from "react-i18next";
import {PlusIcon} from "@heroicons/react/24/solid";

const ICON_WIDTH = 20;
const ICON_HEIGHT = 20;

interface Props {
    semester?: Semester
}

const CourseAdministrationToolbar = ({}: Props) => {
    const {t} = useTranslation();

    return <div className="flex flex-row align-middle justify-end [&>*]:pl-2">
        <div className="pl-2">
            <ShowModalButton buttonTitle={t('course.semester.create')} modalTitle={t('course.semester.new.title')}
            icon={<PlusIcon width={ICON_WIDTH} height={ICON_HEIGHT} />}>
                <SemesterEditor/>
            </ShowModalButton>
        </div>
    </div>
}


export default CourseAdministrationToolbar;