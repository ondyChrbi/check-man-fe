import {SemesterRole} from "../../../lib/graphql/courseQuery";
import {useTranslation} from "react-i18next";
import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

interface Props {
    semesterRoles?: SemesterRole[]
}

const AdministratorToolbar = ({semesterRoles = []}: Props) => {
    const {courseId, semesterId} = useParams<'courseId' | 'semesterId'>();
    const {t} = useTranslation();

    return <>
        {semesterRoles?.includes(SemesterRole.CREATE_CHALLENGE) &&
            <Link to={`/courses/${courseId}/semester/${semesterId}/challenge/create`}>{t('challenge.action.create')}</Link>
        }
    </>
}

export default AdministratorToolbar;