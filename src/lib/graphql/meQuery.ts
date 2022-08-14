import {gql} from "@apollo/client";
import {Course} from "./courseQuery";

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
`

export interface AppUser {
    id: number
}

export interface AvailableCoursesQuery {
    availableCourses: Array<Course>;
}

export interface CourseDashboardQuery {
    availableCourses: Array<Course>;
    myCourses: Array<Course>;
}
