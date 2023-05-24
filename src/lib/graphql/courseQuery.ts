import {gql} from "@apollo/client";
import {AppUser} from "./meQuery";
import {SortOptions} from "./index";
import {FeedbackStatistics} from "./statisticsQuery";

export const courseQuery = gql`
    query GetCourseSemester($semesterId: ID! $courseId: ID!) {
        course(id: $courseId) {
            id,
            stagId,
            name
        }
        semester(id: $semesterId) {
            id,
            note,
            dateStart,
            dateEnd,
            fulfillmentConditions {
                minOptional
                minMandatory
                minCredit
                minExam
            },
            statistic {
                semesterId
                challengeId
                description
                feedbackTypeId
                count
            }
        }
        courseRoles(id: $semesterId)
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

export const createSemesterAccessRequestMutation = gql`
    mutation CreateSemesterAccessRequestMutation($semesterId: ID!) {
        createSemesterAccessRequest(semesterId: $semesterId) {
            id
            creationDate
            expirationDate
        }
    }
`

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
    query Course($id: ID!, $semesterSortBy: SemesterOrderByField) {
        course(id: $id) {
            id,
            stagId,
            dateCreation,
            icon,
            template,
            semesters(semesterSortBy: $semesterSortBy) {
                id,
                dateStart,
                dateEnd,
                note
            }
        }
    }
`;

export const semesters = gql`
    query Semesters($courseId: ID!, $oderBy: SemesterOrderByField, $sortOrder: SortOrder, $pageSize: Int, $page: Int) {
        semesters(courseId: $courseId, oderBy: $oderBy, sortOrder: $sortOrder, pageSize: $pageSize, page: $page) {
            id,
            dateStart,
            dateEnd,
            note,
            
            page,
            pageSize
        }
    }
`;

export interface SemestersVariables extends SortOptions<SemesterSortField>{
    courseId: string | number
}

export interface SemestersQuery {
    semesters: Array<Semester>
}

export const createSemester = gql`
    mutation CreateSemesterMutation($courseId: ID! $input: SemesterInput!) {
        createSemester(courseId: $courseId, input: $input) {
            id,
            note,
            dateStart,
            dateEnd,
            fulfillmentConditions {
                minOptional
                minMandatory
                minCredit
                minExam
            }
        }
    }
`;

export const editSemesterRequirements = gql`
    mutation EditSemesterRequirementsMutation($semesterId: ID!, $input: CourseSemesterRequirementsInput!) {
        editSemesterRequirements(semesterId: $semesterId, input: $input) {
            id,
            note,
            dateStart,
            dateEnd,
            fulfillmentConditions {
                minOptional
                minMandatory
                minCredit
                minExam
            }
        }
    }
`;

export interface EditSemesterRequirementsMutation {
    editSemesterRequirements: Semester
}

export interface EditSemesterRequirementsVariables {
    semesterId: number | string
    input: CourseSemesterRequirements
}

export interface CourseSemesterRequirements {
    minOptional: number,
    minMandatory: number,
    minCredit: number,
    minExam: number,
}

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
    creationDate: string,
    expirationDate: string
    id: string

    semesterId: number
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
    fulfillmentConditions: CourseRequirements;
    relatedUsers?: Array<AppUser>
    statistic?: Array<FeedbackStatistics>
}

export interface CourseRequirements {
    minOptional: number;
    minMandatory: number;
    minCredit: number;
    minExam: number;
}

export interface SemesterQuery {
    course?: Course;
    semester?: Semester;
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
    EDIT_COURSE = 'EDIT_COURSE',
    VIEW_TEST_RESULT = 'VIEW_TEST_RESULT',
    VIEW_STATISTICS = 'VIEW_STATISTICS',
    VIEW_REVIEW = 'VIEW_REVIEW',
    PERMIT_CHALLENGE_EXAM = 'PERMIT_CHALLENGE_EXAM',
    PERMIT_CHALLENGE_CREDIT = 'PERMIT_CHALLENGE_CREDIT'
}

export enum SemesterSortField {
    id = 'id',
    dateStart = 'dateStart',
    dateEnd = 'dateEnd'
}