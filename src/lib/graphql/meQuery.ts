import {gql} from "@apollo/client";
import {Course} from "./courseQuery";

export const meQuery = gql`
    query Me {
        me {
            mail
            displayName
            globalRoles {
                id
                name
            }
        }
    }
`;

export const getAvailableCoursesQuery = gql`
    query GetAvailableCourses {
        availableCourses {
            id,
            stagId,
            name,
            dateCreation,
            icon,
            template,
            semesters {
                id,
                note,
                dateStart,
                dateEnd
            }
        }
    }
`;

export const getCourseDashboardQuery = gql`
    query GetCourseDashboard {
        availableCourses {
            id,
            stagId,
            name,
            dateCreation,
            icon,
            template,
            semesters {
                id,
                note,
                dateStart,
                dateEnd
            }
        },
        myCourses {
            id,
            stagId,
            name,
            dateCreation,
            icon,
            template,
            semesters {
                id,
                note,
                dateStart,
                dateEnd
            }
        }
    }
`;

export interface AppUser {
    id: number
    mail: string | undefined
    displayName: string | undefined
    stagId: string | undefined
    disabled: boolean | undefined
    globalRoles: Array<GlobalRole>
    roles? : Array<CourseSemesterRole>
    registrationDate: string | undefined,
    lastAccessDate: string | undefined,
}

export interface AvailableCoursesQuery {
    availableCourses: Array<Course>;
}

export interface CourseDashboardQuery {
    availableCourses: Array<Course>;
    myCourses: Array<Course>;
}

export interface MeQuery {
    me: AppUser
}

export interface GlobalRole {
    id: number,
    name: GlobalRoleValue
}

export interface CourseSemesterRole {
    id: number,
    name: GlobalRoleValue
}

export enum GlobalRoleValue {
    ROLE_GLOBAL_ROLE_MANAGE= 'ROLE_GLOBAL_ROLE_MANAGE',
    ROLE_GLOBAL_ROLE_VIEW= 'ROLE_GLOBAL_ROLE_VIEW',
    ROLE_COURSE_MANAGE= 'ROLE_COURSE_MANAGE',
    ROLE_COURSE_SEMESTER_MANAGE= 'ROLE_COURSE_SEMESTER_MANAGE',
    ROLE_COURSE_VIEW= 'ROLE_COURSE_VIEW',
    ROLE_COURSE_SEMESTER_VIEW= 'ROLE_COURSE_SEMESTER_VIEW',
    ROLE_COURSE_CHALLENGE_VIEW= 'ROLE_COURSE_CHALLENGE_VIEW',
    ROLE_COURSE_CHALLENGE_MANAGE= 'ROLE_COURSE_CHALLENGE_MANAGE',
    ROLE_VIEW_APP_USER= 'ROLE_VIEW_APP_USER',
    ROLE_MANAGE_APP_USER= 'ROLE_MANAGE_APP_USER',
    ROLE_BLOCK_APP_USER= 'ROLE_BLOCK_APP_USER',
    ROLE_UNBLOCK_APP_USER= 'ROLE_UNBLOCK_APP_USER',
    ROLE_COURSE_ACCESS= 'ROLE_COURSE_ACCESS',
    ROLE_CHALLENGE_ACCESS= 'ROLE_CHALLENGE_ACCESS'
}