import {gql} from "@apollo/client";
import {AppUser, CourseSemesterRole} from "./meQuery";

export const courseQuery = gql`
    query GetCourseSemester($id: ID!) {
        semester(id: $id) {
            id,
            note,
            dateStart,
            dateEnd
        }
        courseRoles(id: $id)
    }
`
export const courseQueryWithRelatedUser = gql`
    query GetCourseSemester($courseId: ID!, $semesterId: ID!) {
        semester(id: $courseId) {
            semesterId: id,
            note,
            dateStart,
            dateEnd,
            relatedUsers {
                id,
                stagId,
                displayName,
                mail,
                disabled,
                lastAccessDate,
                registrationDate,
                roles(semesterId: $semesterId) {
                    id,
                    name
                }
            }
        }
    }
`

export const courseRoles = gql`
   query GetCourseRoles($id: ID!) {
       courseRoles(id: $id)
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

export const allCourseRoles = gql`
    query GetAllCourseRoles {
        allCourseRoles {
            id,
            name
        }
    }
`;

export const createCourse = gql`
    mutation CreateCourseMutation($input : CourseInput!) {
        createCourse(input: $input) {
            id,
            stagId
            name,
            dateCreation,
            icon,
            template,
        }
    }
`;

export const course = gql`
    query Course($id: ID!) {
        course(id: $id) {
            id,
            stagId,
            dateCreation,
            icon,
            template,
            semesters {
                id,
                dateStart,
                dateEnd,
                note
            }
        }
    }
`

export const createSemester = gql`
    mutation CreateSemesterMutation($courseId: ID! $input: SemesterInput!) {
        createSemester(courseId: $courseId, input: $input) {
            id,
            note,
            dateStart,
            dateEnd
        }
    }
`

export interface CreateSemesterMutation {
    createSemester: Semester
}

export interface CreateSemesterVariables {
    courseId: string | number,
    input: SemesterInput
}

export interface SemesterInput {
    note?: string
    dateStart: string,
    dateEnd?: string
}

export interface CourseQuery {
    course: Course
}

export interface CourseVariables {
    id: string | number
}

export interface CreateCourseMutation {
    createCourse: Course
}

export interface CreateCourseVariables {
    input: CourseInput
}

export interface CourseInput {
    stagId: string;
    name: string;
    dateCreation?: Date;
    icon?: string;
    template?: string;
}

export interface AllCourseRolesQuery {
    allCourseRoles: Array<CourseSemesterRole>
}

export interface CourseQueryWithRelatedUserQuery {
    semester?: Semester
}

export interface CourseQueryWithRelatedUserVariables {
    courseId: number | string,
    semesterId: number | string,
}

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
    relatedUsers?: Array<AppUser>
}

export interface SemesterQuery {
    semester?: Semester;
    courseRoles: SemesterRole[];
}

export interface CourseRolesQuery {
    courseRoles: SemesterRole[];
}

export enum SemesterRole {
    ACCESS = 'ACCESS',
    CREATE_CHALLENGE = 'CREATE_CHALLENGE',
    EDIT_CHALLENGE = 'EDIT_CHALLENGE',
    DELETE_CHALLENGE = 'DELETE_CHALLENGE',
    SUBMIT_CHALLENGE_SOLUTION = 'SUBMIT_CHALLENGE_SOLUTION',
    REVIEW_CHALLENGE = 'REVIEW_CHALLENGE',
    VIEW_SOLUTIONS = 'VIEW_SOLUTIONS',
    MANAGE_USERS = 'MANAGE_USERS',
    VIEW_USERS = 'VIEW_USERS',
}