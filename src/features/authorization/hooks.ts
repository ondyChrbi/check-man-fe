import {useAppDispatch, useAppSelector} from "../storage/hooks";
import {useQuery} from "@apollo/client";
import {GlobalRole, meQuery, MeQuery} from "../../lib/graphql/meQuery";
import {addGlobalRoles} from "../storage/storageSlice";

export const useCourseRoles = (semesterId?: number | string) => {
    const storageSelector = useAppSelector((state) => state.storage.coursesPermission);

    const courseRoles = storageSelector.coursesRoles
        .find((r) => r.semesterId == semesterId);

    const roles = courseRoles?.roles || [];

    return { roles };
};

export const useGlobalRoles = () => {
    const {dispatch, roles} = useLoadFromStorage();
    const {loading, data} = useQuery<MeQuery>(meQuery);

    let globalRoles: Array<GlobalRole>;

    if (loading || !(data?.me.globalRoles)) {
        globalRoles = roles || [];
    } else {
        globalRoles = data.me.globalRoles;
        dispatch(addGlobalRoles({globalRoles}));
    }

    return { globalRoles : globalRoles.map((r) => r.name) };
}

const useLoadFromStorage = () => {
    const storageSelector = useAppSelector((state) => state.storage.globalPermission);
    const dispatch = useAppDispatch();

    return { roles: storageSelector.globalRoles || [], dispatch };
}