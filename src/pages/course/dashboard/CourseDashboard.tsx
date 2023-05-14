import React, {ReactElement} from "react";
import {useQuery} from "@apollo/client";
import {
    CourseDashboardQuery,
    getCourseDashboardQuery, GlobalRoleValue
} from "../../../lib/graphql/meQuery";
import {useTranslation} from "react-i18next";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";
import DashboardList from "./DashboardList";
import Logo from "../../../components/header/Logo";
import {useGlobalRoles} from "../../../features/authorization/hooks";
import AddCourseIcon from "../../../components/course/AddCourseIcon";
import {Course} from "../../../lib/graphql/courseQuery";

const CourseDashboard = (): ReactElement => {
    const {t} = useTranslation();

    const { globalRoles } = useGlobalRoles();
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

    const myCourses = data.myCourses || [];
    const availableCourses = data.availableCourses || [];
    const coursesToManage = getCoursesToManage(data);

    return <div className="flex flex-col justify-center items-center p-8 h-full">
        <div className="mb-16">
            <Logo/>
        </div>
        <DashboardList coursesToManage={coursesToManage}
                       myCourses={myCourses}
                       availableCourses={availableCourses}
        >
            { globalRoles.includes(GlobalRoleValue.ROLE_COURSE_MANAGE) && <AddCourseIcon /> }
        </DashboardList>
    </div>
}

const getCoursesToManage = (data: CourseDashboardQuery | undefined) : Array<Course> => {
    if (!data) {
        return [];
    }

    const myCourses = data.myCourses.map(c => c.id) || [];
    const availableCourses = data.availableCourses.map(c => c.id) || [];
    const toAccess = myCourses.concat(availableCourses) || [];

    return data.courses.filter((c) => !toAccess.includes(c.id));
}

export default CourseDashboard;