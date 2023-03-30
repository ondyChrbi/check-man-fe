import {SemesterRole} from "../../lib/graphql/courseQuery";

export const COURSE_STUDENTS_ROLES = [
    SemesterRole.ACCESS,
    SemesterRole.SUBMIT_CHALLENGE_SOLUTION,
];

export const COURSE_TEACHERS_ROLES = Object.values(SemesterRole);