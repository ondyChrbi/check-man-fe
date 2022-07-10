import React, {ReactElement} from "react";
import {useQuery} from "@apollo/client";
import {GET_AVAILABLE_COURSES_QUERY, CourseData} from "../lib/graphql/meQuery";
import {useTranslation} from "react-i18next";
import CourseIcon from "../components/ui/CourseIcon"

const AvailableCourses: React.FC = (): ReactElement => {
    const {loading, error, data} = useQuery<CourseData>(GET_AVAILABLE_COURSES_QUERY);
    const {t} = useTranslation();

    if (loading) { return <p>Loading</p> }
    if (error) { return <p>Error</p>}

    return (
        <React.Fragment>
            <main>
                {!(data?.myCourses) && <p>{t('dashboard.courses.available')}</p>}
                {data?.myCourses?.map((course) =>
                    course?.semesters?.map((semester) =>
                        <CourseIcon course={course} semester={semester} />
                    )
                )}
            </main>
        </React.Fragment>
    );
}

export default AvailableCourses;