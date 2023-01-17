import {SemesterRole} from "../../lib/graphql/courseQuery";

const COURSES_ROLES_KEY = "courses_roles";

export interface CourseRoles {
    courseId: number | string;
    roles: Array<SemesterRole>;
}

const initLocalStorage = () => {
    localStorage.setItem(COURSES_ROLES_KEY, JSON.stringify([]));
};

export const saveCourseRolesToLocalStorage = (courseRoles: Array<CourseRoles>) => {
    localStorage.setItem(COURSES_ROLES_KEY, JSON.stringify(courseRoles));
};

export const getCourseRolesFromLocalStorage = (coursesFromStorage = localStorage.getItem(COURSES_ROLES_KEY)) => {
    if (!coursesFromStorage) {
        return [];
    }

    const parsed = JSON.parse(coursesFromStorage);

    if (parsed as Array<CourseRoles>) {
        return parsed;
    }

    return [];
}
