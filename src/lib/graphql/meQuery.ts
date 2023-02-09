import {gql} from "@apollo/client";
import {Course} from "./courseQuery";

export const meQuery = gql`
    query Me {
        me {
            mail
            displayName
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