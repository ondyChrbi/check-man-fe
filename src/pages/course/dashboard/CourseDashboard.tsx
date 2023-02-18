import React, {ReactElement} from "react";
import {useQuery} from "@apollo/client";
import {
    CourseDashboardQuery,
    getCourseDashboardQuery
} from "../../../lib/graphql/meQuery";
import {useTranslation} from "react-i18next";
import LoadingSpinner from "../../../components/LoadingSpinner";
import DashboardList from "./DashboardList";
import Icon from "../../../components/dashboard/Icon";
import {useNavigate} from "react-router-dom";
import {PlusIcon} from "@heroicons/react/24/solid";

const CourseDashboard: React.FC = (): ReactElement => {
    const {t} = useTranslation();

    const {loading, error, data} = useQuery<CourseDashboardQuery>(getCourseDashboardQuery);

    if (loading) {
        return <div className="w-full h-screen flex flex-col items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error) {
        return <p>Error</p>
    }

    if (!data?.availableCourses && !data?.myCourses) {
        return <p>{t('challenge.courses.not-available')}</p>;
    }

    return <div className="flex flex-col justify-center items-center p-8">
        <DashboardList courses={data.myCourses} title={t('dashboard.courses.me')} />
        <DashboardList courses={data.availableCourses} title={t('dashboard.courses.available')} />
        <DashboardList courses={data.courses} title={t('dashboard.courses.manager')}>
            <AddCourseIcon />
        </DashboardList>
    </div>
}

const ICON_WIDTH = 80;
const ICON_HEIGHT = 80;

const AddCourseIcon = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const clickHandle = () => {
        return navigate("/courses/add", {replace: true})
    }

    return <Icon onClick={clickHandle} title={t('common.title.settings')} color="#f2f2f2">
        <PlusIcon width={ICON_WIDTH} height={ICON_HEIGHT} />
    </Icon>
}

export default CourseDashboard;