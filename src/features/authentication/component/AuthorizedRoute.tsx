import {useAppSelector} from "../../storage/hooks";
import AuthenticationService from "../services/authentication-service";
import {Navigate, useParams} from "react-router-dom";
import {SemesterRole} from "../../../lib/graphql/courseQuery";
import {useCourseRoles} from "../../authorization/hooks";
import {useTranslation} from "react-i18next";

interface Props {
    children : JSX.Element,
    semesterId?: number | string | null | undefined,
    mandatoryRoles: Array<SemesterRole>
}

const AuthorizedRoute = ({children, semesterId, mandatoryRoles} : Props) => {
    const {t} = useTranslation();
    const {semesterId : semesterIdSearchParam} = useParams<'semesterId'>();

    const authenticationInfo = useAppSelector((state) => state.storage.authentication);
    const {roles} = useCourseRoles(semesterId! || semesterIdSearchParam!);

    if (AuthenticationService.isNotAuthenticated(authenticationInfo)) {
        return <Navigate to={"/login"} replace />
    }

    if (!roles || !mandatoryRoles.every(r => roles.includes(r))) {
        return <Navigate to={`/error?message=${t('common.message.error.unauthorized')}`} replace />
    }

    return children;
}

export default AuthorizedRoute;