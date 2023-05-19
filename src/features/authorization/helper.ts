import {SemesterRole} from "../../lib/graphql/courseQuery";
import {GlobalRole} from "../../lib/graphql/meQuery";

const COURSES_ROLES_KEY = "courses_roles";
const GLOBAL_ROLES_KEY = "global_roles";

export interface CourseRoles {
    semesterId: number | string;
    roles: Array<SemesterRole>;
}

export interface GlobalRoles {
    globalRoles: Array<GlobalRole>;
}

export const saveCourseRolesToLocalStorage = (courseRoles: Array<CourseRoles>) => {
    localStorage.setItem(COURSES_ROLES_KEY, JSON.stringify(courseRoles));
};

export const saveGlobalRolesToLocalStorage = (globalRoles: Array<GlobalRole>) => {
    localStorage.setItem(GLOBAL_ROLES_KEY, JSON.stringify(globalRoles));
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

export const getGlobalRolesFromLocalStorage = (globalRolesFromStorage = localStorage.getItem(GLOBAL_ROLES_KEY)) => {
    if (!globalRolesFromStorage) {
        return [];
    }

    const parsed = JSON.parse(globalRolesFromStorage);

    if (parsed as Array<GlobalRole>) {
        return parsed;
    }

    return [];
}
