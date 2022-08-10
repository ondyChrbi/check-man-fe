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

export const getCourseDashboardQuery = gql`
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

export const createSemesterAccessRequestMutation = gql`
    mutation CreateSemesterAccessRequestMutation($semesterId: ID!) {
        createSemesterAccessRequest(semesterId: $semesterId) {
            creationDate
            expirationDate
        }
    }
`

export interface SemesterAccessRequestVariables {
    semesterId: number
}

export interface CreateSemesterAccessRequestMutation {
    createSemesterAccessRequest: SemesterAccessRequest,
}

export interface SemesterAccessRequest {
    appUser: AppUser,
    semester: Semester,
    creationDate: string,
    expirationDate: string
    id: string
}

export interface AppUser {
    id: number
}

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