import React from "react";
import {Course} from "../../lib/graphql/meQuery";
import {useNavigate} from "react-router-dom";

interface Props {
    course: Course,
    outdated?: boolean,
    disabled?: boolean
}

const MODAL_OPEN_LIMIT = 1;

const CourseIcon = ({course}: Props) => {
    const navigate = useNavigate();
    const semesters = course.semesters ?? [];

    const iconClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (semesters.length === MODAL_OPEN_LIMIT) {
            const semester = semesters[0];

            return navigate(`/semester/${semester.id}`, {replace: true})
        }
    }

    return <>
        <div onClick={iconClickHandler}>
            <h2>{course.name}</h2>
            {(semesters.length === MODAL_OPEN_LIMIT) &&
                <h3>{semesters[0].dateStart}-{semesters[0].dateEnd}</h3>
            }
        </div>
    </>
}

export default CourseIcon;