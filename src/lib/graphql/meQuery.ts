import {gql} from "@apollo/client";

export const GET_AVAILABLE_COURSES_QUERY = gql`
    query GetAvailableCourses {
        availableCourses {
            id,
            stagId,
            name,
            dateCreation,
            icon,
            template
        }
    }
`;

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

export interface CourseData {
    myCourses: Array<Course>;
}