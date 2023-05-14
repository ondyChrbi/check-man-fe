import React, {useState} from "react";
import {
    Course, Semester,
} from "../../lib/graphql/courseQuery";
import {useNavigate} from "react-router-dom";

interface Props {
    course: Course,

    semester?: Semester,

    disabled?: boolean
    children?: JSX.Element

    onClick?: (semester: Semester) => void | Promise<void>
}

const CourseIcon = ({course, semester, children = <></>, onClick = () => {}, disabled}: Props) => {
    const navigate = useNavigate();
    const [isHovering, setIsHovering] = useState(false);

    const clickHandle = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (!disabled && semester) {
            await onClick(semester);
            return navigate(`/courses/${course.id}/semester/${semester.id}`, {replace: true})
        }
    }

    const mouseIconEnterHandle = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        setIsHovering(true);
    }

    const mouseIconLeaveHandle = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        setIsHovering(false);
    }

    return <div className="course-container flex flex-col mr-5 hover:cursor-pointer relative"
                onClick={clickHandle}
                onMouseEnter={mouseIconEnterHandle}
                onMouseLeave={mouseIconLeaveHandle}>
        <div className="flex flex-col justify-center course-icon rounded-3xl w-40 h-40"
             style={{backgroundColor: course.template}}>
            {course.icon &&
                <img className="m-5" src={course.icon} alt={course.name}/>
            }
        </div>
        <div className="h-14">
            <div className="my-4 text-center">{course.name}</div>
        </div>
        {children}
    </div>
}

export default CourseIcon;