import {useAppSelector} from "../storage/hooks";

export const useCourseRoles = (semesterId?: number | string) => {
    const storageSelector = useAppSelector((state) => state.storage.coursesPermission);

    const courseRoles = storageSelector.coursesRoles
        .find((r) => r.semesterId == semesterId);

    const roles = courseRoles?.roles || [];

    return { roles };
};