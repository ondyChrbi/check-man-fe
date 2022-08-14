import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useMutation} from "@apollo/client";
import {
    Course, createSemesterAccessRequestMutation,
    CreateSemesterAccessRequestMutation,
    Semester,
    SemesterAccessRequestVariables
} from "../../../lib/graphql/courseQuery";

interface Props {
    course: Course,
    available?: boolean,
    outdated?: boolean,
    disabled?: boolean
}

const MODAL_OPEN_LIMIT = 1;

const CourseIcon = ({course, available = false}: Props) => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [sendAccessRequest, {data, loading, error}] = useMutation<
        CreateSemesterAccessRequestMutation,
        SemesterAccessRequestVariables>(createSemesterAccessRequestMutation);

    const [showSign, setShowSign] = useState(false);

    const semesters = course.semesters ?? [];

    const iconClickHandler = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (available && course && course.semesters) {
            await joinCourseHandler(course.semesters[0])
            return;
        }

        if (semesters.length === MODAL_OPEN_LIMIT) {
            const semester = semesters[0];

            return navigate(`/courses/${course.id}/semester/${semester.id}`, {replace: true})
        }
    }

    const joinCourseHandler = async (semester: Semester) => {
        await sendAccessRequest({variables: {semesterId: semester.id}});
    }


    const mouseIconEnterHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (available) { setShowSign(true); }
    }

    const mouseIconLeaveHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (available) { setShowSign(false); }
    }

    return <>
        <div className="course-container flex flex-col mx-10 hover:cursor-pointer"
             onClick={iconClickHandler}
             onMouseEnter={mouseIconEnterHandler}
             onMouseLeave={mouseIconLeaveHandler}>
            <div className="flex flex-col justify-center course-icon rounded-3xl w-40 h-40 shadow hover:shadow-lg" style={{backgroundColor: course.template}}>
                {(!available || (available && !showSign)) && <img className="m-5" src={course.icon} alt={course.name} />}
                {available && showSign && <button>{t('course.available.join')}</button>}
            </div>
            <div className="my-4">{course.name}</div>
        </div>
    </>
}

export default CourseIcon;