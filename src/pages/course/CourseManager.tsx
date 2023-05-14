import {useParams} from "react-router-dom";

const CourseManager = () => {
    const {courseId} = useParams<'courseId'>();

    return <>
        Course editor for course {courseId}
    </>
}

export default CourseManager;