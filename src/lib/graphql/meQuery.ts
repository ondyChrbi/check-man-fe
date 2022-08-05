import {gql} from "@apollo/client";

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

export const getCourseSemesterQuery = gql`
    query GetCourseSemester($id: ID!) {
        semester(id: $id) {
            id,
            note,
            dateStart,
            dateEnd
        }
    }
`;

export const getCourseDashboard = gql`
    query GetCourseDashboard {
        courseDashboard {
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
    }
`

export interface Course {
    id: number;
    stagId: string;
    name: string;
    dateCreation: Date;
    icon?: string;
    template?: string;
    semesters?: Semester[];
}

export interface Semester {
    id: number;
    note: string;
    dateStart: string;
    dateEnd: string;
}

export interface SemesterQuery {
    semester?: Semester;
}

export interface AvailableCoursesQuery {
    availableCourses: Array<Course>;
}

export interface CourseDashboardQuery {
    courseDashboard: CourseDashboard;
}

export interface CourseDashboard {
    availableCourses: Array<Course>;
    myCourses: Array<Course>;
}