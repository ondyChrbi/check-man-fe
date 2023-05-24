import {useMatch} from "react-router-dom";
import {useAppSelector} from "../storage/hooks";

const PATH = "/courses/:courseId/semester/:semesterId/challenge/:challengeId";

export const useUI = () => {
    const authenticationInfo = useAppSelector((state) => state.storage.authentication);
    const match = useMatch(PATH);

    const {semesterId} = match?.params || {};
    const showHeader = authenticationInfo.jwtInfo && (semesterId === undefined);

    return {
        showHeader,
    };
};