import {gql} from "@apollo/client";
import {AppUser} from "./meQuery";

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
    SUBMIT_CHALLENGE_SOLUTION = 'SUBMIT_CHALLENGE_SOLUTION'
}