import Avatar from "react-avatar";
import React from "react";
import {useMutation, useQuery} from "@apollo/client";
import {
    appUser,
    AppUserQuery,
    AppUserVariables,
    removeCourseRole,
    RemoveCourseRoleMutation, RemoveCourseRoleVariables
} from "../../lib/graphql/appUserQuery";
import LoadingSpinner from "../../components/LoadingSpinner";
import {useParams} from "react-router-dom";
import MetadataTable from "../../components/ui/MetadataTable";
import {useTranslation} from "react-i18next";
import {toFormattedDate, toFormattedDateTime} from "../../features/helper";
import CourseUserRolesField from "../../components/course/ui/user/CourseUserRolesField";
import {CourseSemesterRole} from "../../lib/graphql/meQuery";
import {showErrorToast} from "../../components/editor/helpers";

const SIZE = 80;

const CourseUserDetail = () => {
    const {t} = useTranslation();
    const {semesterId, userId} = useParams<'semesterId' | 'userId'>();

    const {data, loading, error} = useQuery<AppUserQuery, AppUserVariables>(appUser, {
        variables: {semesterId: semesterId!, id: userId!}
    });

    const [removeRole, {loading : removeRoleLoading}] = useMutation<RemoveCourseRoleMutation, RemoveCourseRoleVariables>(removeCourseRole, {
        onError: (error) => {
            showErrorToast(error);
        },
        refetchQueries: [{query: appUser, variables: {semesterId: semesterId!, id: userId!}}]
    });

    const roleChipClickHandle = async (role: CourseSemesterRole) => {
        if (!removeRoleLoading) {
            await removeRole({variables: {
                    semesterId: semesterId!, roleId: role.id, appUserId: userId!
            }});
        }
    }

    if (loading) {
        return <div className="w-screen h-screen flex flex-row items-center justify-center">
            <LoadingSpinner/>
        </div>
    }

    if (error || !data) {
        return <p>Error</p>
    }

    const metadataRecords = [
        [t('course.users.manager.registration-date'), toFormattedDate(data.appUser.registrationDate)],
        [t('course.users.manager.lastAccess-date'), toFormattedDateTime(data.appUser.lastAccessDate)],
    ];

    return <div className="flex flex-col">
        <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <Avatar className="mt-0.5" name={data.appUser.displayName} round={true} size={SIZE.toString()}/>
                </div>
                <div className="flex flex-col px-10">
                    <h1 className="font-roboto text-gray-600 text-3xl uppercase font-bold text-left">{data.appUser.displayName}</h1>
                    <h2 className="font-roboto my-1 text-gray-600 font-light text-1xl text-left">{data.appUser.mail}</h2>
                    <h3 className="font-roboto text-gray-500 font-light text-sm mb-3 text-left">{data.appUser.stagId}</h3>
                </div>
            </div>
            <div className="flex flex-row my-2">
                <MetadataTable title={t('course.users.metadata.title')} data={metadataRecords} />
            </div>
        </div>
        <div className="flex flex-col">
            <h4 className="font-roboto text-gray-500 font-light text-xl mb-3 text-left">{t('course.users.roles.title')}</h4>
            <div className="flex flex-col">
                <CourseUserRolesField roles={data.appUser.roles} onChipClicked={roleChipClickHandle} />
            </div>
        </div>
    </div>
}



export default CourseUserDetail;