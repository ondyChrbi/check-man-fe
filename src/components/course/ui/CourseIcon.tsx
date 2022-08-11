import React from "react";
import {
    Course,
    CreateSemesterAccessRequestMutation,
    createSemesterAccessRequestMutation,
    Semester, SemesterAccessRequestVariables
} from "../../../lib/graphql/meQuery";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useMutation} from "@apollo/client";
import './CourseIcon.css';

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


    const semesters = course.semesters ?? [];

    const iconClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (semesters.length === MODAL_OPEN_LIMIT) {
            const semester = semesters[0];

            return navigate(`/courses/${course.id}/semester/${semester.id}`, {replace: true})
        }
    }

    const joinCourseHandler = async (event: React.MouseEvent<HTMLElement>, semester: Semester) => {
        event.preventDefault();

        await sendAccessRequest({variables: {semesterId: semester.id}});
    }

    return <>
        <div onClick={iconClickHandler} className="course-container flex flex-col items-center mx-10 hover:cursor-pointer">
            <div className="course-icon rounded-3xl shadow hover:shadow-lg" style={{backgroundColor: course.template}}>
                <img className="m-5" src={course.icon} alt={course.name} />
            </div>
            <div className="my-4">{course.name}</div>
        </div>
    </>
}

export default CourseIcon;